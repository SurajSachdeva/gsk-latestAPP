import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualApi } from 'src/app/apis/actual-api';
import { UserApi } from 'src/app/apis/user-api';
import { ActualDisplayCanvas, ActualDisplayResponse, LandingPageDetail } from 'src/app/models/actual';
import { AlertModalComponent } from 'src/app/modules/shared/components/alert-modal/alert-modal.component';
import { RemarksModalComponent } from 'src/app/modules/shared/components/remarks-modal/remarks-modal.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-actual-canvas-channel',
  templateUrl: './actual-canvas-channel.component.html',
  styleUrls: ['./actual-canvas-channel.component.scss']
})
export class ActualCanvasChannelComponent implements OnInit {

  
  showViewDetail: boolean = false;
  currentViewDetailItem: ActualDisplayCanvas | undefined;
  mudId: string = '';
  data: ActualDisplayCanvas[] = [];
  filteredData: ActualDisplayCanvas[] = [];
  type: string = "";
  status: "A" | "P" | "R" | undefined;

  formGroup = this.fb.group({
    month: [''],
    company: [''],
    rsd: [''],
    frt: ['']
  })

  companyDropdown: string[] = [];
  monthDropdown: string[] = [];
  rsdDropdown: string[] = [];
  frtDropdown: string[] = [];

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
    { name: "Canvas", linkUrl: "/ApprovalWorkflow" },
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
    this.companyDropdown = [];
    this.rsdDropdown = [];
    this.frtDropdown = [];
    this.formGroup.patchValue({ month: '', company: '', rsd: '', frt: '' }, { emitEvent: false });
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
  onViewDetail(dataItem: ActualDisplayCanvas) {
    this.showViewDetail = true;
    this.currentViewDetailItem = dataItem;
  }
  filterData() {
    const { month, company, rsd, frt } = this.formGroup.value;
    this.filteredData = this.data;
    if (month) {
      this.filteredData = this.filteredData.filter(x => x.Month_Name === month);
    }
    if (company) {
      this.filteredData = this.filteredData.filter(x => x.Comapany_Name === company);
    }
    if (rsd) {
      this.filteredData = this.filteredData.filter(x => x.Distributor_Type === rsd);
    }
    if (frt) {
      this.filteredData = this.filteredData.filter(x => x.Discount_Type === frt);
    }
  }
  setMonthDropdown() {
    this.monthDropdown = [...new Set(this.filteredData?.map(x => x.Month_Name).sort())];
  }
  setCompanyDropdown() {
    this.companyDropdown = [...new Set(this.filteredData?.map(x => x.Comapany_Name).sort())];
  }
  setrsdDropdown() {
    this.rsdDropdown = [...new Set(this.filteredData?.map(x => x.Distributor_Type).sort())];
  }
  setfrtDropdown() {
    this.frtDropdown = [...new Set(this.filteredData?.map(x => x.Discount_Type).sort())];
  }
  getData() {
    this.resetPageState();
    if (this.status) {
      this.actualApi.getActualData(this.mudId, this.status, "Canvas")
        .subscribe((response: ActualDisplayResponse) => {
          if (response && typeof (response) === "object") {
            this.data = response.ActualDataDisplay_Canvas;
             this.filterData();
             this.setMonthDropdown(); 
             this.setCompanyDropdown();
             this.setrsdDropdown();
             this.setfrtDropdown();
             this.cd.detectChanges();
          }
        });


      this.userApi.getLandingPageDetails(this.mudId, "Actual", "Canvas")
        .subscribe((responseData: any) => {
          if (responseData.LandingPage_Canvas && responseData.LandingPage_Canvas.length) {
            var data = responseData.LandingPage_Canvas[0];
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
  getTotalSale() {
    return this.filteredData.map(x => x.Sales).reduce((sum, item) => sum + item, 0)
  }
  getTotalProvision() {
    return this.filteredData.map(x => x.Provision).reduce((sum, item) => sum + item, 0)
  }
  getTotalActual() {
    return this.filteredData.map(x => x.Actual).reduce((sum, item) => sum + item, 0)
  }
  getTotalClosingProv() {
    return this.filteredData.map(x => x.Closing_Prov).reduce((sum, item) => sum + item, 0)
  }
  closeViewDetail() {
    this.showViewDetail = false;
    this.currentViewDetailItem = undefined;
    this.cd.detectChanges();
  }
  async onSubmit() {
    const data = this.filteredData.filter(x => x.RemarkType === 'Approve' || x.RemarkType === 'Reject');
    let rowCount = 0;
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      try {
        var request = {
          "Approver_MudId":this.mudId,
          "Month": item.Month_Name,
          "Company": item.Comapany_Name,
          "Distributor_Type": item.Distributor_Type,
          "Discount_Type": item.Discount_Type,
          "Status_Level2": item.RemarkType === "Approve" ? "A" : "R",
          "Channel_Name": "Canvas",
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
  onReject(dataItem: ActualDisplayCanvas) {
    
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
  onApprove(dataItem: ActualDisplayCanvas) {

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
  getRowClasses(dataItem: ActualDisplayCanvas) {
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
  onExportToExcel() {
    const exportData = this.filteredData.map(x => {
      if (this.isApproved) {
      return {
        "Row Id": x.Row_Id,
        "Month": x.Month_Name || "",
        "Company Name": x.Comapany_Name || "",
        "Sub-D/RSD": x.Distributor_Type || "",
        "FRT/MGN": x.Discount_Type || "",
        "Sales": x.Sales || 0,
        "Provision": x.Provision || "",
        "CTS": x.CTS || 0,
        "Actual" : x.Actual || 0,
        "Closing Provision": x.Closing_Prov || 0,
       }
    }
    return {
      "Row Id": x.Row_Id,
      "Month": x.Month_Name || "",
      "Company Name": x.Comapany_Name || "",
      "Sub-D/RSD": x.Distributor_Type || "",
      "FRT/MGN": x.Discount_Type || "",
      "Sales": x.Sales || 0,
      "Provision": x.Provision || "",
      "CTS": x.CTS || 0,
      "Actual" : x.Actual || 0,
      "Closing Provision": x.Closing_Prov || 0,
      "Remarks": x.Remarks || ""     
     }
    });
    const headers = ["Row Id", "Month", "Company Name", "Sub-D/RSD", "FRT/MGN", "Sales", "Provision", 
    "CTS","Actual", 
    "Closing Provision"]
    if(!this.isApproved){
      headers.push("Remarks");
    }
    this.appService.exportAsExcelFile(exportData, "Canvas", headers);
  }
  onUploadToExcel(data: any) {
    if (data && Array.isArray(data) && data.length > 1 && !this.isApproved) {
      var headers = data.shift();
      if (headers && headers.length === 11) {
        data.forEach((element: any) => {
          let rowId = element[0];
          let remarks = element[10];
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

  // onUploadToExcel(data: any) {
  //   if (data && Array.isArray(data) && data.length > 1 && !this.isApproved) {
  //     var headers = data.shift();
  //     if (headers && headers.length === 10) {
  //       data.forEach((element: any) => {
  //         let rowId = element[0];
  //         let remarks = element[9];
  //         const obj = this.filteredData.find(x => x.Row_Id === rowId);
  //         if (obj) {
  //           obj.Remarks = remarks;
  //         }
  //       });
  //     }
  //   }
  // }
}
