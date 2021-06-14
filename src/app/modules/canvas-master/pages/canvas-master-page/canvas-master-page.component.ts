import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { CanvasMaster, DeleteCanvasMasterModel, InsertUpdateCanvasMasterModel } from 'src/app/models/master';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditCanvasMasterModalComponent } from '../../components/add-edit-canvas-master-modal/add-edit-canvas-master-modal.component';

@Component({
  selector: 'app-canvas-master-page',
  templateUrl: './canvas-master-page.component.html',
  styleUrls: ['./canvas-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasMasterPageComponent implements OnInit {

  data: CanvasMaster[] = [];
  constructor(
    private masterApi: MasterApi,
    private cd: ChangeDetectorRef,
    private appService: AppService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.masterApi.getMasters("Canvas").subscribe(data => {
      if (data && data.Canvas) {
        this.data = data.Canvas;
        this.cd.detectChanges();
      }
    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Distributer ID": x.New_Customer_Code || '',
        "Distributer Name": x.Customer_Name || "",
        "Sub D Margin": x.SubD_Margin || "",
        "Sub D Freight": x.SubD_Freight || "",
        "RSD Margin": x.RSD_Margin || '',
        "RSD Freight": x.RSD_Freight || "",
        "Effec. Date": x.Effective_Date || "",

      }
    });
    const headers = ["Distributer ID", "Distributer Name", "Sub D Margin", "Sub D Freight", "RSD Margin", "RSD Freight", "Effec. Date"];
    this.appService.exportAsExcelFile(exportData, "Canvas-Master", headers);
  }


  onAdd() {
    const modalRef = this.modalService.open(AddEditCanvasMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: CanvasMaster) => {
      if (data) {
        var model: InsertUpdateCanvasMasterModel = {
          MasterName: "CANVAS_MASTER",
          Mode: "Insert",
          CanvasRate_Customer_Name: data.Customer_Name,
          CanvasRate_New_Customer_Code: data.New_Customer_Code,
          RSD_Freight: data.RSD_Freight,
          RSD_Margin: data.RSD_Margin,
          SubD_Freight: data.SubD_Freight,
          SubD_Margin: data.SubD_Margin
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: CanvasMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Canvas";
    componentInstance.message = "Are you sure you want to delete this canvas master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteCanvasMasterModel = {
          MasterName: "CANVAS_MASTER",
          Mode: "Delete",
          CanvasRate_Customer_Name: dataItem.Customer_Name,
          CanvasRate_New_Customer_Code: dataItem.New_Customer_Code
        }
        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }


}
