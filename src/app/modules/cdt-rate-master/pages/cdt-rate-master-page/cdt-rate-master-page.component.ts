import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { CDTRateMaster, InsertDeleteCDTRateMasterModel } from "src/app/models/master";
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditCdtRateMasterModalComponent } from '../../components/add-edit-cdt-rate-master-modal/add-edit-cdt-rate-master-modal.component';

@Component({
  selector: 'app-cdt-rate-master-page',
  templateUrl: './cdt-rate-master-page.component.html',
  styleUrls: ['./cdt-rate-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdtRateMasterPageComponent implements OnInit {
  data: CDTRateMaster[] = [];
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
    this.masterApi.getMasters("CDT_Rate_Master").subscribe((data) => {
      if (data && data.CDT_Rate_Master && data.CDT_Rate_Master.length) {
        this.data = data.CDT_Rate_Master;
        this.cd.detectChanges();
      }
    });
  }

  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Category": x.Category || '',
        "Rate": x.Rate || 0,
      }
    });
    const headers = ["Category", "Rate"];
    this.appService.exportAsExcelFile(exportData, "CDT-Rate-Master", headers);
  }


  onAdd() {
    const modalRef = this.modalService.open(AddEditCdtRateMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: CDTRateMaster) => {
      if (data) {
        var model: InsertDeleteCDTRateMasterModel = {
          Mode: "Insert",
          MasterName: "CDT_RATE_MASTER",
          CDTRateMaster_Category: data.Category,
          Rate: data.Rate,

        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: CDTRateMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete CDT Rate";
    componentInstance.message = "Are you sure you want to delete this CDT rate?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: InsertDeleteCDTRateMasterModel = {
          Mode: "Delete",
          MasterName: "CDT_RATE_MASTER",
          CDTRateMaster_Category: dataItem.Category,
          Rate: dataItem.Rate
        }


        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }
}




