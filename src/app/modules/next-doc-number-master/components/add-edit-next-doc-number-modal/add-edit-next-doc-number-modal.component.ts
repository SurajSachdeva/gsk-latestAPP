import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownApi } from 'src/app/apis/dropdown-api';
import { BrandMasterDropdownModel } from 'src/app/models/dropdown';
import { NextDocMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-next-doc-number-modal',
  templateUrl: './add-edit-next-doc-number-modal.component.html',
  styleUrls: ['./add-edit-next-doc-number-modal.component.scss']
})
export class AddEditNextDocNumberModalComponent implements OnInit {
  companyCodeDropdown: BrandMasterDropdownModel[] = [];
  private _nextDocMaster: NextDocMaster | undefined;

  get title(): string {
    return this._nextDocMaster ? "Edit NextDoc Number Master" : "Add NextDoc Number Master";
  }

  set nextDocMaster(value: NextDocMaster) {
    this._nextDocMaster = value;
    if (this._nextDocMaster) {
      this.formGroup.patchValue({
        A_Type: this._nextDocMaster.A_Type,
        Company_Code: this._nextDocMaster.Company_Code,
        Doc_type: this._nextDocMaster.Doc_type,
        Fiscal_Year: this._nextDocMaster.Fiscal_Year,
        Next_Number: this._nextDocMaster.Next_Number
      });
      this.formGroup.controls["A_Type"].disable();
      this.formGroup.controls["Doc_type"].disable();
      this.formGroup.controls["Fiscal_Year"].disable();
      this.formGroup.controls["Company_Code"].disable();
    }
  }

  formGroup = this.formBuilder.group({
    A_Type: ['', [Validators.required]],
    Company_Code: ['', [Validators.required]],
    Doc_type: ['', [Validators.required]],
    Fiscal_Year: ['', [Validators.required]],
    Next_Number: ['', [Validators.required]]
  })

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private dropdownApi: DropdownApi,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dropdownApi.getDropdown("BRAND_MASTER", "").subscribe(data => {
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
    if (this.formGroup.valid) {
      this.activeModal.close(this.formGroup.value)
    } else {
      this.formGroup.controls["A_Type"].markAsTouched();
      this.formGroup.controls["Company_Code"].markAsTouched();
      this.formGroup.controls["Doc_type"].markAsTouched();
      this.formGroup.controls["Fiscal_Year"].markAsTouched();
      this.formGroup.controls["Next_Number"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].touched && this.formGroup.controls[controlName].hasError(errorName);
  }

}
