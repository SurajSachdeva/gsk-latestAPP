export interface ProvisionDisplayResponse {
    Provision_Display_GT: ProvisionDisplayGT[];
    Provision_Display_CDT: ProvisionDisplayCDT[];
    Provision_Display_MTTOT: ProvisionDisplayMTTOT[];
    Provision_Display_Canvas: ProvisionDisplayCanvas[];
}

export interface IProvisionStatus {
    RemarkType: "Approve" | "Reject" | undefined;
    Remarks: string
}

export interface ProvisionDisplayGT extends IProvisionStatus {
    WON_ID: number;
    Scheme_Details: string;
    Region: string;
    Brand: string;
    Sub_Channel: string;
    User_Provision: number;
    System_Provision: number;
    Difference: number;
    Scheme_StartDate: Date;
    Scheme_EndDate: Date;
    Sales: number;
    CTS: number;
    HUL_SI9_Budget: number;
    Investment_Type: number;
    Status_Level1: string;
    Status_Level2: string;
    Tolerance_Limit:number;
    HasPermission:boolean
}

export interface ProvisionDisplayMTTOT extends IProvisionStatus {
    Row_Id: number;
    Category: string;
    Entity: string;
    Customer_Name: string;
    Brand: string;
    Month_Name: string;
    Rate: number;
    Sales: number;
    Provision: number;
    Opening_Prov: number;
    CTS: number;
    Status_Level1: string;
    Status_Level2: string;
}
export interface ProvisionDisplayCDT extends IProvisionStatus {
    Month_Name: string;
    Distributor_Code: string;
    Distributor_Name: string;
    City: string;
    Rate: number;
    Channel: string;
    Sales: number;
    Provision: number;
    CTS: number;
    Opening_Provision: number;
    Status_Level1: string;
    Status_Level2: string;
    Row_Id:number;
}
export interface ProvisionDisplayCanvas extends IProvisionStatus {
    Row_Id: number;
    Month_Name: string;
    Comapany_Name: string;
    Distributor_Type: string;
    Discount_Type: string;
    Sales: number;
    Provision: number;
    CTS: number;
    Opening_Prov: number;
}

export interface Region {
    name: string;
}


export interface LandingPageDetail {
    approvalCount: number;
    pendingCount: number;
    rejectionCount: number
}

export interface SaveProvisionApprovalLog {
    Approver_MudId: string,
    Approval_DateTime: string,
    WON_Id: number,
    Status_Level1: string,
    Status_Level2: string,
    User_Provision: number,
    Channel_Name: string,
    Approval_Type: string,
    Remarks: string
}