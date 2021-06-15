export interface BrandMaster {
    Brand_Code: string;
    Brand_Description: string;
    SAP_Bison_Prod_Code: string;
    SAP_Material_Code: string;
    Company_Code: string;
}
export interface ChannelMaster {
    Channel: string;
    Expense_Type: string;
    Expense_Description: string;
    BisonRowCode: number;
}


export interface CompanyMaster {
    Company_Code: string;
    Company_Description: string;
    Profit_Center: number;
    Plant: string;
    Sales_Org: string;
}
export interface GLCodeMaster {
    GL_Account_Code: number;
    GL_Account_Desc: string;
}
export interface SchemeMaster {
    SchemeCode: string;
    WON_ID: number;
    GLCode: string;
    Brand: string;
    Cluster: string;
    SchemeDescription: string;
    SchemeBasedOn: string;
    InvoicelevelScheme: string;
    Category: string;
    Channel: string;
    Eligibility: string;
    Schemelevel: string;
    Offtake: string;
    Claimable: string;
    SchemeType: string;
    IsRegister: string;
    OrangeStore: string;
    MDChemist: string;
    CustomerSegmentation: string;
    CalculateBenefitOn: string;
    StartDate: Date;
    EndDate: Date;
    BudgetValue: number;
    CreationDate: Date;
    SlabStart: number;
    SlabEnd: number;
    ForEvery: string;
    ForEveryApplicableOn: string;
    BenefitType: string;
    BenefitValue: number;
    MarketingTeam: string;
    RegionalFinance: string;
    RegionalHead: string;
    CMTHead: string;
    FinanceHead: string;
    MarketingTeamUser: string;
    RegionalFinanceUser: string;
    RegionalHeadUser: string;
    CMTHeadUser: string;
    FinanceHeadUser: string;
    TIMESTMP: Date;
    RRN_VALUE: number;
    fileName?: any;
    ETLDate: Date;
    SrcFlag: string;
}
export interface ItemMaster {
    SKU_Code: string;
    PRDHA?: any;
    HSN_SAC_Code: string;
    Unit_of_Measurement: string;
    Sector?: any;
    Category?: any;
    Brand?: any;
    Group?: any;
    Variant?: any;
    Variant_Description?: any;
    Parent_Description?: any;
    Brand_Description?: any;
    L5_Desc?: any;
    L4_Desc?: any;
    Item_Desc: string;
    Conversion_Description?: any;
    Conv_Volume?: any;
    QBVART_old?: any;
    QBGRP_old?: any;
    QBBRAN_old?: any;
    Conv_Factor?: any;
    Reporting_Unit?: any;
    Reporting_Factor?: any;
    Volume_Factor?: any;
    QBLITM_old?: any;
    QBDESC_old?: any;
    matnr?: any;
    bukrs?: any;
}
export interface CustomerMaster {
    Customer_Code: string;
    Customer_Name: string;
    Sales_Order_Territory_Code: string;
    Sales_Order_Territory_Description: string;
    Depot_Code: string;
    Region_Code: string;
    Region_Description: string;
    City_Name: string;
    City_Code: string;
    State_Code: string;
    State_Description: string;
    Warehouse_Type: string;
    Business_Unit?: any;
    DISTRICT: string;
    District_Description: string;
    Customer_Type: string;
    Customer_Description: string;
    Modified_Date: Date;
    TIMESTMP?: any;
    RRN_VALUE: string;
    MCU: string;
    VATX: string;
    CSTX: string;
    GSTINX: string;
    ADR1X: string;
    ADR2X: string;
    ADR3X: string;
    ADR4X: string;
    PINX: string;
    STATX: string;
    Creation_Date?: any;
    Modify_Date?: any;
    Old_Code?: any;
    WHTYPX?: any;
    ASMTEX: string;
    Channelname: string;
}

export interface ChartAccountMaster {
    Eventtype: string;
    Activity: string;
    Expense_Type: string;
    Account_Type: string;
    GL_Account_Code: number;
}
export interface CanvasMaster {
    New_Customer_Code: string;
    Customer_Name: string;
    SubD_Margin: number;
    SubD_Freight: number;
    RSD_Margin: number;
    RSD_Freight: number;
    Effective_Date: Date;
}
export interface SDRMaster {
    Brand: string;
    SDR_Rate: number;
    Effective_Date: Date;
}
export interface CDTRateMaster {
    Category: string;
    Rate: number;
    IS_ACTIVE: boolean;
}
export interface CDTCityMaster {
    CityX: string;
    City_Name: string;
    Category: string;
    IS_ACTIVE: boolean;
}
export interface NextDocMaster {
    Row_Id: number;
    A_Type: string;
    Company_Code: string;
    Doc_type: string;
    Fiscal_Year: number;
    Next_Number: number;
    IS_Active: boolean;
}
export interface GoAMaster {
    MudID: string;
    UserName: string;
    Role: string;
    EmailId: string;
    Level: string;
    Department: string;
    SlabStart: number;
    SlabEnd?: number;
    Is_Active: boolean;
}
export interface TOTCustomerMaster {
    ROWID: number;
    Category: string;
    Channel: string;
    Filter: string;
    Account: string;
    AccountId: string;
    IS_ACTIVE: boolean;
}
export interface BusinessAreaMaster {
    Business_Area_List: number;
    Business_Description: string;
    IS_ACTIVE: boolean;
}

