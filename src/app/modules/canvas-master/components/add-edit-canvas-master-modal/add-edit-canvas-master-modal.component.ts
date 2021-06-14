import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { DropdownApi } from 'src/app/apis/dropdown-api';
import { CanvasMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-canvas-master-modal',
  templateUrl: './add-edit-canvas-master-modal.component.html',
  styleUrls: ['./add-edit-canvas-master-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditCanvasMasterModalComponent implements OnInit {

  private _canvasMaster: CanvasMaster | undefined;

  get title(): string {
    return this._canvasMaster ? "Edit Canvas" : "Add Canvas";
  }

  set canvasMaster(value: CanvasMaster) {
    this._canvasMaster = value;
    if (this._canvasMaster) {
      this.canvasMasterForm.patchValue({
        New_Customer_Code: this._canvasMaster.New_Customer_Code,
        Customer_Name: this._canvasMaster.Customer_Name,
        SubD_Margin: this._canvasMaster.SubD_Margin,
        SubD_Freight: this._canvasMaster.SubD_Freight,
        RSD_Margin: this._canvasMaster.RSD_Margin,
        RSD_Freight: this._canvasMaster.SubD_Freight
      });
    }
  }

  canvasMasterForm = this.formBuilder.group({
    New_Customer_Code: ['', [Validators.required]],
    Customer_Name: ['', [Validators.required]],
    SubD_Margin: ['', [Validators.required]],
    SubD_Freight: ['', [Validators.required]],
    RSD_Margin: ['', [Validators.required]],
    RSD_Freight: ['', [Validators.required]],
  })

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private dropdownApi: DropdownApi
  ) { }

  ngOnInit(): void {
    this.canvasMasterForm.controls["New_Customer_Code"].valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(val => {
      this.canvasMasterForm.controls["Customer_Name"].setValue("");
      this.dropdownApi.getDropdown("CANVAS_CATEGORY_MASTER", val).subscribe(data => {
        if (data && data.CANVAS_CATEGORY_MASTER && data.CANVAS_CATEGORY_MASTER.length === 1) {
          this.canvasMasterForm.controls["Customer_Name"].setValue(data.CANVAS_CATEGORY_MASTER[0].Customer_Name)
        }
      });
    })
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.canvasMasterForm.valid) {
      this.activeModal.close(this.canvasMasterForm.value)
    } else {
      this.canvasMasterForm.controls["New_Customer_Code"].markAsTouched();
      this.canvasMasterForm.controls["Customer_Name"].markAsTouched();
      this.canvasMasterForm.controls["SubD_Margin"].markAsTouched();
      this.canvasMasterForm.controls["SubD_Freight"].markAsTouched();
      this.canvasMasterForm.controls["RSD_Margin"].markAsTouched();
      this.canvasMasterForm.controls["RSD_Freight"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.canvasMasterForm.controls[controlName].touched && this.canvasMasterForm.controls[controlName].hasError(errorName);
  }
}
