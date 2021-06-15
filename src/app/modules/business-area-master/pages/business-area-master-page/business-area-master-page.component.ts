import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { BusinessAreaMaster, InsertUpdateDeleteBusinessAreaMasterModel } from 'src/app/models/master';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditBusinessAreaMasterModalComponent } from '../../components/add-edit-business-area-master-modal/add-edit-business-area-master-modal.component';

@Component({
  selector: 'app-business-area-master-page',
  templateUrl: './business-area-master-page.component.html',
  styleUrls: ['./business-area-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessAreaMasterPageComponent implements OnInit {

  data: BusinessAreaMaster[] = []
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
    this.masterApi.getMasters("Business_Area_Master").subscribe(data => {
      if (data && data.Business_Area_Master) {
        this.data = data.Business_Area_Master;
        this.cd.detectChanges();
      }
    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Business Area List": x.Business_Area_List || '',
        "Business Description": x.Business_Description || "",
      }
    });
    const headers = ["Business Area List", "Business Description"];
    this.appService.exportAsExcelFile(exportData, "Business-Area-Master", headers);
  }

  onEdit(dataItem: BusinessAreaMaster) {
    const modalRef = this.modalService.open(AddEditBusinessAreaMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditBusinessAreaMasterModalComponent;
    componentInstance.businessAreaMaster = dataItem;
    modalRef.result.then((data: BusinessAreaMaster) => {
      if (data) {
        var model: InsertUpdateDeleteBusinessAreaMasterModel = {
          MasterName: "BUSINESS_AREA_MASTER",
          Mode: "Update",
          Business_Area_List: `${dataItem.Business_Area_List}`,
          Business_Description: data.Business_Description
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditBusinessAreaMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: BusinessAreaMaster) => {
      if (data) {
        var model: InsertUpdateDeleteBusinessAreaMasterModel = {
          MasterName: "BUSINESS_AREA_MASTER",
          Mode: "Insert",
          Business_Area_List: `${data.Business_Area_List}`,
          Business_Description: data.Business_Description
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: BusinessAreaMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Business Area";
    componentInstance.message = "Are you sure you want to delete this business area master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: InsertUpdateDeleteBusinessAreaMasterModel = {
          MasterName: "BUSINESS_AREA_MASTER",
          Mode: "Delete",
          Business_Area_List: `${dataItem.Business_Area_List}`,
          Business_Description: dataItem.Business_Description
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }

}
