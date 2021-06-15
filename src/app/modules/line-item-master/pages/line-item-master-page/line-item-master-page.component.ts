import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { DeleteLineItemMasterModel, InsertUpdateLineItemMasterModel, LineItemMaster } from 'src/app/models/master';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditLineItemMasterModalComponent } from '../../components/add-edit-line-item-master-modal/add-edit-line-item-master-modal.component';

@Component({
  selector: 'app-line-item-master-page',
  templateUrl: './line-item-master-page.component.html',
  styleUrls: ['./line-item-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineItemMasterPageComponent implements OnInit {
  data: LineItemMaster[] = [];

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
    this.masterApi.getMasters("LINE_ITEM_MST").subscribe(data => {
      if (data && data.LINE_ITEM_MST) {
        this.data = data.LINE_ITEM_MST;
        this.cd.detectChanges();
      }
    });
  }

  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Claim Type": x.Claim_Type || '',
        "Event Type": x.Event_Type || "",
        "SAP Reports": x.SAP_Reports || "",
        "Line Item Text Format": x.Line_Item_Text_Format || ""
      }
    });
    const headers = ["Claim Type", "Event Type", "SAP Reports", "Line Item Text Format"];
    this.appService.exportAsExcelFile(exportData, "Line-Item-Master", headers);
  }

  onEdit(dataItem: LineItemMaster) {
    const modalRef = this.modalService.open(AddEditLineItemMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditLineItemMasterModalComponent;
    componentInstance.lineItemMaster = dataItem;
    modalRef.result.then((data: LineItemMaster) => {
      if (data) {
        var model: InsertUpdateLineItemMasterModel = {
          Mode: "Update",
          MasterName: "LINE_ITEM_MASTER",
          Claim_Type: dataItem.Claim_Type,
          Event_Type: dataItem.Event_Type,
          Line_Item_Text_Format: data.Line_Item_Text_Format,
          SAP_Reports: dataItem.SAP_Reports
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditLineItemMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: LineItemMaster) => {
      if (data) {
        var model: InsertUpdateLineItemMasterModel = {
          Mode: "Insert",
          MasterName: "LINE_ITEM_MASTER",
          Claim_Type: data.Claim_Type,
          Event_Type: data.Event_Type,
          Line_Item_Text_Format: data.Line_Item_Text_Format,
          SAP_Reports: data.SAP_Reports
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        })
      }
    });
  }

  onDelete(dataItem: LineItemMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Line Item Master";
    componentInstance.message = "Are you sure you want to delete this Line Item Master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteLineItemMasterModel = {
          Mode: "Delete",
          MasterName: "LINE_ITEM_MASTER",
          Claim_Type: dataItem.Claim_Type,
          Event_Type: dataItem.Event_Type,
          SAP_Reports: dataItem.SAP_Reports
        }
        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }
}
