import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProvisionDisplayGT } from 'src/app/models/provision';

@Component({
  selector: 'app-provision-gt-view-detail',
  templateUrl: './provision-gt-view-detail.component.html',
  styleUrls: ['./provision-gt-view-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['status', 'gtData', 'breadCrumbData', 'toleranceLimitIsValid'],
  outputs: ['close']
})
export class ProvisionGtViewDetailComponent implements OnInit {
  breadCrumbData: any[] = [];
  status: "A" | "P" | "R" | undefined;
  gtData: ProvisionDisplayGT | undefined;
  remarksFormControl = new FormControl();
  toleranceLimitIsValid = true;
  close: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.remarksFormControl.setValue(this.gtData?.Remarks);
  }

  onApprove() {
    if (!this.toleranceLimitIsValid && !this.remarksFormControl.value) {
      return;
    }
    if ((this.gtData && this.status === "P") || (this.gtData && this.status === "R" && this.remarksFormControl.value)) {
      this.gtData.RemarkType = "Approve";
      this.gtData.Remarks = this.remarksFormControl.value;
      this.close.emit();
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
