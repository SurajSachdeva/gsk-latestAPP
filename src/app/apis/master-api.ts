import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterResponseModel } from "../models/master";

@Injectable({
    providedIn: "root"
})
export class MasterApi {

    
    constructor(private http: HttpClient) { }

    getMasters(masterName: string, isDemoWebApi = false) {
        if (isDemoWebApi) {
            const params = new HttpParams().set("name", masterName)
            return this.http.get<MasterResponseModel>(`https://demowebapi2021.azurewebsites.net/api/master/getmasterdata`, { params });
        } else {
            const params = new HttpParams().set("MasterName", masterName)
            return this.http.get<MasterResponseModel>(`http://us6tsmasd001.azurewebsites.net/API/MasterData/GetMasterDetails`, { params });
        }
    }

    saveMasterData(data:any) {
        return this.http.post<MasterResponseModel>(`http://us6tsmasd001.azurewebsites.net/API/OperationalMaster/SaveMasterData`,data);
    }

    getDropdownList(data:any) {
        return this.http.post<MasterResponseModel>(`http://us6tsmasd001.azurewebsites.net/API/OperationalMaster/SaveMasterData`,data);
    }

}
