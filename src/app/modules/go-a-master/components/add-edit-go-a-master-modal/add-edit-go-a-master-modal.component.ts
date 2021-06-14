import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GoAMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-go-a-master-modal',
  templateUrl: './add-edit-go-a-master-modal.component.html',
  styleUrls: ['./add-edit-go-a-master-modal.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddEditGoAMasterModalComponent implements OnInit {

  private _goAMaster: GoAMaster | undefined;

  get title(): string {
    return this._goAMaster ? "Edit GoA Master" : "Add GoA Master";
  }

  set goAMaster(value: GoAMaster) {
    this._goAMaster = value;
    if (this._goAMaster) {
      this.goAMasterForm.patchValue({
        MudID: this._goAMaster.MudID,
        UserName: this._goAMaster.UserName,
        Role: this._goAMaster.Role,
        EmailId: this._goAMaster.EmailId,
        Level: this._goAMaster.Level,
        Department:this._goAMaster.Department,
        SlabStart:this._goAMaster.SlabStart,
        SlabEnd:this._goAMaster.SlabEnd,
      });
      this.goAMasterForm.controls['MudID'].disable();
      this.cd.detectChanges();
    }
  }

  goAMasterForm = this.formBuilder.group({
    MudID: ['', [Validators.required]],
    UserName: ['', [Validators.required]],
    Role: ['', [Validators.required]],
    EmailId: ['', [Validators.required]],
    Level: ['', [Validators.required]],
    Department: ['', [Validators.required]],
    SlabStart: ['', [Validators.required]],
    SlabEnd: ['', [Validators.required]],
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
    if (this.goAMasterForm.valid) {
      this.activeModal.close(this.goAMasterForm.value)
    } else {
      this.goAMasterForm.controls['MudID'].markAsTouched();
      this.goAMasterForm.controls['UserName'].markAsTouched();
      this.goAMasterForm.controls['Role'].markAsTouched();
      this.goAMasterForm.controls['EmailId'].markAsTouched();
      this.goAMasterForm.controls['Level'].markAsTouched();
      this.goAMasterForm.controls['Department'].markAsTouched();
      this.goAMasterForm.controls['SlabStart'].markAsTouched();
      this.goAMasterForm.controls['SlabEnd'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.goAMasterForm.controls[controlName].touched && this.goAMasterForm.controls[controlName].hasError(errorName);
  }

}
