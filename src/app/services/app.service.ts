import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { UserDetail } from '../models/user';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router) { }

  public exportAsExcelFile(json: any[], excelFileName: string, headers: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, { header: headers });
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public saveLoginUserDetail(user: UserDetail): void {
    localStorage.setItem("userDetail", JSON.stringify(user));
  }

  public getLoginUserDetail() : UserDetail |  undefined {
    var userDetail = localStorage.getItem("userDetail");
    if (userDetail) {
      return JSON.parse(userDetail)
    } else {
      return undefined;
    }
  }
  
  public logOut() {
    localStorage.removeItem("userDetail");
    this.router.navigate(['/']);
  }
}
