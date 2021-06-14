import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remarks-modal',
  templateUrl: './remarks-modal.component.html',
  styleUrls: ['./remarks-modal.component.scss']
})
export class RemarksModalComponent implements OnInit {
  heading: string = "";
  formGroup = this.fb.group({
    remarks: ['', [Validators.required]]
  })
  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.formGroup.valid)
      this.activeModal.close(this.formGroup.value.remarks);
  }
  setRemarks(remarks: string) {
      this.formGroup.patchValue({ remarks: remarks });
  }
  onCancel() {
    this.activeModal.dismiss();
  }


}
