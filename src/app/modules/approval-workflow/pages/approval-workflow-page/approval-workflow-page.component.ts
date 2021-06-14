import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserApi } from 'src/app/apis/user-api';
import { LandingPageResponse, LandingPageViewDetailViewModel } from 'src/app/models/user';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-approval-workflow-page',
  templateUrl: './approval-workflow-page.component.html',
  styleUrls: ['./approval-workflow-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalWorkflowPageComponent implements OnInit {

  provisionTabName: string = "GT";
  actualTabName: string = "GT";
  mudId: string = "";
  provisionGTLandingPageDetail: LandingPageViewDetailViewModel = {
    approvalCount: 0,
    pendingCount: 0,
    rejectionCount: 0
  };
  provisionMTTOTLandingPageDetail: LandingPageViewDetailViewModel = {
    approvalCount: 0,
    pendingCount: 0,
    rejectionCount: 0
  };
  provisionCanvasLandingPageDetail: LandingPageViewDetailViewModel = {
    approvalCount: 0,
    pendingCount: 0,
    rejectionCount: 0
  };
  provisionCDTLandingPageDetail: LandingPageViewDetailViewModel = {
    approvalCount: 0,
    pendingCount: 0,
    rejectionCount: 0
  };

  actualGTLandingPageDetail: LandingPageViewDetailViewModel = {
    approvalCount: 0,
    pendingCount: 0,
    rejectionCount: 0
  };
  actualMTTOTLandingPageDetail: LandingPageViewDetailViewModel = {
    approvalCount: 0,
    pendingCount: 0,
    rejectionCount: 0
  };
  actualCanvasLandingPageDetail: LandingPageViewDetailViewModel = {
    approvalCount: 0,
    pendingCount: 0,
    rejectionCount: 0
  };
  actualCDTLandingPageDetail: LandingPageViewDetailViewModel = {
    approvalCount: 0,
    pendingCount: 0,
    rejectionCount: 0
  };
  actualSDRLandingPageDetail: LandingPageViewDetailViewModel = {
    approvalCount: 0,
    pendingCount: 0,
    rejectionCount: 0
  };
  constructor(
    private userApi: UserApi,
    private appService:AppService,
    private cd:ChangeDetectorRef
  ) { 
    const userDetail = this.appService.getLoginUserDetail()
    if (userDetail) {
      this.mudId = userDetail.MudID;
    }
  }

  ngOnInit(): void {
    this.getProvisionLandingPageDetail();
    this.getActualLandingPageDetail();
  }

  getProvisionLandingPageDetail() {
    this.getProvisionCDTLandingPageDetail();
    this.getProvisionCanvasLandingPageDetail();
    this.getProvisionGTLandingPageDetail();
    this.getProvisionMTTOTLandingPageDetail();
  }
  getActualLandingPageDetail() {
    this.getActualCDTLandingPageDetail();
    this.getActualCanvasLandingPageDetail();
    this.getActualGTLandingPageDetail();
    this.getActualMTTOTLandingPageDetail();
    this.getActualSDRLandingPageDetail();
  }
  openProvisionTab(tabName: string) {
    this.provisionTabName = tabName;
  }
  shouldShowProvisionTab(tabName: string) {
    return this.provisionTabName === tabName
  }
  openActualTab(tabName: string) {
    this.actualTabName = tabName;
  }
  shouldShowActualTab(tabName: string) {
    return this.actualTabName === tabName
  }
  getProvisionGTLandingPageDetail() {
    this.userApi.getLandingPageDetails(this.mudId, "Provision", "GT")
      .subscribe((responseData: LandingPageResponse) => {
        if (responseData.LandingPage_GT && responseData.LandingPage_GT.length) {
          var data = responseData.LandingPage_GT[0];
          this.provisionGTLandingPageDetail = {
            approvalCount: data.Prov_Approval_Count || 0,
            pendingCount: data.Prov_Pending_Count || 0,
            rejectionCount: data.Prov_Rejection_Count || 0
          }
        }
        this.cd.detectChanges();
      });
  }
  getProvisionCanvasLandingPageDetail() {
    this.userApi.getLandingPageDetails(this.mudId, "Provision", "Canvas")
      .subscribe((responseData: LandingPageResponse) => {
        if (responseData.LandingPage_Canvas && responseData.LandingPage_Canvas.length) {
          var data = responseData.LandingPage_Canvas[0];
          this.provisionCanvasLandingPageDetail = {
            approvalCount: data.Prov_Approval_Count || 0,
            pendingCount: data.Prov_Pending_Count || 0,
            rejectionCount: data.Prov_Rejection_Count || 0
          }
        }
        this.cd.detectChanges();
      });
  }
  getProvisionCDTLandingPageDetail() {
    this.userApi.getLandingPageDetails(this.mudId, "Provision", "CDT")
      .subscribe((responseData: LandingPageResponse) => {
        if (responseData.LandingPage_CDT && responseData.LandingPage_CDT.length) {
          var data = responseData.LandingPage_CDT[0];
          this.provisionCDTLandingPageDetail = {
            approvalCount: data.Prov_Approval_Count || 0,
            pendingCount: data.Prov_Pending_Count || 0,
            rejectionCount: data.Prov_Rejection_Count || 0
          }
        }
        this.cd.detectChanges();
      });
  }
  getProvisionMTTOTLandingPageDetail() {
    this.userApi.getLandingPageDetails(this.mudId, "Provision", "MTTOT")
      .subscribe((responseData: LandingPageResponse) => {
        if (responseData.LandingPage_MTTOT && responseData.LandingPage_MTTOT.length) {
          var data = responseData.LandingPage_MTTOT[0];
          this.provisionMTTOTLandingPageDetail = {
            approvalCount: data.Prov_Approval_Count || 0,
            pendingCount: data.Prov_Pending_Count || 0,
            rejectionCount: data.Prov_Rejection_Count || 0
          }
        }
        this.cd.detectChanges();
      });
  }

  getActualGTLandingPageDetail() {
    this.userApi.getLandingPageDetails(this.mudId, "Actual", "GT")
      .subscribe((responseData: LandingPageResponse) => {
        if (responseData.LandingPage_GT && responseData.LandingPage_GT.length) {
          var data = responseData.LandingPage_GT[0];
          this.actualGTLandingPageDetail = {
            approvalCount: data.Act_Approval_Count || 0,
            pendingCount: data.Act_Pending_Count || 0,
            rejectionCount: data.Act_Rejection_Count || 0
          }
        }
        this.cd.detectChanges();
      });
  }
  getActualCanvasLandingPageDetail() {
    this.userApi.getLandingPageDetails(this.mudId, "Actual", "Canvas")
      .subscribe((responseData: LandingPageResponse) => {
        if (responseData.LandingPage_Canvas && responseData.LandingPage_Canvas.length) {
          var data = responseData.LandingPage_Canvas[0];
          this.actualCanvasLandingPageDetail = {
            approvalCount: data.Act_Approval_Count || 0,
            pendingCount: data.Act_Pending_Count || 0,
            rejectionCount: data.Act_Rejection_Count || 0
          }
        }
        this.cd.detectChanges();
      });
  }
  getActualCDTLandingPageDetail() {
    this.userApi.getLandingPageDetails(this.mudId, "Actual", "CDT")
      .subscribe((responseData: LandingPageResponse) => {
        if (responseData.LandingPage_CDT && responseData.LandingPage_CDT.length) {
          var data = responseData.LandingPage_CDT[0];
          this.actualCDTLandingPageDetail = {
            approvalCount: data.Act_Approval_Count || 0,
            pendingCount: data.Act_Pending_Count || 0,
            rejectionCount: data.Act_Rejection_Count || 0
          }
        }
        this.cd.detectChanges();
      });
  }
  getActualMTTOTLandingPageDetail() {
    this.userApi.getLandingPageDetails(this.mudId, "Actual", "MTTOT")
      .subscribe((responseData: LandingPageResponse) => {
        if (responseData.LandingPage_MTTOT && responseData.LandingPage_MTTOT.length) {
          var data = responseData.LandingPage_MTTOT[0];
          this.actualMTTOTLandingPageDetail = {
            approvalCount: data.Act_Approval_Count || 0,
            pendingCount: data.Act_Pending_Count || 0,
            rejectionCount: data.Act_Rejection_Count || 0
          }
        }
        this.cd.detectChanges();
      });
  }
  getActualSDRLandingPageDetail() {
    this.userApi.getLandingPageDetails(this.mudId, "Actual", "SDR")
      .subscribe((responseData: LandingPageResponse) => {
        if (responseData.LandingPage_SDR && responseData.LandingPage_SDR.length) {
          var data = responseData.LandingPage_SDR[0];
          this.actualSDRLandingPageDetail = {
            approvalCount: data.Act_Approval_Count || 0,
            pendingCount: data.Act_Pending_Count || 0,
            rejectionCount: data.Act_Rejection_Count || 0
          }
        }
        this.cd.detectChanges();
      });
  }
}
