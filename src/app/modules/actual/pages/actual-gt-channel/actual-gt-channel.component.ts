import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserApi } from 'src/app/apis/user-api';
import { LandingPageDetail,ActualDisplayGT, ActualDisplayResponse } from 'src/app/models/actual';
import { AppService } from 'src/app/services/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ActualApi } from 'src/app/apis/actual-api';
import { AlertModalComponent } from 'src/app/modules/shared/components/alert-modal/alert-modal.component';
import { RemarksModalComponent } from 'src/app/modules/shared/components/remarks-modal/remarks-modal.component';

@Component({
  selector: 'app-actual-gt-channel',
  templateUrl: './actual-gt-channel.component.html',
  styleUrls: ['./actual-gt-channel.component.scss']
})
export class ActualGtChannelComponent implements OnInit {
  showViewDetail: boolean = false;
  currentViewDetailItem: ActualDisplayGT | undefined;

  mudId: string = '';
  data: ActualDisplayGT[] = [];
  filteredData: ActualDisplayGT[] = [];
  type: string = "";
  status: "A" | "P" | "R" | undefined;
  breadCrumbData = [
    { name: "Actual", linkUrl: "/ApprovalWorkflow" },
    { name: "General Trade", linkUrl: "/ApprovalWorkflow" },
  ]
  formGroup = this.fb.group({
    brand: [''],
    region: [''],
    subChannel: ['']
  })

