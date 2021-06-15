import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandMaster, ReportChannelMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-report-channel-master-modal',
  templateUrl: './add-edit-report-channel-master-modal.component.html',
  styleUrls: ['./add-edit-report-channel-master-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditReportChannelMasterModalComponent implements OnInit {

  private _reportChannelMaster: ReportChannelMaster | undefined;

  get title(): string {
    return this._reportChannelMaster ? "Edit Report Channel Master" : "Add Report Channel Master";
  }

  set reportChannelMaster(value: ReportChannelMaster) {
    this._reportChannelMaster = value;
    if (this._reportChannelMaster) {
      this.formGroup.patchValue({
        Channel: this._reportChannelMaster.Channel,
        Type: this._reportChannelMaster.Type,
        D_ND: this._reportChannelMaster.D_ND,
        Sales_Group: this._reportChannelMaster.Sales_Group,
        Channel_Group: this._reportChannelMaster.Channel_Group,
      });

      this.formGroup.controls["Type"].disable();
      this.formGroup.controls["Channel"].disable();
      this.formGroup.controls["D_ND"].disable();
    }
  }

  formGroup = this.formBuilder.group({
    Channel: ['', [Validators.required]],
    Type: ['', [Validators.required]],
    Sales_Group: ['', [Validators.required]],
    Channel_Group: ['', [Validators.required]],
    D_ND: ['', [Validators.required]]
  })

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.activeModal.close(this.formGroup.value)
    } else {
      this.formGroup.controls["Channel"].markAsTouched();
      this.formGroup.controls["Type"].markAsTouched();
      this.formGroup.controls["Sales_Group"].markAsTouched();
      this.formGroup.controls["Channel_Group"].markAsTouched();
      this.formGroup.controls["D_ND"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].touched && this.formGroup.controls[controlName].hasError(errorName);
  }
}
