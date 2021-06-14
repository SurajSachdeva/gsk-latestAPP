import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualApi } from 'src/app/apis/actual-api';

@Component({
  selector: 'app-won-creation-sheet',
  templateUrl: './won-creation-sheet.component.html',
  styleUrls: ['./won-creation-sheet.component.scss']
})
export class WonCreationSheetComponent implements OnInit {

  @ViewChild('fileInput') fileInput : any;
  @ViewChild('fileInputGT') fileInputGT : any;
  message: string | undefined;
  actualTabName: string = "WCU";
  toleranceFormControl = new FormControl();
  close: EventEmitter<void> = new EventEmitter();
  toleranceData: any;
  constructor(private http: HttpClient,
    private modalService: NgbModal,private actualApi: ActualApi,) { }

  ngOnInit(): void {
  }
  openActualTab(tabName: string) {
    this.actualTabName = tabName;
  }
  shouldShowActualTab(tabName: string) {
    return this.actualTabName === tabName
  }
  // onFileChange(event: any) { 
  //   if (event.target.files && event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     let files = [];
  //     files.push(file);
  //     this.attachments = files;
  //   };
  // }
  // FileSubmit(){
  //   this.actualApi.saveFileUpload(this.attachments).subscribe(
  //     data => {
  //      alert(data)        
  //     }
  //   )
  // }
  uploadFile() {
    let formData = new FormData();
    formData.append('upload', this.fileInput.nativeElement.files[0])
    this.actualApi.saveFileUpload(formData).subscribe(result => {
      //this.message = result.toString();
      alert(result);
    });
  }
  uploadFileGT() {
    let formData = new FormData();
    formData.append('uploadGT', this.fileInputGT.nativeElement.files[0])
    this.actualApi.gTManualFileUpload(formData).subscribe(result => {
      //this.message = result.toString();
      alert(result);
    });
  }
  onToleranceLimit() {
    if (this.toleranceFormControl.value) {     
        this.toleranceData.tolerance = this.toleranceFormControl.value;
        this.close.emit();
      
    }
  }
}