  regionDropdown: string[] = [];
  brandDropdown: string[] = [];
  subChannelDropdown: string[] = [];

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
    this.brandDropdown = [];
    this.subChannelDropdown = [];
    this.regionDropdown = [];
    this.formGroup.patchValue({ brand: '', region: '', subChannel: '' }, { emitEvent: false });
  }

  filterData() {
    const { brand, region, subChannel } = this.formGroup.value;
    this.filteredData = this.data;
    if (brand) {
      this.filteredData = this.filteredData.filter(x => x.Brand === brand);
    }
    if (region) {
      this.filteredData = this.filteredData.filter(x => x.Region === region);
    }
    if (subChannel) {
      this.filteredData = this.filteredData.filter(x => x.Sub_Channel === subChannel);
    }
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
  onViewDetail(dataItem: ActualDisplayGT) {
    this.showViewDetail = true;
    this.currentViewDetailItem = dataItem;
  }
  isAllSelected() {
    return this.filteredData?.filter(x => x.RemarkType === "Approve").every(x => this.getDifference(x) > 0)
      && this.filteredData.filter(x => x.RemarkType === "Approve").filter(x => this.getDifference(x) > 0).length;
  }
  onApproveAll() {
    var isAllSelected = this.isAllSelected();
    this.filteredData.forEach(item => {
      const difference = this.getDifference(item);
      if (difference > 0) {
        if (isAllSelected) {
          item.RemarkType = "Approve";
        } else {
          item.RemarkType = undefined;
        }
      }
    })
  }
  getData() {
    this.resetPageState();
    if (this.status) {
      this.actualApi.getActualData(this.mudId, this.status, "GT")
        .subscribe((response: ActualDisplayResponse) => {
          if (response && typeof (response) === "object") {
            this.data = response.ActualDataDisplay_GT;
            this.filterData();
            this.setBrandDropdown();
            this.setRegionDropdown();
            this.setSubChannelDropdown();
            this.cd.detectChanges();
          }
        });


      this.userApi.getLandingPageDetails(this.mudId, "Actual", "GT")
        .subscribe((responseData: any) => {
          if (responseData.LandingPage_GT && responseData.LandingPage_GT.length) {
            var data = responseData.LandingPage_GT[0];
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
  getRowClasses(dataItem: ActualDisplayGT) {
    if (this.isApproved) {
      return "approval-bg";
    } else if (this.isPending) {
      var difference = this.getDifference(dataItem);
      if (difference > 0) {
        return "approval-bg";
      } else {
        return "reject-bg";
      }
    } else if (this.isRejected) {
      return "reject-bg";
    }
    return "";
  }
  getTotalUserActual() {
    return this.filteredData.map(x => x.User_Provision).reduce((sum, item) => sum + item, 0)
  }
  getDifference(dataItem: ActualDisplayGT): number {
    return dataItem.User_Provision - dataItem.Actuals;
  }
  onReject(dataItem: ActualDisplayGT) {
    
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
  onApprove(dataItem: ActualDisplayGT) {
    if (dataItem.RemarkType === "Approve") {
      dataItem.RemarkType = undefined;
      return;
    }
    if (this.isPending) {
      const difference = this.getDifference(dataItem);
      if (difference >= 0) {
        const modalRef = this.modalService.open(RemarksModalComponent, { centered: true });
        modalRef.componentInstance.heading = "Approve Record";
        modalRef.componentInstance.setRemarks(dataItem.Remarks || '');
        modalRef.result.then(reason => {
          dataItem.Remarks = reason;
          dataItem.RemarkType = "Approve";
          this.cd.detectChanges();
        });
      } else {
        dataItem.RemarkType = "Approve";
      }
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
  async onSubmit() {
    const data = this.filteredData.filter(x => x.RemarkType === 'Approve' || x.RemarkType === 'Reject');
    let rowCount = 0;
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      try {
        var request = {
          Approver_MudId: this.mudId,
          WON_Id: item.WON_ID,
          Status_Level1: "A",
          Status_Level2: item.RemarkType === "Approve" ? "A" : "R",
          Channel_Name: "GT",
          Approval_Type: "Actual",
          Remarks: item.Remarks || "",
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
  getTotalUserProvison() {
    return this.filteredData.map(x => x.User_Provision).reduce((sum, item) => sum + item, 0)
  }
  getTotalActuals() {
    return this.filteredData.map(x => x.Actuals).reduce((sum, item) => sum + item, 0)
  }
  getTotalDifferenceActuals() {
    return this.filteredData.map(x => this.getDifference(x)).reduce((sum, item) => sum + item, 0)
  }
  getTotalSale() {
    return this.filteredData.map(x => x.Sales).reduce((sum, item) => sum + item, 0)
  }
  setRegionDropdown() {
    this.regionDropdown = [...new Set(this.filteredData?.map(x => x.Region).sort())];
  }
  setBrandDropdown() {
    this.brandDropdown = [...new Set(this.filteredData?.map(x => x.Brand).sort())];
  }
  setSubChannelDropdown() {
    this.subChannelDropdown = [...new Set(this.filteredData?.map(x => x.Sub_Channel).sort())];
  }
  closeViewDetail() {
    this.showViewDetail = false;
    this.currentViewDetailItem = undefined;
    this.cd.detectChanges();
  }
  onExportToExcel() {
    const exportData = this.filteredData?.map(x => {
      if (this.isApproved) {
      return {
        "Won Id": x.WON_ID || 0,
        "Scheme Details": x.Scheme_Details || "",
        "Region": x.Region || "",
        "Brand": x.Brand || "",
        "Sub Channel": x.Sub_Channel || "",
        "User Provision" : x.User_Provision || "",
        "Actuals" : x.Actuals || "",
        "Difference": this.getDifference(x),
        "Scheme Start Date": x.Scheme_StartDate,
        "Scheme End Date": x.Scheme_EndDate,
        "Sales": x.Sales || 0,
        "Prov/Sales": x.CTS || 0,        
        "HUL SI-9 Budget": x.HUL_SI9_Budget || "",
        "Investment Type": x.Investment_Type || 0
      }
    }
    return {
      "Won Id": x.WON_ID || 0,
      "Scheme Details": x.Scheme_Details || "",
      "Region": x.Region || "",
      "Brand": x.Brand || "",
      "Sub Channel": x.Sub_Channel || "",
      "User Provision" : x.User_Provision || "",
      "Actuals" : x.Actuals || "",
      "Difference": this.getDifference(x),
      "Scheme Start Date": x.Scheme_StartDate,
      "Scheme End Date": x.Scheme_EndDate,
      "Sales": x.Sales || 0,
      "Prov/Sales": x.CTS || 0,        
      // "HUL SI-9 Budget": x.HUL_SI9_Budget || "",
      // "Investment Type": x.Investment_Type || 0,      
      "Remarks": x.Remarks || ""
    }
    });
    const headers = ["Won Id", "Scheme Details", "Region", "Brand", "Sub Channel", "User Provision",
    "Actuals", "Difference", "Scheme Start Date", "Scheme End Date",
    "Sales", "Prov/Sales", ]
    if(!this.isApproved){
      headers.push("Remarks");
    }
    this.appService.exportAsExcelFile(exportData, "GT", headers);
  }

  onUploadToExcel(data: any) {
    if (data && Array.isArray(data) && data.length > 1 && !this.isApproved) {
      var headers = data.shift();
      if (headers && headers.length === 13) {
        data.forEach((element: any) => {
          let wonId = element[0];
          let remarks = element[12];
          const obj = this.filteredData.find(x => x.WON_ID === wonId);
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