export interface BrandRatioMaster {
    ENTITY: string,
    Brand_Code: string,
    RATIO: number,
    IS_ACTIVE: boolean
}
export interface CanvasCategoryMaster {
    Secondary_Channel: string;
    Category: string;
}
export interface ClaimCodeMaster {
    Channel: string;
    Entity: string;
    Type: string;
    Sub_Type: string;
    Code: string;
}

export interface TOTMaster {
    Category: string;
    Account: string;
    Brand: string;
    Rate: number;
    Effective_Date: string;
    Is_Active: boolean;
}

export interface LineItemMaster {
    Claim_Type: string;
    Event_Type: string;
    SAP_Reports: string;
    Line_Item_Text_Format: string;
}
export interface PlantMaster {
    Company_Code: string;
    Region: string;
    Plant_Code: number;
    Sales_Org: string;
    IS_Active: boolean;
}
export interface ReportChannelMaster {
    Channel: string;
    Type: string;
    Channel_Group: string;
    Sales_Group: string;
    D_ND: string;
}
export interface MasterResponseModel {
    Brand_Master: BrandMaster[];
    Channel_Master: ChannelMaster[];
    Company_Master: CompanyMaster[];
    GL_Code_Master: GLCodeMaster[];
    Scheme_Master: SchemeMaster[]
    Item_Master: ItemMaster[];
    CustomerMaster: CustomerMaster[];
    Chart_Account_Master: ChartAccountMaster[];
    Canvas: CanvasMaster[];
    SDR: SDRMaster[];
    CDT_Rate_Master: CDTRateMaster[];
    CDT_City_Master: CDTCityMaster[];
    NextDoc_Master: NextDocMaster[];
    Goa_Master: GoAMaster[];
    MT_Customer_MST: TOTCustomerMaster[];
    Business_Area_Master: BusinessAreaMaster[];
    Brand_Ratio_Master: BrandRatioMaster[];
    CANVAS_CATEGORY_MST: CanvasCategoryMaster[];
    CLAIM_CODE_MASTER: ClaimCodeMaster[];
    MTTOT: TOTMaster[];
    LINE_ITEM_MST: LineItemMaster[];
    Plant_Master: PlantMaster[];
    REPORT_CHANNEL_MST: ReportChannelMaster[];
}


export interface SaveMasterBaseModel {
    Mode: "Insert" | "Update" | "Delete";
    MasterName: "BRAND_MASTER" | "CANVAS_MASTER" | "CDT_RATE_MASTER" | "CHANNEL_MASTER" | "COMPANY_MASTER" | "GL_CODE_MASTER" | "USER_MASTER" | "BUSINESS_AREA_MASTER" | "CDT_CITY_MASTER" | "CHART_ACCOUNT_MASTER" | "SDR_MASTER" | "MTTOT_MASTER_NEW" | "MT_CUSTOMER_MASTER" | "REPORT_CHANNEL_MASTER" | "LINE_ITEM_MASTER" | "BRAND_RATIO_MASTER" | "CANVAS_CATEGORY_MST" | "LINE_ITEM_MASTER" | "NEXTDOC_MASTER" | "BRAND_RATIO_MASTER" | "CLAIM_CODE_MASTER";
}

export interface InsertUpdateBrandMasterModel extends SaveMasterBaseModel {
    Brand_Code: string;
    Brand_Description: string;
    SAP_Bison_Prod_Code: string;
    SAP_Material_Code: string;
    Company_Code: string;
}

export interface DeleteBrandMasterModel extends SaveMasterBaseModel {
    Brand_Code: string;
}

export interface InsertUpdateCanvasMasterModel extends SaveMasterBaseModel {
    CanvasRate_New_Customer_Code: string;
    CanvasRate_Customer_Name: string;
    SubD_Margin: number;
    SubD_Freight: number;
    RSD_Margin: number;
    RSD_Freight: number;
}
export interface DeleteCanvasMasterModel extends SaveMasterBaseModel {
    CanvasRate_New_Customer_Code: string;
    CanvasRate_Customer_Name: string;
}

export interface InsertUpdateChannelMasterModel extends SaveMasterBaseModel {
    Channel: string,
    Channel_Expense_Type: string,
    BisonRowCode: string
    Expense_Description: string | undefined
}


export interface DeleteChannelMasterModel extends SaveMasterBaseModel {
    Channel: string,
    Channel_Expense_Type: string,
}

