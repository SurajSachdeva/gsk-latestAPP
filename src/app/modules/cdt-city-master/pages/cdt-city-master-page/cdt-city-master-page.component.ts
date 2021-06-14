import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { CDTCityMaster, DeleteCDTCityMasterModel, InsertUpdateCDTCityMasterModel } from 'src/app/models/master';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditCdtCityMasterModalComponent } from '../../components/add-edit-cdt-city-master-modal/add-edit-cdt-city-master-modal.component';

@Component({
  selector: 'app-cdt-city-master-page',
  templateUrl: './cdt-city-master-page.component.html',
  styleUrls: ['./cdt-city-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdtCityMasterPageComponent implements OnInit {

  data: CDTCityMaster[] = [];
  constructor(
    private masterApi: MasterApi,
    private cd: ChangeDetectorRef,
    private appService: AppService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.masterApi.getMasters("CDT_City_Master").subscribe((data) => {
      if (data && data.CDT_City_Master && data.CDT_City_Master.length) {
        this.data = data.CDT_City_Master;
        this.cd.detectChanges();
      }
    });
  }
  getData() {
    this.masterApi.getMasters("CDT_City_Master").subscribe((data) => {
      if (data && data.CDT_City_Master && data.CDT_City_Master.length) {
        this.data = data.CDT_City_Master;
        this.cd.detectChanges();
      }
    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "CityX": x.CityX || '',
        "City Name": x.City_Name || "",
        "Category": x.Category || ""
      }
    });
    const headers = ["CityX", "City Name", "Category"];
    this.appService.exportAsExcelFile(exportData, "CDT-City-Master", headers);
  }

  onEdit(dataItem: CDTCityMaster) {
    const modalRef = this.modalService.open(AddEditCdtCityMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditCdtCityMasterModalComponent;
    componentInstance.cdtCityMaster = dataItem;
    modalRef.result.then((data: CDTCityMaster) => {
      if (data) {
        var model: InsertUpdateCDTCityMasterModel = {
          MasterName: "CDT_CITY_MASTER",
          Mode: "Update",
          Category: data.Category,
          CityX: dataItem.CityX,
          City_Name: data.City_Name
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditCdtCityMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: CDTCityMaster) => {
      if (data) {
        var model: InsertUpdateCDTCityMasterModel = {
          MasterName: "CDT_CITY_MASTER",
          Mode: "Insert",
          Category: data.Category,
          CityX: data.CityX,
          City_Name: data.City_Name
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: CDTCityMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete CDT City";
    componentInstance.message = "Are you sure you want to delete this CDT city master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteCDTCityMasterModel = {
          MasterName: "CDT_CITY_MASTER",
          Mode: "Delete",
          CityX: dataItem.CityX
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }
}
