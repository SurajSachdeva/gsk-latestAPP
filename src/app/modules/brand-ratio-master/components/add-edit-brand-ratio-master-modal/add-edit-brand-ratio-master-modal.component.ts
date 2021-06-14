import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownApi } from 'src/app/apis/dropdown-api';
import { BrandRatioMasterDropdownModel } from 'src/app/models/dropdown';
import { BrandMaster, BrandRatioMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-brand-ratio-master-modal',
  templateUrl: './add-edit-brand-ratio-master-modal.component.html',
  styleUrls: ['./add-edit-brand-ratio-master-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditBrandRatioMasterModalComponent implements OnInit {
  brandCodeDropdown: BrandRatioMasterDropdownModel[] = [];
  private _brandRatioMaster: BrandRatioMaster | undefined;

  get title(): string {
    return this._brandRatioMaster ? "Edit Brand Ratio Master" : "Add Brand Ratio Master";
  }

  set brandMaster(value: BrandRatioMaster) {
    this._brandRatioMaster = value;
    if (this._brandRatioMaster) {
      this.brandRatioMasterForm.patchValue({
        Brand_Code: this._brandRatioMaster.Brand_Code,
        ENTITY: this._brandRatioMaster.ENTITY,
        RATIO: this._brandRatioMaster.RATIO
      });
    }
  }

  brandRatioMasterForm = this.formBuilder.group({
    Brand_Code: ['', [Validators.required]],
    ENTITY: ['', [Validators.required]],
    RATIO: ['', [Validators.required]]
  })

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private dropdownApi: DropdownApi,
    private cd:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dropdownApi.getDropdown("BRAND_RATIO_MASTER").subscribe(data => {
      if (data && data.BRAND_RATIO_MASTER) {
        this.brandCodeDropdown = data.BRAND_RATIO_MASTER;
        this.cd.detectChanges();
      } else {
        this.brandCodeDropdown = [];
        this.cd.detectChanges();
      }
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.brandRatioMasterForm.valid) {
      this.activeModal.close(this.brandRatioMasterForm.value)
    } else {
      this.brandRatioMasterForm.controls["Brand_Code"].markAsTouched();
      this.brandRatioMasterForm.controls["ENTITY"].markAsTouched();
      this.brandRatioMasterForm.controls["RATIO"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.brandRatioMasterForm.controls[controlName].touched && this.brandRatioMasterForm.controls[controlName].hasError(errorName);
  }
}
