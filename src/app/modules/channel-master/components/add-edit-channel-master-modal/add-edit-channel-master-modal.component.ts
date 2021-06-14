import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownApi } from 'src/app/apis/dropdown-api';
import { ChannelMasterDropdownModel } from 'src/app/models/dropdown';
import { ChannelMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-channel-master-modal',
  templateUrl: './add-edit-channel-master-modal.component.html',
  styleUrls: ['./add-edit-channel-master-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditChannelMasterModalComponent implements OnInit {
 
  private _channelMaster: ChannelMaster | undefined;

  get title(): string {
    return this._channelMaster ? "Edit Channel" : "Add Channel";
  }

  set channelMaster(value: ChannelMaster) {
    this._channelMaster = value;
    if (this._channelMaster) {
      this.channelMasterForm.patchValue({
        Channel: this._channelMaster.Channel,
        Expense_Type: this._channelMaster.Expense_Type,
        Expense_Description: this._channelMaster.Expense_Description,
        BisonRowCode: this._channelMaster.BisonRowCode,
      });
      this.channelMasterForm.controls['Channel'].disable();
      this.channelMasterForm.controls['Expense_Type'].disable();
      this.channelMasterForm.controls['Expense_Description'].disable();
    }
  }

  channelMasterForm = this.formBuilder.group({
    Channel: ['', [Validators.required]],
    Expense_Type: ['', [Validators.required]],
    Expense_Description: ['', [Validators.required]],
    BisonRowCode: ['', [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]]
  })

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private dropdownApi: DropdownApi
  ) { }

  ngOnInit(): void {
    
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.channelMasterForm.valid) {
      this.activeModal.close(this.channelMasterForm.value)
    } else {
      this.channelMasterForm.controls['Channel'].markAsTouched();
      this.channelMasterForm.controls['Expense_Type'].markAsTouched();
      this.channelMasterForm.controls['Expense_Description'].markAsTouched();
      this.channelMasterForm.controls['BisonRowCode'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.channelMasterForm.controls[controlName].touched && this.channelMasterForm.controls[controlName].hasError(errorName);
  }

}
