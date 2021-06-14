import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActualDisplayGT } from 'src/app/models/actual';

@Component({
  selector: 'app-actual-gt-view-detail',
  templateUrl: './actual-gt-view-detail.component.html',
  styleUrls: ['./actual-gt-view-detail.component.scss'],
  inputs: ['status', 'gtData','breadCrumbData'],
  outputs: ['close']
})
export class ActualGtViewDetailComponent implements OnInit {

  breadCrumbData:any[]=[];
  status: "A" | "P" | "R" | undefined;
  gtData: ActualDisplayGT | undefined;
  remarksFormControl = new FormControl();
  close: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.remarksFormControl.setValue(this.gtData?.Remarks);
  }
 onApprove() {
    if (this.remarksFormControl.value) {
      if (this.gtData) {
        this.gtData.RemarkType = "Approve";
        this.gtData.Remarks = this.remarksFormControl.value;
        this.close.emit();
      }
    }
  }
  onReject() {
    if (this.remarksFormControl.value) {
      if (this.gtData) {
        this.gtData.RemarkType = "Reject";
        this.gtData.Remarks = this.remarksFormControl.value;
        this.close.emit();
      }
    }
  }
}
