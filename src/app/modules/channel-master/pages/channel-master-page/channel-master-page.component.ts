import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { ChannelMaster, InsertUpdateChannelMasterModel, DeleteChannelMasterModel } from 'src/app/models/master/index';
import { AppService } from 'src/app/services/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddEditChannelMasterModalComponent } from '../../components/add-edit-channel-master-modal/add-edit-channel-master-modal.component';
@Component({
  selector: 'app-channel-master-page',
  templateUrl: './channel-master-page.component.html',
  styleUrls: ['./channel-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelMasterPageComponent implements OnInit {

  data: ChannelMaster[] = [];

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
    this.masterApi.getMasters("Channel_Master").subscribe(data => {
      if (data && data.Channel_Master) {
        this.data = data.Channel_Master;
        this.cd.detectChanges();
      }
    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Channel": x.Channel || '',
        "Expense Type": x.Expense_Type || "",
        "Expense Desc": x.Expense_Description || "",
        "Bison Row Code": x.BisonRowCode || ""
      }
    });
    const headers = ["Channel", "Expense Type", "Expense Desc", "Bison Row Code"];
    this.appService.exportAsExcelFile(exportData, "Channel-Master", headers);
  }
  
  onEdit(dataItem: ChannelMaster) {
    const modalRef = this.modalService.open(AddEditChannelMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditChannelMasterModalComponent;
    componentInstance.channelMaster = dataItem;
    modalRef.result.then((data: ChannelMaster) => {
      if (data) {
        var model: InsertUpdateChannelMasterModel = {
          MasterName: "CHANNEL_MASTER",
          Mode: "Update",
          BisonRowCode: `${data.BisonRowCode || ''}`,
          Channel: dataItem.Channel,
          Channel_Expense_Type: dataItem.Expense_Type,
          Expense_Description: undefined
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditChannelMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: ChannelMaster) => {
      if (data) {
        var model: InsertUpdateChannelMasterModel = {
          MasterName: "CHANNEL_MASTER",
          Mode: "Insert",
          BisonRowCode: `${data.BisonRowCode || ''}`,
          Channel: data.Channel,
          Channel_Expense_Type: data.Expense_Type,
          Expense_Description: data.Expense_Description
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: ChannelMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Channel";
    componentInstance.message = "Are you sure you want to delete this channel master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteChannelMasterModel = {
          MasterName: "CHANNEL_MASTER",
          Mode: "Delete",
          Channel_Expense_Type: dataItem.Expense_Type,
          Channel: dataItem.Channel
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }
}
