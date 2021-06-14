import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-company-master-modal',
  templateUrl: './add-edit-company-master-modal.component.html',
  styleUrls: ['./add-edit-company-master-modal.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddEditCompanyMasterModalComponent implements OnInit {

  private _companyMaster: CompanyMaster | undefined;

  get title(): string {
    return this._companyMaster ? "Edit Company" : "Add Company";
  }

  set companyMaster(value: CompanyMaster) {
    this._companyMaster = value;
    if (this._companyMaster) {
      this.companyMasterForm.patchValue({
        Company_Code: this._companyMaster.Company_Code,
        Company_Description: this._companyMaster.Company_Description,
        Profit_Center: this._companyMaster.Profit_Center,
        Plant: this._companyMaster.Plant,
        Sales_Org: this._companyMaster.Sales_Org,
      });
      this.cd.detectChanges();
    }
  }

  companyMasterForm = this.formBuilder.group({
    Company_Code: ['', [Validators.required]],
    Company_Description: ['', [Validators.required]],
    Profit_Center: ['', [Validators.required]],
    Plant: ['', [Validators.required]],
    Sales_Org: ['', [Validators.required]]
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
    if (this.companyMasterForm.valid) {
      this.activeModal.close(this.companyMasterForm.value)
    } else {
      this.companyMasterForm.controls['Company_Code'].markAsTouched();
      this.companyMasterForm.controls['Company_Description'].markAsTouched();
      this.companyMasterForm.controls['Profit_Center'].markAsTouched();
      this.companyMasterForm.controls['Plant'].markAsTouched();
      this.companyMasterForm.controls['Sales_Org'].markAsTouched();
    }
  }

  shouldShowError(controlName: string, errorName: string) {
    return this.companyMasterForm.controls[controlName].touched && this.companyMasterForm.controls[controlName].hasError(errorName);
  }

}
