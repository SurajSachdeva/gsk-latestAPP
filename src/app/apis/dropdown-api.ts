import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DropdownResponseModel } from "../models/dropdown";

@Injectable({
    providedIn: "root"
})
export class DropdownApi {


    constructor(private http: HttpClient) { }


    getDropdown(masterName: any, columnName='') {
        const params = new HttpParams().set("MasterName", masterName).set("ColumnName", columnName)
        return this.http.get<DropdownResponseModel>(`http://us6tsmasd001.azurewebsites.net/API/DropDownBind/GetDropDownlistDetail`, { params: params });
    }

}
