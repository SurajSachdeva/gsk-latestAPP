import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GLCodeMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-gl-code-master-modal',
  templateUrl: './add-edit-gl-code-master-modal.component.html',
  styleUrls: ['./add-edit-gl-code-master-modal.component.scss']
})
export class AddEditGlCodeMasterModalComponent implements OnInit {

  private _glCodeMaster: GLCodeMaster | undefined;

  get title(): string {
    return this._glCodeMaster ? "Edit GL Code" : "Add GL Code";
  }

  set glCodeMaster(value: GLCodeMaster) {
    this._glCodeMaster = value;
    if (this._glCodeMaster) {
      this.glCodeMasterForm.patchValue({
        GL_Account_Code: this._glCodeMaster.GL_Account_Code,
        GL_Account_Desc: this._glCodeMaster.GL_Account_Desc,
      });
      this.glCodeMasterForm.controls['GL_Account_Code'].disable();
      this.cd.detectChanges();
    }
  }

  glCodeMasterForm = this.formBuilder.group({
    GL_Account_Code: ['', [Validators.required,Validators.pattern(/^[0-9]{0,9}$/)]],
    GL_Account_Desc: ['', [Validators.required]],
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
    if (this.glCodeMasterForm.valid) {
      this.activeModal.close(this.glCodeMasterForm.value)
    } else {
      this.glCodeMasterForm.controls['GL_Account_Code'].markAsTouched();
      this.glCodeMasterForm.controls['GL_Account_Desc'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.glCodeMasterForm.controls[controlName].touched && this.glCodeMasterForm.controls[controlName].hasError(errorName);
  }

}
