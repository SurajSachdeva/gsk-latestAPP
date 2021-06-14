export interface UserDetail {
    MudID: string;
    Role: string;
    EmailId: string;
    Level: string;
    UserName: string;
    Department: string;
    SlabStart: number;
    SlabEnd: number;
}

export interface LoginResponse {
    userDetails: UserDetail[];
}

export interface LandingPageModel {
    Channel_Name: string;
    Act_Approval_Count: number;
    Act_Pending_Count: number;
    Act_Rejection_Count: number;
    Prov_Approval_Count: number;
    Prov_Pending_Count: number;
    Prov_Rejection_Count: number;
}

export interface LandingPageResponse {
    LandingPage_CDT: LandingPageModel[];
    LandingPage_Canvas: LandingPageModel[];
    LandingPage_MTTOT: LandingPageModel[];
    LandingPage_GT: LandingPageModel[];
    LandingPage_SDR: LandingPageModel[];
}

export interface LandingPageViewDetailViewModel {
    approvalCount: number;
    pendingCount: number;
    rejectionCount: number;
}