import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActualDisplayMTTOT } from 'src/app/models/actual';

@Component({
  selector: 'app-actual-mttot-view-detail',
  templateUrl: './actual-mttot-view-detail.component.html',
  styleUrls: ['./actual-mttot-view-detail.component.scss'],
  inputs: ['status', 'data','breadCrumbData'],
  outputs: ['close']
})
export class ActualMttotViewDetailComponent implements OnInit {

  breadCrumbData:any[]=[];
  status: "A" | "P" | "R" | undefined;
  data: ActualDisplayMTTOT | undefined;
  remarksFormControl = new FormControl();
  close: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.remarksFormControl.setValue(this.data?.Remarks);
  }

  onApprove() {
    if ((this.data && this.status === "P") || (this.data && this.status === "R" && this.remarksFormControl.value)) {
      if (this.data) {
        this.data.RemarkType = "Approve";
        this.data.Remarks = this.remarksFormControl.value;
        this.close.emit();
      }
    }
  }
  onReject() {
    if (this.remarksFormControl.value) {
      if (this.data) {
        this.data.RemarkType = "Reject";
        this.data.Remarks = this.remarksFormControl.value;
        this.close.emit();
      }
    }
  }
}
