import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CDTRateMaster } from 'src/app/models/master';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-cdt-rate-master-modal',
  templateUrl: './add-edit-cdt-rate-master-modal.component.html',
  styleUrls: ['./add-edit-cdt-rate-master-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditCdtRateMasterModalComponent implements OnInit {

  get title(): string {
    return "Add CDT Rate";
  }

 
  cdtRateMasterForm = this.formBuilder.group({
    Category: ['', [Validators.required]],
    Rate: ['', [Validators.required]],
  });

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
    if (this.cdtRateMasterForm.valid) {
      this.activeModal.close(this.cdtRateMasterForm.value)
    }else{
      this.cdtRateMasterForm.controls["Category"].markAsTouched();
      this.cdtRateMasterForm.controls["Rate"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.cdtRateMasterForm.controls[controlName].touched && this.cdtRateMasterForm.controls[controlName].hasError(errorName);
  }

}
