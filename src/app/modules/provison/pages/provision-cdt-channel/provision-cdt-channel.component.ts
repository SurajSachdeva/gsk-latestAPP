import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvisionApi } from 'src/app/apis/provision-api';
import { UserApi } from 'src/app/apis/user-api';
import { LandingPageDetail, ProvisionDisplayCDT, ProvisionDisplayResponse } from 'src/app/models/provision';
import { AlertModalComponent } from 'src/app/modules/shared/components/alert-modal/alert-modal.component';
import { RemarksModalComponent } from 'src/app/modules/shared/components/remarks-modal/remarks-modal.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-provision-cdt-channel',
  templateUrl: './provision-cdt-channel.component.html',
  styleUrls: ['./provision-cdt-channel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvisionCdtChannelComponent implements OnInit {

  showViewDetail: boolean = false;
  currentViewDetailItem: ProvisionDisplayCDT | undefined;
  breadCrumbData = [
    { name: "Provision", linkUrl: "/ApprovalWorkflow" },
    { name: "CDT", linkUrl: "/ApprovalWorkflow" },
  ]
  data: ProvisionDisplayCDT[] = [];
  filteredData: ProvisionDisplayCDT[] = [];
  type: string = "";
  status: "A" | "P" | "R" | undefined;
  mudId: string = '';
  formGroup = this.fb.group({
    month: [''],
    city: [''],
    channel: ['']
  })

  cityDropdown: string[] = [];
  monthDropdown: string[] = [];
  channelDropdown: string[] = [];

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
    private provisionApi: ProvisionApi,
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

  ngOnInit() {
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
    this.cityDropdown = [];
    this.channelDropdown = [];
    this.formGroup.patchValue({ month: '', city: '', channel: '' }, { emitEvent: false });
  }
  filterData() {
    const { month, city, channel } = this.formGroup.value;
    this.filteredData = this.data;
    if (month) {
      this.filteredData = this.filteredData.filter(x => x.Month_Name === month);
    }
    if (city) {
      this.filteredData = this.filteredData.filter(x => x.City === city);
    }
    if (channel) {
      this.filteredData = this.filteredData.filter(x => x.Channel === channel);
    }
  }
  loadData() {
    this.data = [];
    switch ((this.type || '').toLowerCase()) {
      case 'approved':
        this.status = "A";
        this.breadCrumbData = [
          { name: "Provision", linkUrl: "/ApprovalWorkflow" },
          { name: "CDT", linkUrl: "/ApprovalWorkflow" },
          { name: "Approved", linkUrl: "/Provision/CDT/Approved" },
        ]
        break;
      case 'pending':
        this.status = "P";
        this.breadCrumbData = [
          { name: "Provision", linkUrl: "/ApprovalWorkflow" },
          { name: "CDT", linkUrl: "/ApprovalWorkflow" },
          { name: "Pending", linkUrl: "/Provision/CDT/Pending" },
        ];
        break;
      case 'rejected':
        this.status = "R";
        this.breadCrumbData = [
          { name: "Provision", linkUrl: "/ApprovalWorkflow" },
          { name: "CDT", linkUrl: "/ApprovalWorkflow" },
          { name: "Rejected", linkUrl: "/Provision/CDT/Rejected" },
        ];
        break;
      default:
        this.status = undefined;
        break;
    }
    this.getData();
  }
  onViewDetail(dataItem: ProvisionDisplayCDT) {
    this.showViewDetail = true;
    this.currentViewDetailItem = dataItem;
  }

  closeViewDetail() {
    this.showViewDetail = false;
    this.currentViewDetailItem = undefined;
    this.cd.detectChanges();
  }
  onReject(dataItem: ProvisionDisplayCDT) {

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

  onApprove(dataItem: ProvisionDisplayCDT) {

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
  isAllSelected() {
    return this.filteredData
      && this.filteredData.length
      && this.filteredData.every(x => x.RemarkType === "Approve");
  }
  onApproveAll() {
    this.filteredData.forEach(item => {
      item.RemarkType = "Approve";
    });
  }
  getData() {
    this.resetPageState();
    if (this.status) {
      this.provisionApi.getProvisonData(this.mudId, this.status, "CDT")
        .subscribe((response: ProvisionDisplayResponse) => {
          if (response && typeof (response) === "object") {
            this.data = response.Provision_Display_CDT;
            this.filterData();
            this.setDropDowns();
            this.cd.detectChanges();
          }
        });


      this.userApi.getLandingPageDetails(this.mudId, "Provision", "CDT")
        .subscribe((responseData: any) => {
          if (responseData.LandingPage_CDT && responseData.LandingPage_CDT.length) {
            var data = responseData.LandingPage_CDT[0];
            this.landingPageDetail = {
              approvalCount: data.Prov_Approval_Count || 0,
              pendingCount: data.Prov_Pending_Count || 0,
              rejectionCount: data.Prov_Rejection_Count || 0
            }
          }
          this.cd.detectChanges();
        });
    }

  }
  setDropDowns() {
    this.monthDropdown = [...new Set(this.filteredData.map(x => x.Month_Name).sort())];
    this.cityDropdown = [...new Set(this.filteredData.map(x => x.City).sort())];
    this.channelDropdown = [...new Set(this.filteredData.map(x => x.Channel).sort())];
  }
  getRowClasses(dataItem: ProvisionDisplayCDT) {
    if (this.isApproved) {
      return "approval-bg";
    } else if (this.isPending) {
      return "approval-bg";
    } else if (this.isRejected) {
      return "reject-bg";
    }
    return "";
  }
  getTotalOpeningProvision() {
    return this.filteredData.map(x => x.Opening_Provision || 0).reduce((sum, item) => sum + item, 0)
  }

  getTotalProvision() {
    return this.filteredData.map(x => x.Provision || 0).reduce((sum, item) => sum + item, 0)
  }

  getTotalSale() {
    return this.filteredData.map(x => x.Sales || 0).reduce((sum, item) => sum + item, 0)
  }

  onExportToExcel() {
    const exportData = this.filteredData.map(x => {
      if (this.isApproved) {
        return {
          "Row Id": x.Row_Id || 0,
          "Month": x.Month_Name || "",
          "DB Code": x.Distributor_Code || "",
          "DB Name": x.Distributor_Name || "",
          "City": x.City || "",
          "Rate": x.Rate || 0,
          "Channel": x.Channel || "",
          "Sales": x.Sales || 0,
          "Provision": x.Provision || 0,
          "CTC": x.CTS || 0,
          "Opening Provision": x.Opening_Provision || 0,
        }
      }
      return {
        "Row Id": x.Row_Id || 0,
        "Month": x.Month_Name || "",
        "DB Code": x.Distributor_Code || "",
        "DB Name": x.Distributor_Name || "",
        "City": x.City || "",
        "Rate": x.Rate || 0,
        "Channel": x.Channel || "",
        "Sales": x.Sales || 0,
        "Provision": x.Provision || 0,
        "CTC": x.CTS || 0,
        "Opening Provision": x.Opening_Provision || 0,
        "Remarks": x.Remarks || ""
      }
    });
    const headers = ["Row Id", "Month", "DB Code", "DB Name", "City", "Rate", "Channel", "Sales", "Provision", "CTC", "Opening Provision"]
    if(!this.isApproved){
      headers.push("Remarks");
    }
    this.appService.exportAsExcelFile(exportData, "CDT", headers);
  }

  onUploadToExcel(data: any) {
    if (data && Array.isArray(data) && data.length > 1 && !this.isApproved) {
      var headers = data.shift();
      if (headers && headers.length === 12) {
        data.forEach((element: any) => {
          let rowId = element[0];
          let remarks = element[11];
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

  async onSubmit() {
    const data = this.filteredData.filter(x => x.RemarkType === 'Approve' || x.RemarkType === 'Reject');
    if (!data || !data.length) {
      const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
      modalRef.componentInstance.heading = "Information";
      modalRef.componentInstance.message = `No Selection Occur`;
      return;
    }
    let rowCount = 0;
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      try {
        var request = {
          "Approver_MudId": this.mudId,
          "Month": item.Month_Name,
          "Distributor_Code": item.Distributor_Code,
          "Status_Level2": item.RemarkType === "Approve" ? "A" : "R",
          "Channel_Name": "CDT",
          "Approval_Type": "Provision",
          "Remarks": item.Remarks || ""
        }
        const response = await this.provisionApi.saveProvisionApprovalLog(request).toPromise();
        rowCount++;
      } catch (error) {
        console.log(error);
      }
    }
    if (data.length && rowCount) {
      const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
      modalRef.componentInstance.heading = "Success";
      modalRef.componentInstance.message = `${rowCount} Record Submitted Successfully.`;
      this.loadData();
    }
  }

}
