import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { ChartAccountMaster, DeleteChartAccountMasterModel, InsertUpdateChartAccountMasterModel } from 'src/app/models/master/index';
import { AppService } from 'src/app/services/app.service';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddEditChartAccountMasterModalComponent } from '../../components/add-edit-chart-account-master-modal/add-edit-chart-account-master-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chart-account-master-page',
  templateUrl: './chart-account-master-page.component.html',
  styleUrls: ['./chart-account-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartAccountMasterPageComponent implements OnInit {
  data: ChartAccountMaster[] = [];
  constructor(
    private masterApi: MasterApi,
    private cd: ChangeDetectorRef,
    private appService: AppService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.masterApi.getMasters("Chart_Account_Master").subscribe(data => {
      if (data && data.Chart_Account_Master) {
        this.data = data.Chart_Account_Master;
        this.cd.detectChanges();
      }
    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Event Type": x.Eventtype || '',
        "Activity": x.Activity || "",
        "Expense Type": x.Expense_Type || "",
        "Debit/Credit": x.Account_Type || "",
        "GL Account Code": x.GL_Account_Code || ''
      }
    });
    const headers = ["Event Type", "Activity", "Expense Type", "Debit/Credit", "GL Account Code"]
    this.appService.exportAsExcelFile(exportData, "Chart-Account-Master", headers);
  }
  onEdit(dataItem: ChartAccountMaster) {
    const modalRef = this.modalService.open(AddEditChartAccountMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditChartAccountMasterModalComponent;
    componentInstance.chartAccountMaster = dataItem;
    modalRef.result.then((data: ChartAccountMaster) => {
      if (data) {
        var model: InsertUpdateChartAccountMasterModel = {
          MasterName: "CHART_ACCOUNT_MASTER",
          Mode: "Update",
          Account_Type: data.Account_Type,
          Activity: data.Activity,
          Eventtype: data.Eventtype,
          Expense_Type: data.Expense_Type,
          GL_Account_Code: `${data.GL_Account_Code}`
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditChartAccountMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: ChartAccountMaster) => {
      if (data) {
        var model: InsertUpdateChartAccountMasterModel = {
          MasterName: "CHART_ACCOUNT_MASTER",
          Mode: "Insert",
          Account_Type: data.Account_Type,
          Activity: data.Activity,
          Eventtype: data.Eventtype,
          Expense_Type: data.Expense_Type,
          GL_Account_Code: `${data.GL_Account_Code}`
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: ChartAccountMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Chart Account";
    componentInstance.message = "Are you sure you want to delete this Chart Account master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteChartAccountMasterModel = {
          MasterName: "CHART_ACCOUNT_MASTER",
          Mode: "Delete",
          Account_Type: dataItem.Account_Type,
          Eventtype: dataItem.Eventtype,
          Expense_Type: dataItem.Expense_Type
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }
}
