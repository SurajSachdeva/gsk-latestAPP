import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BusinessAreaMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-business-area-master-modal',
  templateUrl: './add-edit-business-area-master-modal.component.html',
  styleUrls: ['./add-edit-business-area-master-modal.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddEditBusinessAreaMasterModalComponent implements OnInit {

  private _businessAreaMaster: BusinessAreaMaster | undefined;

  get title(): string {
    return this._businessAreaMaster ? "Edit Business Area Master" : "Add Business Area Master";
  }

  set businessAreaMaster(value: BusinessAreaMaster) {
    this._businessAreaMaster = value;
    if (this._businessAreaMaster) {
      this.businessAreaMasterForm.patchValue({
        Business_Area_List: this._businessAreaMaster.Business_Area_List,
        Business_Description: this._businessAreaMaster.Business_Description,
      });
      this.businessAreaMasterForm.controls["Business_Area_List"].disable();
      this.cd.detectChanges();
    }
  }

  businessAreaMasterForm = this.formBuilder.group({
    Business_Area_List: ['', [Validators.required,Validators.pattern(/^[0-9]{0,9}$/)]],
    Business_Description: ['', [Validators.required]],
  })

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cd:ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.businessAreaMasterForm.valid) {
      this.activeModal.close(this.businessAreaMasterForm.value)
    } else {
      this.businessAreaMasterForm.controls['Business_Area_List'].markAsTouched();
      this.businessAreaMasterForm.controls['Business_Description'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.businessAreaMasterForm.controls[controlName].touched && this.businessAreaMasterForm.controls[controlName].hasError(errorName);
  }

}
