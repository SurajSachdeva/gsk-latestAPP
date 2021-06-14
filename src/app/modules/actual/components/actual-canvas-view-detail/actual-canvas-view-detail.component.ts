import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActualDisplayCanvas } from 'src/app/models/actual';

@Component({
  selector: 'app-actual-canvas-view-detail',
  templateUrl: './actual-canvas-view-detail.component.html',
  styleUrls: ['./actual-canvas-view-detail.component.scss'],
  inputs: ['status', 'gtData','breadCrumbData'],
  outputs: ['close']
})
export class ActualCanvasViewDetailComponent implements OnInit {

  breadCrumbData:any[]=[];
  status: "A" | "P" | "R" | undefined;
  gtData: ActualDisplayCanvas | undefined;
  remarksFormControl = new FormControl();
  close: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.remarksFormControl.setValue(this.gtData?.Remarks);
  }

  onApprove() {
    if ((this.gtData && this.status === "P") || (this.gtData && this.status === "R" && this.remarksFormControl.value)) {
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
