import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProvisionDisplayMTTOT } from 'src/app/models/provision';

@Component({
  selector: 'app-provision-mttot-view-detail',
  templateUrl: './provision-mttot-view-detail.component.html',
  styleUrls: ['./provision-mttot-view-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['status', 'data','breadCrumbData'],
  outputs: ['close']
})
export class ProvisionMttotViewDetailComponent implements OnInit {

  breadCrumbData:any[]=[];
  status: "A" | "P" | "R" | undefined;
  data: ProvisionDisplayMTTOT | undefined;
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
