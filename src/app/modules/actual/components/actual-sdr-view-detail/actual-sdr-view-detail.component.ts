import { ChangeDetectionStrategy,Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActualDisplaySDR } from 'src/app/models/actual';

@Component({
  selector: 'app-actual-sdr-view-detail',
  templateUrl: './actual-sdr-view-detail.component.html',
  styleUrls: ['./actual-sdr-view-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['status', 'data','breadCrumbData'],
  outputs: ['close']
})
export class ActualSdrViewDetailComponent implements OnInit {

  breadCrumbData:any[]=[];
  status: "A" | "P" | "R" | undefined;
  data: ActualDisplaySDR | undefined;
  remarksFormControl = new FormControl();
  close: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.remarksFormControl.setValue(this.data?.Remarks);
  }

  onApprove() {
    if (this.remarksFormControl.value) {
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
