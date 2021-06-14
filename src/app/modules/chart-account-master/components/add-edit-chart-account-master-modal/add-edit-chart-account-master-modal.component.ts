import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { DropdownApi } from 'src/app/apis/dropdown-api';
import { ChannelMasterDropdownModel } from 'src/app/models/dropdown';
import { ChartAccountMaster } from 'src/app/models/master';

@Component({
  selector: 'app-add-edit-chart-account-master-modal',
  templateUrl: './add-edit-chart-account-master-modal.component.html',
  styleUrls: ['./add-edit-chart-account-master-modal.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddEditChartAccountMasterModalComponent implements OnInit {
  glAccountCodeDropdown: ChannelMasterDropdownModel[] = [];
  channelDropdown: ChannelMasterDropdownModel[] = [];
  expenseTypeDropdown: ChannelMasterDropdownModel[] = [];
  private _chartAccountMaster: ChartAccountMaster | undefined;

  get title(): string {
    return this._chartAccountMaster ? "Edit Chart Account Master" : "Add Chart Account Master";
  }

  set chartAccountMaster(value: ChartAccountMaster) {
    this._chartAccountMaster = value;
    if (this._chartAccountMaster) {
      this.chartAccountMasterForm.patchValue({
        Account_Type: this._chartAccountMaster.Account_Type,
        Activity: this._chartAccountMaster.Activity,
        Eventtype: this._chartAccountMaster.Eventtype,
        Expense_Type: this._chartAccountMaster.Expense_Type,
        GL_Account_Code: this._chartAccountMaster.GL_Account_Code,
      });
      this.dropdownApi.getDropdown("CHANNEL_MASTER", this._chartAccountMaster.Activity).subscribe(data => {
        if (data && data.CHANNEL_MASTER) {
          this.expenseTypeDropdown=data.CHANNEL_MASTER;
          this.cd.detectChanges();
        }
      });
    }
  }

  chartAccountMasterForm = this.formBuilder.group({
    Account_Type: ['', [Validators.required]],
    Activity: ['', [Validators.required]],
    Eventtype: ['', [Validators.required]],
    Expense_Type: ['', [Validators.required]],
    GL_Account_Code: ['', [Validators.required]],
  })

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private dropdownApi:DropdownApi,
    private cd:ChangeDetectorRef
  ) {
    
   }

  ngOnInit(): void {
    this.dropdownApi.getDropdown("CHANNEL_MASTER", "Channel").subscribe(data => {
      if (data && data.CHANNEL_MASTER) {
        this.channelDropdown = data.CHANNEL_MASTER;
        this.cd.detectChanges();
      } else {
        this.channelDropdown = [];
        this.cd.detectChanges();
      }
    });
    this.dropdownApi.getDropdown("CHANNEL_MASTER", "GL_Code_Master").subscribe(data => {
      if (data && data.CHANNEL_MASTER) {
        this.glAccountCodeDropdown = data.CHANNEL_MASTER;
        this.cd.detectChanges();
      } else {
        this.glAccountCodeDropdown = [];
        this.cd.detectChanges();
      }
    });

    this.chartAccountMasterForm.controls["Activity"].valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(val => {
      this.chartAccountMasterForm.controls["Expense_Type"].setValue("");
      this.dropdownApi.getDropdown("CHANNEL_MASTER", val).subscribe(data => {
        if (data && data.CHANNEL_MASTER) {
          this.expenseTypeDropdown=data.CHANNEL_MASTER;
          this.cd.detectChanges();
        }
      });
    });
    
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if(this.chartAccountMasterForm.valid){
      this.activeModal.close(this.chartAccountMasterForm.value)
    }else{
      this.chartAccountMasterForm.controls["Account_Type"].markAsTouched();
      this.chartAccountMasterForm.controls["Activity"].markAsTouched();
      this.chartAccountMasterForm.controls["Eventtype"].markAsTouched();
      this.chartAccountMasterForm.controls["Expense_Type"].markAsTouched();
      this.chartAccountMasterForm.controls["GL_Account_Code"].markAsTouched();
    }
  }
  shouldShowError(controlName: string, errorName: string) {
    return this.chartAccountMasterForm.controls[controlName].touched && this.chartAccountMasterForm.controls[controlName].hasError(errorName);
  }

}
