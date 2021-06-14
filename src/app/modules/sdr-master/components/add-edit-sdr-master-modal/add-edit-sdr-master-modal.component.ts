import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GoAMaster, SDRMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-sdr-master-modal',
  templateUrl: './add-edit-sdr-master-modal.component.html',
  styleUrls: ['./add-edit-sdr-master-modal.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddEditSdrMasterModalComponent implements OnInit {


  get title(): string {
    return  "Add SDR Master";
  }


  sdrMasterForm = this.formBuilder.group({
    Brand: ['', [Validators.required]],
    SDR_Rate: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]]
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
    if (this.sdrMasterForm.valid) {
      this.activeModal.close(this.sdrMasterForm.value)
    } else {
      this.sdrMasterForm.controls['Brand'].markAsTouched();
      this.sdrMasterForm.controls['SDR_Rate'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.sdrMasterForm.controls[controlName].touched && this.sdrMasterForm.controls[controlName].hasError(errorName);
  }


}
