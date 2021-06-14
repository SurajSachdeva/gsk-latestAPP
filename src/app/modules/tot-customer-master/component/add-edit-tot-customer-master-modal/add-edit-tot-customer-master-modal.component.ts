import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TOTCustomerMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-tot-customer-master-modal',
  templateUrl: './add-edit-tot-customer-master-modal.component.html',
  styleUrls: ['./add-edit-tot-customer-master-modal.component.scss']
})
export class AddEditTotCustomerMasterModalComponent implements OnInit {

  private _totCustomerMaster: TOTCustomerMaster | undefined;

  get title(): string {
    return this._totCustomerMaster ? "Edit TOT Customer Master " : "Add TOT Customer Master";
  }

  set totCustomerMaster(value: TOTCustomerMaster) {
    this._totCustomerMaster = value;
    if (this._totCustomerMaster) {
      this.formGroup.patchValue({
        Category: this._totCustomerMaster.Category,
        Channel: this._totCustomerMaster.Channel,
        Filter: this._totCustomerMaster.Filter,
        Account: this._totCustomerMaster.Account,
      });
    }
  }

  formGroup = this.formBuilder.group({
    Category: ['', [Validators.required]],
    Channel: ['', [Validators.required]],
    Filter: ['', [Validators.required]],
    Account: ['', [Validators.required]],
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
    if(this.formGroup.valid){
      this.activeModal.close(this.formGroup.value)
    }else{
      this.formGroup.controls["Category"].markAsTouched();
      this.formGroup.controls["Channel"].markAsTouched();
      this.formGroup.controls["Filter"].markAsTouched();
      this.formGroup.controls["Account"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].touched && this.formGroup.controls[controlName].hasError(errorName);
  }

}
