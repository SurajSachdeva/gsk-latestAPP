import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvisionApi } from 'src/app/apis/provision-api';
import { UserApi } from 'src/app/apis/user-api';
import { LandingPageDetail, ProvisionDisplayCanvas, ProvisionDisplayResponse } from 'src/app/models/provision';
import { UserDetail } from 'src/app/models/user';
import { AlertModalComponent } from 'src/app/modules/shared/components/alert-modal/alert-modal.component';
import { RemarksModalComponent } from 'src/app/modules/shared/components/remarks-modal/remarks-modal.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-provision-canvas-channel',
  templateUrl: './provision-canvas-channel.component.html',
  styleUrls: ['./provision-canvas-channel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvisionCanvasChannelComponent implements OnInit {

  showViewDetail: boolean = false;
  currentViewDetailItem: ProvisionDisplayCanvas | undefined;
  mudId: string = '';
  data: ProvisionDisplayCanvas[] = [];
  filteredData: ProvisionDisplayCanvas[] = [];
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
    { name: "Provision", linkUrl: "/ApprovalWorkflow" },
    { name: "Canvas", linkUrl: "/ApprovalWorkflow" },
  ]
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
    this.companyDropdown = [];
    this.rsdDropdown = [];
    this.frtDropdown = [];
    this.formGroup.patchValue({ month: '', company: '', rsd: '', frt: '' }, { emitEvent: false });
  }
  filterData() {
    const { month, rsd, company, frt } = this.formGroup.value;
    this.filteredData = this.data;
    if (month) {
      this.filteredData = this.filteredData.filter(x => x.Month_Name === month);
    }
    if (rsd) {
      this.filteredData = this.filteredData.filter(x => x.Distributor_Type === rsd);
    }
    if (frt) {
      this.filteredData = this.filteredData.filter(x => x.Discount_Type === frt);
    }
    if (company) {
      this.filteredData = this.filteredData.filter(x => x.Comapany_Name === company);
    }
  }
  loadData() {
    this.data = [];
    switch ((this.type || '').toLowerCase()) {
      case 'approved':
        this.status = "A";
        this.breadCrumbData = [
          { name: "Provision", linkUrl: "/ApprovalWorkflow" },
          { name: "Canvas", linkUrl: "/ApprovalWorkflow" },
          { name: "Approved", linkUrl: "/Provision/Canvas/Approved" },
        ]
        break;
      case 'pending':
        this.status = "P";
        this.breadCrumbData = [
          { name: "Provision", linkUrl: "/ApprovalWorkflow" },
          { name: "Canvas", linkUrl: "/ApprovalWorkflow" },
          { name: "Pending", linkUrl: "/Provision/Canvas/Pending" },
        ];
        break;
      case 'rejected':
        this.status = "R";
        this.breadCrumbData = [
          { name: "Provision", linkUrl: "/ApprovalWorkflow" },
          { name: "Canvas", linkUrl: "/ApprovalWorkflow" },
          { name: "Rejected", linkUrl: "/Provision/Canvas/Rejected" },
        ];
        break;
      default:
        this.status = undefined;
        break;
    }
    this.getData();
  }
  onViewDetail(dataItem: ProvisionDisplayCanvas) {
    this.showViewDetail = true;
    this.currentViewDetailItem = dataItem;
  }

  closeViewDetail() {
    this.showViewDetail = false;
    this.currentViewDetailItem = undefined;
    this.cd.detectChanges();
  }
  onReject(dataItem: ProvisionDisplayCanvas) {

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

  onApprove(dataItem: ProvisionDisplayCanvas) {

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
    })
  }
  getData() {
    this.resetPageState();
    if (this.status) {
      this.provisionApi.getProvisonData(this.mudId, this.status, "Canvas")
        .subscribe((response: ProvisionDisplayResponse) => {
          if (response && typeof (response) === "object") {
            this.data = response.Provision_Display_Canvas;
            this.filterData();
            this.setDropDowns();
            this.cd.detectChanges();
          }
        });


      this.userApi.getLandingPageDetails(this.mudId, "Provision", "Canvas")
        .subscribe((responseData: any) => {
          if (responseData.LandingPage_Canvas && responseData.LandingPage_Canvas.length) {
            var data = responseData.LandingPage_Canvas[0];
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
    this.companyDropdown = [...new Set(this.filteredData.map(x => x.Comapany_Name).sort())];
    this.rsdDropdown = [...new Set(this.filteredData.map(x => x.Distributor_Type).sort())];
    this.frtDropdown = [...new Set(this.filteredData.map(x => x.Discount_Type).sort())];
  }
  getRowClasses(dataItem: ProvisionDisplayCanvas) {
    if (this.isApproved) {
      return "approval-bg";
    } else if (this.isPending) {
      return "approval-bg";
    } else if (this.isRejected) {
      return "reject-bg";
    }
    return "";
  }


  getTotalProvision() {
    return this.filteredData.map(x => x.Provision || 0).reduce((sum, item) => sum + item, 0)
  }

  getTotalSale() {
    return this.filteredData.map(x => x.Sales || 0).reduce((sum, item) => sum + item, 0)
  }

  getTotalOpenProvision() {
    return this.filteredData.map(x => x.Opening_Prov || 0).reduce((sum, item) => sum + item, 0)
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
          "CTC": x.CTS || 0,
          "Opening Provision": x.Opening_Prov || 0
        }
      }
      else {
        return {
          "Row Id": x.Row_Id,
          "Month": x.Month_Name || "",
          "Company Name": x.Comapany_Name || "",
          "Sub-D/RSD": x.Distributor_Type || "",
          "FRT/MGN": x.Discount_Type || "",
          "Sales": x.Sales || 0,
          "Provision": x.Provision || "",
          "CTC": x.CTS || 0,
          "Opening Provision": x.Opening_Prov || 0,
          "Remarks": x.Remarks || ""
        }
      }

    });
    const headers = ["Row Id", "Month", "Company Name", "Sub-D/RSD", "FRT/MGN", "Sales", "Provision", "CTC", "Opening Provision"]
    if (!this.isApproved) {
      headers.push("Remarks");
    }
    this.appService.exportAsExcelFile(exportData, "Canvas", headers);
  }

  onUploadToExcel(data: any) {
    if (data && Array.isArray(data) && data.length > 1 && !this.isApproved) {
      var headers = data.shift();
      if (headers && headers.length === 10) {
        data.forEach((element: any) => {
          let rowId = element[0];
          let remarks = element[9];
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
          "Approver_MudId": "nxk19241",
          "Month": item.Month_Name,
          "Company": item.Comapany_Name,
          "Distributor_Type": item.Distributor_Type,
          "Discount_Type": item.Discount_Type,
          "Status_Level2": item.RemarkType === "Approve" ? "A" : "R",
          "Channel_Name": "Canvas",
          "Approval_Type": "Provision",
          "Remarks": item.Remarks || ""
        };
        await this.provisionApi.saveProvisionApprovalLog(request).toPromise();
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
