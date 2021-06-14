import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActualDisplayResponse } from "../models/actual";

@Injectable({
    providedIn: "root"
})
export class ActualApi {
    constructor(private http: HttpClient) { }

    getActualData(mudId:string, status: string, channel: string) {
        let params = new HttpParams().set("MudID",mudId).set("Status", status).set("Channel", channel);
        return this.http.get<ActualDisplayResponse>(`https://us6tsmasd001.azurewebsites.net/API/ActualDisplay/GetActualDataDisplay`, { params });
    }

    saveActualApprovalLog(data: any) {
        return this.http.post(`https://us6tsmasd001.azurewebsites.net/API/ActualApproval/SaveActualApprovalLog`, data);
    }
    // saveFileUpload(attachments: any) {
    //     return this.http.post(`https://demowebapi2021.azurewebsites.net/api/excel/UploadWONSheet`, attachments);
    // }
    saveFileUpload(formData: FormData) {
        let headers = new HttpHeaders();
    
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
    
        const httpOptions = { headers: headers };
    
        return this.http.post('https://demowebapi2021.azurewebsites.net/api/excel'+ '/UploadWONSheet', formData, httpOptions)
      }
      gTManualFileUpload(formData: FormData) {
        let headers = new HttpHeaders();
    
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
    
        const httpOptions = { headers: headers };
    
        return this.http.post('https://localhost:44311/api/excel/UploadGTManualProvisionSheet', formData, httpOptions)
      }

}
