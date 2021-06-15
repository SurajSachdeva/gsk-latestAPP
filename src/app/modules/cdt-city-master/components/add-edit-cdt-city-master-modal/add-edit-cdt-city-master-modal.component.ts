import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CDTCityMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-cdt-city-master-modal',
  templateUrl: './add-edit-cdt-city-master-modal.component.html',
  styleUrls: ['./add-edit-cdt-city-master-modal.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddEditCdtCityMasterModalComponent implements OnInit {
  private _cdtCityMaster: CDTCityMaster | undefined;

  get title(): string {
    return this._cdtCityMaster ? "Edit CDT City" : "Add CDT City";
  }

  set cdtCityMaster(value: CDTCityMaster) {
    this._cdtCityMaster = value;
    if (this._cdtCityMaster) {
      this.cdtCityMasterForm.patchValue({
        CityX: this._cdtCityMaster.CityX,
        City_Name: this._cdtCityMaster.City_Name,
        Category: this._cdtCityMaster.Category
      });
      this.cdtCityMasterForm.controls["CityX"].disable();
      this.cd.detectChanges();
    }
  }

  cdtCityMasterForm = this.formBuilder.group({
    CityX: ['', [Validators.required]],
    City_Name: ['', [Validators.required]],
    Category: ['', [Validators.required]],
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
    if (this.cdtCityMasterForm.valid) {
      this.activeModal.close(this.cdtCityMasterForm.value)
    } else {
      this.cdtCityMasterForm.controls['CityX'].markAsTouched();
      this.cdtCityMasterForm.controls['City_Name'].markAsTouched();
      this.cdtCityMasterForm.controls['Category'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.cdtCityMasterForm.controls[controlName].touched && this.cdtCityMasterForm.controls[controlName].hasError(errorName);
  }

}
