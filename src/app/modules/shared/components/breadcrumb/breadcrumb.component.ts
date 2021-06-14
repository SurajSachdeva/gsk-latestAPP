import { Component, EventEmitter, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  inputs: ["showButtons", "showUploadButton","data"],
  outputs: ["downloadExcel", "uploadExcel"]
})
export class BreadcrumbComponent implements OnInit {
  uploadExcel: EventEmitter<any> = new EventEmitter<any>();
  downloadExcel: EventEmitter<void> = new EventEmitter();
  showButtons: boolean = false;
  showUploadButton: boolean = false;
  data: { name: string, linkUrl: string }[]=[];
  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.uploadExcel.emit(data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

}
