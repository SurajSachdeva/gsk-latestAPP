import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { DeleteSdrMasterModel, InsertSdrMasterModel, SDRMaster } from 'src/app/models/master';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditSdrMasterModalComponent } from '../../components/add-edit-sdr-master-modal/add-edit-sdr-master-modal.component';

@Component({
  selector: 'app-sdr-master-page',
  templateUrl: './sdr-master-page.component.html',
  styleUrls: ['./sdr-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdrMasterPageComponent implements OnInit {

  data: SDRMaster[] = [];
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
    this.masterApi.getMasters("SDR").subscribe(data => {
      if (data && data.SDR) {
        this.data = data.SDR;
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
        "Brand": x.Brand || '',
        "SDR Rate": x.SDR_Rate || "",
        "Effective Date": x.Effective_Date || "",

      }
    });
    const headers = ["Brand", "SDR Rate", "Effective Date"];
    this.appService.exportAsExcelFile(exportData, "SDR-Master", headers);
  }



  onAdd() {
    const modalRef = this.modalService.open(AddEditSdrMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: SDRMaster) => {
      if (data) {
        var model: InsertSdrMasterModel = {
          MasterName: "SDR_MASTER",
          Mode: "Insert",
          Brand: data.Brand,
          SDR_Rate: data.SDR_Rate
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: SDRMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete SDR Master";
    componentInstance.message = "Are you sure you want to delete this SDR master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteSdrMasterModel = {
          MasterName: "SDR_MASTER",
          Mode: "Delete",
          Brand: dataItem.Brand
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }
}
