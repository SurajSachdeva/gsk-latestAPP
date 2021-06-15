export interface BrandMasterDropdownModel {
    Company_Code: string
}
export interface BrandRatioMasterDropdownModel {
    Brand_Code: string
}
export interface ChannelMasterDropdownModel {
    Channel: string;
    GL_Account_Code: number;
    Expense_Type: string;
}
export interface CanvasCategoryMasterDropdownModel {
    Customer_Name: string;
}

export interface LineItemMasterDropdownModel {
    Expense_Type: string;
}

export interface DropdownResponseModel {
    BRAND_MASTER: BrandMasterDropdownModel[];
    BRAND_RATIO_MASTER: BrandRatioMasterDropdownModel[];
    CHANNEL_MASTER: ChannelMasterDropdownModel[];
    CANVAS_CATEGORY_MASTER: CanvasCategoryMasterDropdownModel[];
    LINE_ITEM_TEXTMASTER: LineItemMasterDropdownModel[];
}