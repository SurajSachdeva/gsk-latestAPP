import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProvisionDisplayResponse } from "../models/provision";

@Injectable({
    providedIn: "root"
})
export class ProvisionApi {
    constructor(private http: HttpClient) { }

    getProvisonData(mudId:string, status: string, channel: string) {
        let params = new HttpParams().set("MudID",mudId).set("Status", status).set("Channel", channel);
        return this.http.get<ProvisionDisplayResponse>(`https://demowebapi2021.azurewebsites.net/api/user/GetProvisions`, { params });
    }

    saveProvisionApprovalLog(data: any) {
        return this.http.post(`https://demowebapi2021.azurewebsites.net/api/user/SaveProvisionApprovalLog`, data);
    }
}
