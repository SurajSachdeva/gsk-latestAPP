import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvisionApi } from 'src/app/apis/provision-api';
import { UserApi } from 'src/app/apis/user-api';
import { LandingPageDetail, ProvisionDisplayGT, ProvisionDisplayResponse } from 'src/app/models/provision';
import { AlertModalComponent } from 'src/app/modules/shared/components/alert-modal/alert-modal.component';
import { RemarksModalComponent } from 'src/app/modules/shared/components/remarks-modal/remarks-modal.component';
import { AppService } from 'src/app/services/app.service';
import * as moment from "moment";

@Component({
  selector: 'app-provision-gt-channel',
  templateUrl: './provision-gt-channel.component.html',
  styleUrls: ['./provision-gt-channel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvisionGtChannelComponent implements OnInit {
  showViewDetail: boolean = false;
  currentViewDetailItem: ProvisionDisplayGT | undefined;
  isFinanceUser: boolean = false;
  mudId: string = '';
  data: ProvisionDisplayGT[] = [];
  filteredData: ProvisionDisplayGT[] = [];
  type: string = "";
  status: "A" | "P" | "R" | undefined;

  userLimitStart: number = 0;
  userLimitEnd: number = 0

  breadCrumbData = [
    { name: "Provision", linkUrl: "/ApprovalWorkflow" },
    { name: "General Trade", linkUrl: "/ApprovalWorkflow" },
  ]
  formGroup = this.fb.group({
    brand: [''],
    region: [''],
    subChannel: [''],
    startDate: [''],
    endDate: ['']
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
      this.userLimitStart = userDetail.SlabStart || 0;
      this.userLimitEnd = userDetail.SlabEnd || 0;
      this.isFinanceUser = userDetail.Department === 'Finance';
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
    this.brandDropdown = [];
    this.subChannelDropdown = [];
    this.regionDropdown = [];
    this.formGroup.patchValue({ brand: '', region: '', subChannel: '' }, { emitEvent: false });
  }
  filterData() {
    const { brand, region, subChannel, startDate, endDate } = this.formGroup.value;
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
    if (startDate) {
      this.filteredData = this.filteredData.filter(x => {
        var itemDate = moment(x.Scheme_StartDate).format("MM-DD-YYYY");
        var startDateFormat = moment(new Date(startDate.year, startDate.month - 1, startDate.day)).format("MM-DD-YYYY");
        return itemDate === startDateFormat;
      })
    }
    if (endDate) {
      this.filteredData = this.filteredData.filter(x => {
        var itemDate = moment(x.Scheme_EndDate).format("MM-DD-YYYY");
        var endDateFormat = moment(new Date(endDate.year, endDate.month - 1, endDate.day)).format("MM-DD-YYYY");
        return itemDate === endDateFormat;
      })
    }
  }
  loadData() {
    this.data = [];
    switch ((this.type || '').toLowerCase()) {
      case 'approved':
        this.status = "A";
        this.breadCrumbData = [
          { name: "Provision", linkUrl: "/ApprovalWorkflow" },
          { name: "General Trade", linkUrl: "/ApprovalWorkflow" },
          { name: "Approved", linkUrl: "/Provision/GT/Approved" },
        ]
        break;
      case 'pending':
        this.status = "P";
        this.breadCrumbData = [
          { name: "Provision", linkUrl: "/ApprovalWorkflow" },
          { name: "General Trade", linkUrl: "/ApprovalWorkflow" },
          { name: "Pending", linkUrl: "/Provision/GT/Pending" },
        ];
        break;
      case 'rejected':
        this.status = "R";
        this.breadCrumbData = [
          { name: "Provision", linkUrl: "/ApprovalWorkflow" },
          { name: "General Trade", linkUrl: "/ApprovalWorkflow" },
          { name: "Rejected", linkUrl: "/Provision/GT/Rejected" },
        ];
        break;
      default:
        this.status = undefined;
        break;
    }
    this.getData();
  }
  onViewDetail(dataItem: ProvisionDisplayGT) {
    this.showViewDetail = true;
    this.currentViewDetailItem = dataItem;
  }

  closeViewDetail() {
    this.showViewDetail = false;
    this.currentViewDetailItem = undefined;
    this.cd.detectChanges();
  }
  onReject(dataItem: ProvisionDisplayGT) {

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

  onApprove(dataItem: ProvisionDisplayGT) {

    if (dataItem.RemarkType === "Approve") {
      dataItem.RemarkType = undefined;
      return;
    }
    if (this.isPending) {
      if (!this.checkToleranceLimitIsValid(dataItem)) {
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
  isAllSelected() {
    return this.filteredData.filter(x => x.HasPermission && this.checkToleranceLimitIsValid(x)).every(x => x.RemarkType === "Approve")
      && this.filteredData.filter(x => x.HasPermission && this.checkToleranceLimitIsValid(x)).length > 0;
  }
  onApproveAll() {
    var isAllSelected = this.isAllSelected();
    this.filteredData.forEach(item => {
      if (item.HasPermission) {
        if (this.checkToleranceLimitIsValid(item)) {
          if (!isAllSelected) {
            item.RemarkType = "Approve";
          } else {
            item.RemarkType = undefined;
          }
        }
      }
    });
  }
  getData() {
    this.resetPageState();
    if (this.status) {
      this.provisionApi.getProvisonData(this.mudId, this.status, "GT")
        .subscribe((response: ProvisionDisplayResponse) => {
          if (response && typeof (response) === "object") {
            this.data = response.Provision_Display_GT;
            this.data.forEach(item => {
              if ((item.User_Provision > this.userLimitStart && item.User_Provision < this.userLimitEnd) || this.isFinanceUser) {
                item.HasPermission = true;
              } else {
                item.HasPermission = false;
              }
            })
            this.filterData();
            this.setBrandDropdown();
            this.setRegionDropdown();
            this.setSubChannelDropdown();
            this.cd.detectChanges();
          }
        });


      this.userApi.getLandingPageDetails(this.mudId, "Provision", "GT")
        .subscribe((responseData: any) => {
          if (responseData.LandingPage_GT && responseData.LandingPage_GT.length) {
            var data = responseData.LandingPage_GT[0];
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
  getRowClasses(dataItem: ProvisionDisplayGT) {
    if (this.isApproved) {
      return "approval-bg";
    } else if (this.isPending) {
      if (dataItem.HasPermission) {
        if (this.checkToleranceLimitIsValid(dataItem)) {
          return "approval-bg"
        } else {
          return "reject-bg";
        }
      } else {
        return "gray-bg";
      }

    } else if (this.isRejected) {
      return "reject-bg";
    }
    return "";
  }

  checkToleranceLimitIsValid(item: ProvisionDisplayGT | undefined) {
    if (item) {
      const diff = this.getDifference(item);
      if (diff < 0) {
        if ((diff / item.User_Provision * 100) < (item.Tolerance_Limit * -1)) {
          return false;
        }
      }
    }
    return true;
  }

  getDifference(dataItem: ProvisionDisplayGT): number {
    dataItem.Difference = dataItem.User_Provision - dataItem.System_Provision
    return dataItem.Difference;
  }

  getTotalUserProvison() {
    return this.filteredData.map(x => x.User_Provision || 0).reduce((sum, item) => sum + item, 0)
  }
  getTotalSystemProvison() {
    return this.filteredData.map(x => x.System_Provision || 0).reduce((sum, item) => sum + item, 0)
  }
  getTotalDifferenceProvison() {
    return this.filteredData.map(x => this.getDifference(x) || 0).reduce((sum, item) => sum + item, 0)
  }
  getTotalSale() {
    return this.filteredData.map(x => x.Sales || 0).reduce((sum, item) => sum + item, 0)
  }

  setRegionDropdown() {
    this.regionDropdown = [...new Set(this.filteredData.map(x => x.Region).sort())];
  }
  setBrandDropdown() {
    this.brandDropdown = [...new Set(this.filteredData.map(x => x.Brand).sort())];
  }
  setSubChannelDropdown() {
    this.subChannelDropdown = [...new Set(this.filteredData.map(x => x.Sub_Channel).sort())];
  }

  onChangeUserProvision(event: any, dataItem: ProvisionDisplayGT) {
    if (event.target.value && !isNaN(event.target.value) && ((parseInt(event.target.value) > this.userLimitStart && parseInt(event.target.value) < this.userLimitEnd) || this.isFinanceUser)) {
      dataItem.User_Provision = +event.target.value;
    } else {
      event.target.value = dataItem.User_Provision;
    }
  }

  onExportToExcel() {
    const exportData = this.filteredData.map(x => {
      if (this.isApproved) {
        return {
          "Won Id": x.WON_ID || 0,
          "Scheme Details": x.Scheme_Details || "",
          "Region": x.Region || "",
          "Brand": x.Brand || "",
          "Sub Channel": x.Sub_Channel || "",
          "HUL SI-9 Budget": x.HUL_SI9_Budget || "",
          "User Provision": x.User_Provision || 0,
          "System Provision": x.System_Provision || 0,
          "Difference": this.getDifference(x),
          "Scheme Start Date": x.Scheme_StartDate,
          "Scheme End Date": x.Scheme_EndDate,
          "Sales": x.Sales || 0,
          "Prov/Sales": x.CTS || 0,
          "Investment Type": x.Investment_Type || 0,
        }
      }
      return {
        "Won Id": x.WON_ID || 0,
        "Scheme Details": x.Scheme_Details || "",
        "Region": x.Region || "",
        "Brand": x.Brand || "",
        "Sub Channel": x.Sub_Channel || "",
        "HUL SI-9 Budget": x.HUL_SI9_Budget || "",
        "User Provision": x.User_Provision || 0,
        "System Provision": x.System_Provision || 0,
        "Difference": this.getDifference(x),
        "Scheme Start Date": x.Scheme_StartDate,
        "Scheme End Date": x.Scheme_EndDate,
        "Sales": x.Sales || 0,
        "Prov/Sales": x.CTS || 0,
        "Investment Type": x.Investment_Type || 0,
        "Remarks": x.Remarks || ""
      }
    });
    const headers = ["Won Id", "Scheme Details", "Region", "Brand", "Sub Channel", "HUL SI-9 Budget", "User Provision", "System Provision", "Difference",
      "Scheme Start Date", "Scheme End Date", "Sales", "Prov/Sales", "Investment Type"];
    if (!this.isApproved) {
      headers.push("Remarks");
    }
    this.appService.exportAsExcelFile(exportData, "TestFile", headers);
  }

  onUploadToExcel(data: any) {
    if (data && Array.isArray(data) && data.length > 1 && !this.isApproved) {
      var headers = data.shift();
      if (headers && headers.length === 15) {
        data.forEach((element: any) => {
          let wonId = element[0];
          let remarks = element[14];
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
          Approval_DateTime: "",
          Approval_Type: "Provision",
          Approver_MudId: this.mudId,
          Channel_Name: "GT",
          Remarks: item.Remarks || "",
          Status_Level1: this.isFinanceUser ? "A" : item.RemarkType === "Approve" ? "A" : "R",
          Status_Level2: this.isFinanceUser ? item.RemarkType === "Approve" ? "A" : "R" : "",
          User_Provision: item.User_Provision,
          WON_Id: item.WON_ID
        };
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
