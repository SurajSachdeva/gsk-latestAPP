import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProvisionDisplayCDT } from 'src/app/models/provision';

@Component({
  selector: 'app-provision-cdt-view-detail',
  templateUrl: './provision-cdt-view-detail.component.html',
  styleUrls: ['./provision-cdt-view-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['status', 'data','breadCrumbData'],
  outputs: ['close']
})
export class ProvisionCdtViewDetailComponent implements OnInit {

  breadCrumbData:any[]=[];
  status: "A" | "P" | "R" | undefined;
  data: ProvisionDisplayCDT | undefined;
  remarksFormControl = new FormControl();
  close: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.remarksFormControl.setValue(this.data?.Remarks);
  }

  onApprove() {
    if (this.data) {
      this.data.RemarkType = "Approve";
      this.data.Remarks = this.remarksFormControl.value;
      this.close.emit();
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
