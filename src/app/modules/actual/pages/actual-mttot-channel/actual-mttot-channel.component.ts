import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualApi } from 'src/app/apis/actual-api';
import { UserApi } from 'src/app/apis/user-api';
import { ActualDisplayMTTOT, ActualDisplayResponse } from 'src/app/models/actual';
import { LandingPageViewDetailViewModel } from 'src/app/models/user';
import { AlertModalComponent } from 'src/app/modules/shared/components/alert-modal/alert-modal.component';
import { RemarksModalComponent } from 'src/app/modules/shared/components/remarks-modal/remarks-modal.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-actual-mttot-channel',
  templateUrl: './actual-mttot-channel.component.html',
  styleUrls: ['./actual-mttot-channel.component.scss']
})
export class ActualMttotChannelComponent implements OnInit {

  showViewDetail: boolean = false;
  currentViewDetailItem: ActualDisplayMTTOT | undefined;
  breadCrumbData = [
    { name: "Actual", linkUrl: "/ApprovalWorkflow" },
    { name: "MT TOT & Ecom TOT", linkUrl: "/ApprovalWorkflow" },
  ]
  data: ActualDisplayMTTOT[] = [];
  filteredData: ActualDisplayMTTOT[] = [];
  type: string = "";
  status: "A" | "P" | "R" | undefined;
  mudId: string = '';
  formGroup = this.fb.group({
    category: [''],
    entity: [''],
    month: [''],
    customer: [''],
    brand: ['']
  })

  categoryDropdown: string[] = [];
  entityDropdown: string[] = [];
  customerDropdown: string[] = [];
  brandDropdown: string[] = [];
  monthDropdown: string[] = [];
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
  landingPageDetail: LandingPageViewDetailViewModel = {
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
    this.categoryDropdown = [];
    this.monthDropdown = [];
    this.entityDropdown = [];
    this.customerDropdown = [];
    this.formGroup.patchValue({ brand: '', region: '', subChannel: '',categoryName:'',month: '' },
     { emitEvent: false });
  }
  filterData() {
    const { category, entity, customer,brand,month } = this.formGroup.value;
    this.filteredData = this.data;
    if (category) {
      this.filteredData = this.filteredData.filter(x => x.Category === category);
    }
    if (entity) {
      this.filteredData = this.filteredData.filter(x => x.Entity === entity);
    }
    if (customer) {
      this.filteredData = this.filteredData.filter(x => x.Customer_Name === customer);
    }
    if (brand) {
      this.filteredData = this.filteredData.filter(x => x.Brand === brand);
    }
    if (month) {
      this.filteredData = this.filteredData.filter(x => x.Month_Name === month);
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
  onViewDetail(dataItem: ActualDisplayMTTOT) {
    this.showViewDetail = true;
    this.currentViewDetailItem = dataItem;
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

  setCategoryDropdown() {
    this.categoryDropdown = [...new Set(this.filteredData?.map(x => x.Category).sort())];
  }
  setEntityDropdown() {
    this.entityDropdown = [...new Set(this.filteredData?.map(x => x.Entity).sort())];
  }
  setCustomerDropdown() {
    this.customerDropdown = [...new Set(this.filteredData?.map(x => x.Customer_Name).sort())];
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
      this.actualApi.getActualData(this.mudId, this.status, "MTTOT")
        .subscribe((response: ActualDisplayResponse) => {
          if (response && typeof (response) === "object") {
            this.data = response.ActualDataDisplay_MTTOT;
            this.filterData();
             this.setCategoryDropdown();
             this.setEntityDropdown();
             this.setCustomerDropdown();
             this.setBrandDropdown();
             this.setMonthDropdown();
            this.cd.detectChanges();
          }
        });
      this.userApi.getLandingPageDetails(this.mudId, "Actual", "MTTOT")
        .subscribe((responseData: any) => {
          if (responseData.LandingPage_MTTOT && responseData.LandingPage_MTTOT.length) {
            var data = responseData.LandingPage_MTTOT[0];
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
  getRowClasses(dataItem: ActualDisplayMTTOT) {
    if (this.isApproved) {
      return "approval-bg";
    }
    //  else if (this.isPending) {
    //   var difference = this.getDifference(dataItem);
    //   if (difference > 0) {
    //     return "approval-bg";
    //   } else {
    //     return "reject-bg";
    //   }
    // }
     else if (this.isRejected) {
      return "reject-bg";
    }
    return "";
  }
  onReject(dataItem: ActualDisplayMTTOT) {
    
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
  onApprove(dataItem: ActualDisplayMTTOT) {

    if (dataItem.RemarkType === "Approve") {
      dataItem.RemarkType = undefined;
      return;
    }
    if (this.isPending) {
      dataItem.RemarkType = "Approve"
      
    }
     else if (this.isRejected) {
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
          Month: item.Month_Name,
          Customer_Name: item.Customer_Name,
          Brand_Code: item.Brand,
          Category: item.Category,
           Channel_Name: "MTTOT",
           Approval_Type: "Actual",
          Remarks: item.Remarks || "",         
          Status_Level2:  item.RemarkType === "Approve" ? "A" : "R", 
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
  onExportToExcel() {
    const exportData = this.filteredData.map(x => {
      if (this.isApproved) {
      return {
        "Row Id": x.Row_Id,
        "Category": x.Category || "",
        "Entity": x.Entity || "",
        "Customer Name": x.Customer_Name || "",
        "Brand": x.Brand || "",
        "Month Name": x.Month_Name || 0,
        "Rate": x.Rate || "",
        "Sales": x.Sales || 0,
        "Provision" : x.Provision || 0,
        "CTS" : x.CTS || 0,
        "Actual" : x.Actual || 0,        
        "Closing Provision": x.Closing_Prov || 0
      }
    }
    return {
      "Row Id": x.Row_Id,
      "Category": x.Category || "",
      "Entity": x.Entity || "",
      "Customer Name": x.Customer_Name || "",
      "Brand": x.Brand || "",
      "Month Name": x.Month_Name || 0,
      "Rate": x.Rate || "",
      "Sales": x.Sales || 0,
      "Provision" : x.Provision || 0,
      "CTS" : x.CTS || 0,
      "Actual" : x.Actual || 0,        
      "Closing Provision": x.Closing_Prov || 0,
      "Remarks": x.Remarks || ""
    }
  });
    const headers = ["Row Id", "Category", "Entity", "Customer Name", "Brand", "Month Name", 
    "Rate", "Sales","Provision", "CTS", "Actual","Closing Provision"]
    if(!this.isApproved){
      headers.push("Remarks");
    }
    this.appService.exportAsExcelFile(exportData, "MTTOT", headers);
  }

  onUploadToExcel(data: any) {
    if (data && Array.isArray(data) && data.length > 1 && !this.isApproved) {
      var headers = data.shift();
      if (headers && headers.length === 13) {
        data.forEach((element: any) => {
          let rowId = element[0];
          let remarks = element[12];
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
