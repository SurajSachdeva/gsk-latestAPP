import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownApi } from 'src/app/apis/dropdown-api';
import { LineItemMasterDropdownModel } from 'src/app/models/dropdown';
import { BrandMaster, LineItemMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-line-item-master-modal',
  templateUrl: './add-edit-line-item-master-modal.component.html',
  styleUrls: ['./add-edit-line-item-master-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditLineItemMasterModalComponent implements OnInit {
  claimTypeDropdown: LineItemMasterDropdownModel[] = [];
  private _lineItemMaster: LineItemMaster | undefined;

  get title(): string {
    return this._lineItemMaster ? "Edit Line Item Master" : "Add Line Item Master";
  }

  set lineItemMaster(value: LineItemMaster) {
    this._lineItemMaster = value;
    if (this._lineItemMaster) {
      this.formGroup.patchValue({
        Claim_Type: this._lineItemMaster.Claim_Type,
        Event_Type: this._lineItemMaster.Event_Type,
        SAP_Reports: this._lineItemMaster.SAP_Reports,
        Line_Item_Text_Format: this._lineItemMaster.Line_Item_Text_Format
      });
    }
  }

  formGroup = this.formBuilder.group({
    Claim_Type: ['', [Validators.required]],
    Event_Type: ['', [Validators.required]],
    SAP_Reports: ['', [Validators.required]],
    Line_Item_Text_Format: ['', [Validators.required]]
  })

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private dropdownApi: DropdownApi,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dropdownApi.getDropdown("LINE_ITEM_TEXTMASTER", "").subscribe(data => {
      if (data && data.LINE_ITEM_TEXTMASTER) {
        this.claimTypeDropdown = data.LINE_ITEM_TEXTMASTER;
        this.cd.detectChanges();
      } else {
        this.claimTypeDropdown = [];
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
      this.formGroup.controls["Claim_Type"].markAsTouched();
      this.formGroup.controls["Event_Type"].markAsTouched();
      this.formGroup.controls["SAP_Reports"].markAsTouched();
      this.formGroup.controls["Line_Item_Text_Format"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].touched && this.formGroup.controls[controlName].hasError(errorName);
  }
}
