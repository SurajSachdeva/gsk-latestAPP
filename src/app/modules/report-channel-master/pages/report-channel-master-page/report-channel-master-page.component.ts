import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { DeleteReportChannelMasterModel, InsertUpdateReportChannelMasterModel, ReportChannelMaster } from 'src/app/models/master';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditReportChannelMasterModalComponent } from '../../components/add-edit-report-channel-master-modal/add-edit-report-channel-master-modal.component';

@Component({
  selector: 'app-report-channel-master-page',
  templateUrl: './report-channel-master-page.component.html',
  styleUrls: ['./report-channel-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportChannelMasterPageComponent implements OnInit {
  data: ReportChannelMaster[] = [];

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
    this.masterApi.getMasters("REPORT_CHANNEL_MST").subscribe(data => {
      if (data && data.REPORT_CHANNEL_MST) {
        this.data = data.REPORT_CHANNEL_MST;
        this.cd.detectChanges();
      } else {
        this.data = [];
        this.cd.detectChanges();
      }
    });

  }

  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Channel": x.Channel || '',
        "Type": x.Type || "",
        "Channel Group": x.Channel_Group || "",
        "Sales Group": x.Sales_Group || "",
      }
    });
    const headers = ["Channel", "Type", "Channel Group", "Sales Group"];
    this.appService.exportAsExcelFile(exportData, "Report-Channel-Master", headers);
  }

  onEdit(dataItem: ReportChannelMaster) {
    const modalRef = this.modalService.open(AddEditReportChannelMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditReportChannelMasterModalComponent;
    componentInstance.reportChannelMaster = dataItem;
    modalRef.result.then((data: ReportChannelMaster) => {
      if (data) {
        // var model: InsertUpdateReportChannelMasterModel = {
        //   MasterName: "REPORT_CHANNEL_MASTER",
        //   Mode: "Update",
        //   Channel_Group: data.Channel_Group,
        //   D_ND: "abc",
        //   R_Type: data.Type,
        //   Report_Channel: data.Channel,
        //   Sales_Group: data.Sales_Group
        // }
        // this.masterApi.saveMasterData(model).subscribe(responseData => {
        //   this.getData();
        // })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditReportChannelMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: ReportChannelMaster) => {
      if (data) {
        // var model: InsertUpdateReportChannelMasterModel = {
        //   MasterName: "REPORT_CHANNEL_MASTER",
        //   Mode: "Insert",
        //   Channel_Group: data.Channel_Group,
        //   D_ND: "ad",
        //   R_Type: data.Type,
        //   Report_Channel: data.Channel,
        //   Sales_Group: data.Sales_Group,

        // }
        // this.masterApi.saveMasterData(model).subscribe(responseData => {
        //   this.getData();
        // });
      }
    });
  }

  onDelete(dataItem: ReportChannelMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Brand";
    componentInstance.message = "Are you sure you want to delete this brand master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteReportChannelMasterModel = {
          MasterName: "REPORT_CHANNEL_MASTER",
          Mode: "Delete",
          Report_Channel: dataItem.Channel
        }
        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }
}
