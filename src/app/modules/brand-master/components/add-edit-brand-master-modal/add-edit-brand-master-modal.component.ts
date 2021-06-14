import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownApi } from 'src/app/apis/dropdown-api';
import { BrandMaster } from 'src/app/models/master';
import { BrandMasterDropdownModel } from 'src/app/models/dropdown'

@Component({
  selector: 'app-add-edit-brand-master-modal',
  templateUrl: './add-edit-brand-master-modal.component.html',
  styleUrls: ['./add-edit-brand-master-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditBrandMasterModalComponent implements OnInit {
  companyCodeDropdown: BrandMasterDropdownModel[] = [];
  private _brandMaster: BrandMaster | undefined;

  get title(): string {
    return this._brandMaster ? "Edit Brand" : "Add Brand";
  }

  set brandMaster(value: BrandMaster) {
    this._brandMaster = value;
    if (this._brandMaster) {
      this.brandMasterForm.patchValue({
        Brand_Code: this._brandMaster.Brand_Code,
        Brand_Description: this._brandMaster.Brand_Description,
        SAP_Bison_Prod_Code: this._brandMaster.SAP_Bison_Prod_Code,
        SAP_Material_Code: this._brandMaster.SAP_Material_Code,
        Company_Code: this._brandMaster.Company_Code,
      });
    }
  }

  brandMasterForm = this.formBuilder.group({
    Brand_Code: ['', [Validators.required]],
    Brand_Description: ['', [Validators.required]],
    SAP_Bison_Prod_Code: ['', [Validators.required]],
    SAP_Material_Code: ['', [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]],
    Company_Code: ['', [Validators.required]],
  })

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private dropdownApi: DropdownApi,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dropdownApi.getDropdown("BRAND_MASTER").subscribe(data => {
      if (data && data.BRAND_MASTER) {
        this.companyCodeDropdown = data.BRAND_MASTER;
        this.cd.detectChanges();
      } else {
        this.companyCodeDropdown = [];
        this.cd.detectChanges();
      }
    });
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.brandMasterForm.valid) {
      this.activeModal.close(this.brandMasterForm.value)
    } else {
      this.brandMasterForm.controls["Brand_Code"].markAsTouched();
      this.brandMasterForm.controls["Brand_Description"].markAsTouched();
      this.brandMasterForm.controls["SAP_Bison_Prod_Code"].markAsTouched();
      this.brandMasterForm.controls["SAP_Material_Code"].markAsTouched();
      this.brandMasterForm.controls["Company_Code"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.brandMasterForm.controls[controlName].touched && this.brandMasterForm.controls[controlName].hasError(errorName);
  }
}
