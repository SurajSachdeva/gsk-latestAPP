import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {  CanvasCategoryMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-canvas-category-master-modal',
  templateUrl: './add-edit-canvas-category-master-modal.component.html',
  styleUrls: ['./add-edit-canvas-category-master-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditCanvasCategoryMasterModalComponent implements OnInit {

  private _canvasCategoryMaster: CanvasCategoryMaster | undefined;

  get title(): string {
    return this._canvasCategoryMaster ? "Edit Canvas Category" : "Add Canvas Category";
  }

  set canvasCategoryMaster(value: CanvasCategoryMaster) {
    this._canvasCategoryMaster = value;
    if (this._canvasCategoryMaster) {
      this.canvasCategoryMasterForm.patchValue({
        Secondary_Channel: this._canvasCategoryMaster.Secondary_Channel,
        Category: this._canvasCategoryMaster.Category
      });
      this.canvasCategoryMasterForm.controls["Secondary_Channel"].disable();
    }
  }

  canvasCategoryMasterForm = this.formBuilder.group({
    Secondary_Channel: ['', [Validators.required]],
    Category: ['', [Validators.required]],
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
    if(this.canvasCategoryMasterForm.valid){
      this.activeModal.close(this.canvasCategoryMasterForm.value)
    }else{
      this.canvasCategoryMasterForm.controls["Secondary_Channel"].markAsTouched();
      this.canvasCategoryMasterForm.controls["Category"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.canvasCategoryMasterForm.controls[controlName].touched && this.canvasCategoryMasterForm.controls[controlName].hasError(errorName);
  }
}
