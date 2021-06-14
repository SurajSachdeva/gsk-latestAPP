import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProvisionDisplayResponse } from "../models/provision";

@Injectable({
    providedIn: "root"
})
export class UserApi {
    constructor(private http: HttpClient) { }

    login(userName: string) {
        let params = new HttpParams().set("UserName", userName);
        return this.http.get<any>(`https://us6tsmasd001.azurewebsites.net/API/UserDetails/ADUserExists`, { params });
    }

    getLandingPageDetails(mudId: string, type: string, channel: string) {
        let params = new HttpParams().set("MudID", mudId).set("Type", type).set("Channel", channel);
        return this.http.get<any>(`https://us6tsmasd001.azurewebsites.net/API/LandingPage/GetLandingPageDetails`, { params });
    }
}
