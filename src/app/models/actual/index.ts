export interface ActualDisplayResponse {
    ActualDataDisplay_GT: ActualDisplayGT[];
    ActualDataDisplay_MTTOT: ActualDisplayMTTOT[];
    ActualDataDisplay_Canvas: ActualDisplayCanvas[];
    ActualDataDisplay_SDR: ActualDisplaySDR[];
    ActualDataDisplay_CDT: ActualDisplayCDT[];
}

export interface IActualStatus {
    RemarkType: "Approve" | "Reject" | undefined;
    Remarks: string
}

export interface ActualDisplayGT extends IActualStatus {
    WON_ID: number;
  Scheme_Details: string;
  Region: string;
  Brand: string;
  Sub_Channel: string;
  User_Provision: number;
  Actuals:number;
  Difference: number;
  Scheme_StartDate: string;
  Scheme_EndDate: string;
  Sales: number;
  CTS: number;
  HUL_SI9_Budget: string;
  Investment_Type: string;
  Status_Level1: string;
  Status_Level2: string;
}

export interface ActualDisplayMTTOT extends IActualStatus {
    Row_Id: number;
    Category: string;
    Entity: string;
    Customer_Name: string;
    Brand: string;
    Month_Name: string;
    Rate: number;
    Sales: number;
    Provision: number;
    CTS: number;
    Actual: number;
    Closing_Prov: number;
    Status_Level1: string;
    Status_Level2: string;
}

export interface ActualDisplayCanvas extends IActualStatus {
    Row_Id: number;
    Month_Name: string;
    Comapany_Name: string;
    Distributor_Type: string;
    Discount_Type: string;
    Sales: number;
    Provision: number;
    CTS: number;
    Actual: number;
    Closing_Prov: number;
    Status_Level1: string;
    Status_Level2: string;
    Remarks: string;
}

export interface ActualDisplaySDR extends IActualStatus {
    Row_Id: number;
    Month_Name: string;
    Brand: string;
    Rate: string;
    Last_5Month_Sales: number;
    Provision: number;
    Actual: number;
    Closing_Prov: number;
    Remarks: string;
}
export interface ActualDisplayCDT extends IActualStatus {
    Row_Id: number;
    Month_Name: string;
    Distributor_Code: string;
    Distributor_Name: string;
    City: string;
    Rate: number;
    Channel: string;
    Sales: number;
    Provision: string;
    CTS: string;
    Actual: number;
    Closing_Provision: number;
    Remarks: string;
}
export interface Region {
    name: string;
}


export interface LandingPageDetail {
    approvalCount: number;
    pendingCount: number;
    rejectionCount: number
}