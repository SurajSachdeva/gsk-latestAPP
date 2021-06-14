import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandMaster, ClaimCodeMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-claim-code-master-modal',
  templateUrl: './add-edit-claim-code-master-modal.component.html',
  styleUrls: ['./add-edit-claim-code-master-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditClaimCodeMasterModalComponent implements OnInit {

  private _claimCodeMaster: ClaimCodeMaster | undefined;

  get title(): string {
    return this._claimCodeMaster ? "Edit Claim Code" : "Add Claim Code";
  }

  set claimCodeMaster(value: ClaimCodeMaster) {
    this._claimCodeMaster = value;
    if (this._claimCodeMaster) {
      this.claimCodeMasterForm.patchValue({
        Channel: this._claimCodeMaster.Channel,
        Entity: this._claimCodeMaster.Entity,
        Type: this._claimCodeMaster.Type,
        Sub_Type: this._claimCodeMaster.Sub_Type,
        Code: this._claimCodeMaster.Code,
      });
    }
  }

  claimCodeMasterForm = this.formBuilder.group({
    Channel: ['', [Validators.required]],
    Entity: ['', [Validators.required]],
    Type: ['', [Validators.required]],
    Sub_Type: ['', [Validators.required]],
    Code: ['', [Validators.required]],
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
    if(this.claimCodeMasterForm.valid){
      this.activeModal.close(this.claimCodeMasterForm.value)
    }else{
      this.claimCodeMasterForm.controls["CHANNEL"].markAsTouched();
      this.claimCodeMasterForm.controls["ENTITY"].markAsTouched();
      this.claimCodeMasterForm.controls["TYPE"].markAsTouched();
      this.claimCodeMasterForm.controls["SUB_TYPE"].markAsTouched();
      this.claimCodeMasterForm.controls["CODE"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.claimCodeMasterForm.controls[controlName].touched && this.claimCodeMasterForm.controls[controlName].hasError(errorName);
  }
}