export interface InsertUpdateCompanyMasterModel extends SaveMasterBaseModel {
    Company_CodeMst: string;
    Company_Description: string;
    Profit_Center: string,
    Plant: string,
    Sales_Org: string
}

export interface DeleteCompanyMasterModel extends SaveMasterBaseModel {
    Company_CodeMst: string;
}

export interface InsertUpdateGLCodeMasterModel extends SaveMasterBaseModel {
    GLCodeMaster_Account_Code: string;
    GL_Account_Desc: string;
}

export interface DeleteGLCodeMasterModel extends SaveMasterBaseModel {
    GLCodeMaster_Account_Code: string;
}

export interface InsertGoAMasterModel extends SaveMasterBaseModel {
    MudID: string
    UserName: string,
    Role: string;
    EmailId: string,
    Department: string;
    SlabStart: number;
    SlabEnd: number;
}

export interface UpdateGoAMasterModel extends SaveMasterBaseModel {
    MudID: string
    Role: string;
    Department: string;
    SlabStart: number;
    SlabEnd: number;
}

export interface DeleteGoAMasterModel extends SaveMasterBaseModel {
    MudID: string
}

export interface InsertUpdateDeleteBusinessAreaMasterModel extends SaveMasterBaseModel {
    Business_Area_List: string,
    Business_Description: string;
}

export interface InsertUpdateCDTCityMasterModel extends SaveMasterBaseModel {
    CityX: string;
    City_Name: string;
    Category: string;
}

export interface DeleteCDTCityMasterModel extends SaveMasterBaseModel {
    CityX: string;
}
export interface InsertDeleteCDTRateMasterModel extends SaveMasterBaseModel {
    CDTRateMaster_Category: string,
    Rate: number,
}


export interface InsertUpdateChartAccountMasterModel extends SaveMasterBaseModel {
    Eventtype: string;
    Activity: string;
    Expense_Type: string;
    Account_Type: string;
    GL_Account_Code: string;
}

export interface DeleteChartAccountMasterModel extends SaveMasterBaseModel {
    Eventtype: string;
    Expense_Type: string;
    Account_Type: string;
}

export interface InsertSdrMasterModel extends SaveMasterBaseModel {
    Brand: string;
    SDR_Rate: number;
}
export interface DeleteSdrMasterModel extends SaveMasterBaseModel {
    Brand: string;
}

export interface InsertTOTMasterModel extends SaveMasterBaseModel {
    MTTOTRateMaster_Category: string;
    MTTOTRate_Account: string;
    MTTOTRate_Brand: string
    MTTOTRate_Rate: string
}

export interface DeleteTOTMasterModel extends SaveMasterBaseModel {
    MTTOTRateMaster_Category: string;
    MTTOTRate_Brand: string
}

export interface InsertUpdateTOTCustomerMasterModel extends SaveMasterBaseModel {
    MTTOTCustomerCategory: string;
    MTTOTCustomerChannel: string;
    Filter: string;
    Account: string;
}

export interface DeleteTOTCustomerMasterModel extends SaveMasterBaseModel {
    MTTOTCustomerCategory: string;
    Account: string;
}

export interface InsertUpdateReportChannelMasterModel extends SaveMasterBaseModel {
    Report_Channel: string;
    D_ND: string;
    R_Type: string
    Channel_Group: string
    Sales_Group: string
}

export interface DeleteReportChannelMasterModel extends SaveMasterBaseModel {
    Report_Channel: string;
}


export interface DeleteUpdateReportChannelMasterModel extends SaveMasterBaseModel {
    Claim_Type: string;
    Event_Type: string;
    SAP_Reports: string;
    Line_Item_Text_Format: string;
}

export interface InsertUpdateLineItemMasterModel extends SaveMasterBaseModel {
    Claim_Type: string;
    Event_Type: string
    SAP_Reports: string
    Line_Item_Text_Format: string;
}

export interface DeleteLineItemMasterModel extends SaveMasterBaseModel {
    Claim_Type: string;
    Event_Type: string
    SAP_Reports: string
}

export interface InsertUpdateNextDocNumberMasterModel extends SaveMasterBaseModel {
    A_Type: string;
    NextDoc_Company_Code: string;
    Doc_type: string;
    Fiscal_Year: number
    Next_Number: number;
}

export interface DeleteNextDocNumberMasterModel extends SaveMasterBaseModel {
    NextDoc_Company_Code: string;
    Doc_type: string;
    Fiscal_Year: number
}

export interface InsertUpdateBrandRatioMasterModel extends SaveMasterBaseModel {
    Entity: string,
    Brand_Ratio_Code: string,
    Ratio: number
}

export interface DeleteClaimCodeMasterModel extends SaveMasterBaseModel {
    CHANNEL_CLAIM: string;
    CC_ENTITY: string;
    CC_TYPE: string;
    SUB_TYPE: string;
}
export interface InsertUpdateClaimCodeMasterModel extends DeleteClaimCodeMasterModel {
    CC_CODE: string;
}
