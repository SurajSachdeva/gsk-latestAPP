import { ChangeDetectionStrategy,Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActualDisplayCDT } from 'src/app/models/actual';

@Component({
  selector: 'app-actual-cdt-view-detail',
  templateUrl: './actual-cdt-view-detail.component.html',
  styleUrls: ['./actual-cdt-view-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['status', 'gtData','breadCrumbData'],
  outputs: ['close']
})
export class ActualCdtViewDetailComponent implements OnInit {

  breadCrumbData:any[]=[];
  status: "A" | "P" | "R" | undefined;
  gtData: ActualDisplayCDT | undefined;
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
