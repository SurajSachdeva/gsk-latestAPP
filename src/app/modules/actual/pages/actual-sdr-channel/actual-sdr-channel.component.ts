import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualApi } from 'src/app/apis/actual-api';
import { UserApi } from 'src/app/apis/user-api';
import { ActualDisplayResponse, ActualDisplaySDR, LandingPageDetail } from 'src/app/models/actual';
import { AlertModalComponent } from 'src/app/modules/shared/components/alert-modal/alert-modal.component';
import { RemarksModalComponent } from 'src/app/modules/shared/components/remarks-modal/remarks-modal.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-actual-sdr-channel',
  templateUrl: './actual-sdr-channel.component.html',
  styleUrls: ['./actual-sdr-channel.component.scss']
})
export class ActualSdrChannelComponent implements OnInit {

  
  showViewDetail: boolean = false;
  currentViewDetailItem: ActualDisplaySDR | undefined;
  mudId: string = '';
  data: ActualDisplaySDR[] = [];
  filteredData: ActualDisplaySDR[] = [];
  type: string = "";
  status: "A" | "P" | "R" | undefined;

  formGroup = this.fb.group({
    month: [''],
    brand: ['']
  })


  monthDropdown: string[] = [];
  brandDropdown: string[] = [];

  get isApproved(): boolean {
    return this.pageName === 'Approved'
  }
  get isPending(): boolean {
    return this.pageName === 'Pending'
  }
  get isRejected(): boolean {
    return this.pageName === 'Rejected'
  }
  get pageName(): string {
    switch ((this.status || '').toLowerCase()) {
      case 'a':
        return "Approved";
      case 'p':
        return "Pending";
      case 'r':
        return "Rejected";
      default:
        return "";
    }
  }
  landingPageDetail: LandingPageDetail = {
    approvalCount: 0,
    pendingCount: 0,
    rejectionCount: 0
  }
  breadCrumbData = [
    { name: "Actual", linkUrl: "/ApprovalWorkflow" },
    { name: "SDR", linkUrl: "/ApprovalWorkflow" },
  ]
  constructor(
    private actualApi: ActualApi,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private appService: AppService,
    private userApi: UserApi
  ) { 
    const userDetail = this.appService.getLoginUserDetail()
    if (userDetail) {
      this.mudId = userDetail.MudID;
  }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type') || "";
      this.loadData();
    });
    this.formGroup.valueChanges.subscribe(_ => {
      this.filterData();
    })
  }

  resetPageState() {
    this.showViewDetail = false;
    this.currentViewDetailItem = undefined;
    this.filteredData = [];
    this.data = [];
    this.monthDropdown = [];
    this.brandDropdown = [];
    this.formGroup.patchValue({ month: '', brand: '' }, { emitEvent: false });
  }
  loadData() {
    this.data = [];
    switch ((this.type || '').toLowerCase()) {
      case 'approved':
        this.status = "A";
        break;
      case 'pending':
        this.status = "P";
        break;
      case 'rejected':
        this.status = "R";
        break;
      default:
        this.status = undefined;
        break;
    }
    this.getData();
  }
  setBrandDropdown() {
    this.brandDropdown = [...new Set(this.filteredData?.map(x => x.Brand).sort())];
  }
  setMonthDropdown() {
    this.monthDropdown = [...new Set(this.filteredData?.map(x => x.Month_Name).sort())];
  }
  getData() {
    this.resetPageState();
    if (this.status) {
      this.actualApi.getActualData(this.mudId, this.status, "SDR")
        .subscribe((response: ActualDisplayResponse) => {
          if (response && typeof (response) === "object") {
            this.data = response.ActualDataDisplay_SDR;
             this.filterData();
             this.setBrandDropdown(); 
              this.setMonthDropdown(); 
             this.cd.detectChanges();
          }
        });
      this.userApi.getLandingPageDetails(this.mudId, "Actual", "SDR")
        .subscribe((responseData: any) => {
          if (responseData.LandingPage_SDR && responseData.LandingPage_SDR.length) {
            var data = responseData.LandingPage_SDR[0];
            this.landingPageDetail = {
              approvalCount: data.Act_Approval_Count || 0,
              pendingCount: data.Act_Pending_Count || 0,
              rejectionCount: data.Act_Rejection_Count || 0
            }
          }
          this.cd.detectChanges();
        });
    }

  }
  filterData() {
    const { month, brand } = this.formGroup.value;
    this.filteredData = this.data;
    if (month) {
      this.filteredData = this.filteredData.filter(x => x.Month_Name === month);
    }
    if (brand) {
      this.filteredData = this.filteredData.filter(x => x.Brand === brand);
    }
  }
  async onSubmit() {
    const data = this.filteredData.filter(x => x.RemarkType === 'Approve' || x.RemarkType === 'Reject');
    let rowCount = 0;
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      try {
        var request = {
          "Approver_MudId": "nxk19241",
          "Status_Level2": item.RemarkType === "Approve" ? "A" : "R",
          "Channel_Name": "SDR",
          Brand_Code: item.Brand,
          Month : item.Month_Name,
          "Approval_Type": "Actual",
          "Remarks": item.Remarks || ""
        };
        const response = await this.actualApi.saveActualApprovalLog(request).toPromise();
        rowCount++;
      } catch (error) {
        console.log(error);
      }
    }
    if (data.length) {
      const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
      modalRef.componentInstance.heading = "Success";
      modalRef.componentInstance.message = `${rowCount} Record Approved and Rejected Successfully.`;
      this.loadData();
    }
  }
  getTotalLast5Mo() {
    return this.filteredData.map(x => x.Last_5Month_Sales).reduce((sum, item) => sum + item, 0)
  }
  getTotalProvision() {
    return this.filteredData.map(x => x.Provision).reduce((sum, item) => sum + item, 0)
  }
  getTotalActuals() {
    return this.filteredData.map(x => x.Actual).reduce((sum, item) => sum + item, 0)
  }
  getTotalClosingProv() {
    return this.filteredData.map(x => x.Closing_Prov).reduce((sum, item) => sum + item, 0)
  }
  onReject(dataItem: ActualDisplaySDR) {
    
    if (dataItem.RemarkType === "Reject") {
      dataItem.RemarkType = undefined;
      return;
    }

    const modalRef = this.modalService.open(RemarksModalComponent, { centered: true });
    modalRef.componentInstance.heading = "Reject Record";
    modalRef.componentInstance.setRemarks(dataItem.Remarks || '');
    modalRef.result.then(reason => {
      dataItem.Remarks = reason;
      dataItem.RemarkType = "Reject";
      this.cd.detectChanges();
    });
  }
  onApprove(dataItem: ActualDisplaySDR) {

    if (dataItem.RemarkType === "Approve") {
      dataItem.RemarkType = undefined;
      return;
    }
    if (this.isPending) {
      dataItem.RemarkType = "Approve";
    } else if (this.isRejected) {
      const modalRef = this.modalService.open(RemarksModalComponent, { centered: true });
      modalRef.componentInstance.heading = "Approve Record";
      modalRef.componentInstance.setRemarks(dataItem.Remarks || '');
      modalRef.result.then(reason => {
        dataItem.Remarks = reason;
        dataItem.RemarkType = "Approve";
        this.cd.detectChanges();
      });
    }

  }
  onViewDetail(dataItem: ActualDisplaySDR) {
    this.showViewDetail = true;
    this.currentViewDetailItem = dataItem;
  }
  getRowClasses(dataItem: ActualDisplaySDR) {
    if (this.isApproved) {
      return "approval-bg";
    } else if (this.isPending) {
      return "approval-bg";
    } else if (this.isRejected) {
      return "reject-bg";
    }
    return "";
  }
  isAllSelected() {
    return this.filteredData
      && this.filteredData.length
      && this.filteredData.every(x => x.RemarkType === "Approve");
  }
  onApproveAll() {
    var isAllSelected = this.isAllSelected();
    this.filteredData.forEach(item => {
      if (isAllSelected) {
        if (item.RemarkType === "Approve") {
          item.RemarkType = undefined;
        }
      } else {
        if (item.RemarkType !== "Reject") {
          item.RemarkType = "Approve";
        }
      }
    })
  }
  closeViewDetail() {
    this.showViewDetail = false;
    this.currentViewDetailItem = undefined;
    this.cd.detectChanges();
  }
  onExportToExcel() {
    const exportData = this.filteredData.map(x => {
      if (this.isApproved) {
      return {
        "Row Id": x.Row_Id,
        "Month": x.Month_Name || "",
        "Brand": x.Brand || "",
        "Rate": x.Rate || "",
        "Last 5 Month Sales": x.Last_5Month_Sales || "",
        "Provision": x.Provision || "",
        "Actual" : x.Actual || 0,
        "Closing Provision": x.Closing_Prov || 0
      }
    }
    return {
      "Row Id": x.Row_Id,
      "Month": x.Month_Name || "",
      "Brand": x.Brand || "",
      "Rate": x.Rate || "",
      "Last 5 Month Sales": x.Last_5Month_Sales || "",
      "Provision": x.Provision || "",
      "Actual" : x.Actual || 0,
      "Closing Provision": x.Closing_Prov || 0,
      "Remarks": x.Remarks || ""
    }
  });
    const headers = ["Row Id", "Month", "Brand","Rate","Last 5 Month Sales", "Provision", "Actual", 
    "Closing Provision"]
    if(!this.isApproved){
      headers.push("Remarks");
    }
    this.appService.exportAsExcelFile(exportData, "SDR", headers);
  }

  onUploadToExcel(data: any) {
    if (data && Array.isArray(data) && data.length > 1 && !this.isApproved) {
      var headers = data.shift();
      if (headers && headers.length === 9) {
        data.forEach((element: any) => {
          let rowId = element[0];
          let remarks = element[8];
          const obj = this.filteredData.find(x => x.Row_Id === rowId);
          if (obj) {
            obj.Remarks = remarks;
          }
        });
        const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
        modalRef.componentInstance.heading = "Success";
        modalRef.componentInstance.message = `File Uploaded Successfully.`;
      }
    }
  }
}
