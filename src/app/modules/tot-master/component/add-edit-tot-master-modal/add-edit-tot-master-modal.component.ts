import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TOTMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-tot-master-modal',
  templateUrl: './add-edit-tot-master-modal.component.html',
  styleUrls: ['./add-edit-tot-master-modal.component.scss']
})
export class AddEditTotMasterModalComponent implements OnInit {

  get title(): string {
    return "Add TOT Rate Master";
  }
 
  formGroup = this.formBuilder.group({
    Category: ['', [Validators.required]],
    Account: ['', [Validators.required]],
    Brand: ['', [Validators.required]],
    Rate: ['', [Validators.required]],
    Effective_Date:['', [Validators.required]],
  })
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  onCancel() {
    this.activeModal.close();
  }
  onSubmit() {
    if (this.formGroup.valid) {
      this.activeModal.close(this.formGroup.value)
    }else{
      this.formGroup.controls["Category"].markAsTouched();
      this.formGroup.controls["Account"].markAsTouched();
      this.formGroup.controls["Brand"].markAsTouched();
      this.formGroup.controls["Rate"].markAsTouched();
      this.formGroup.controls["Effective_Date"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].touched && this.formGroup.controls[controlName].hasError(errorName);
  }
}
