import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { BrandMaster, BrandRatioMaster, DeleteBrandMasterModel, InsertUpdateBrandMasterModel, InsertUpdateBrandRatioMasterModel } from 'src/app/models/master';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditBrandRatioMasterModalComponent } from '../../components/add-edit-brand-ratio-master-modal/add-edit-brand-ratio-master-modal.component';

@Component({
  selector: 'app-brand-ratio-master-page',
  templateUrl: './brand-ratio-master-page.component.html',
  styleUrls: ['./brand-ratio-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandRatioMasterPageComponent implements OnInit {
  data: BrandRatioMaster[] = [];

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
    this.masterApi.getMasters("Brand_Ratio_Master").subscribe(data => {
      if (data && data.Brand_Ratio_Master) {
        this.data = data.Brand_Ratio_Master;
        this.cd.detectChanges();
      }
    });
  }

  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Brand Code": x.Brand_Code || '',
        "Entity": x.ENTITY || "",
        "Ratio": x.RATIO || "",
      }
    });
    const headers = ["Brand Code", "Entity", "Ratio"];
    this.appService.exportAsExcelFile(exportData, "Brand-Ratio-Master", headers);
  }

  onEdit(dataItem: BrandRatioMaster) {
    const modalRef = this.modalService.open(AddEditBrandRatioMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditBrandRatioMasterModalComponent;
    componentInstance.brandMaster = dataItem;
    modalRef.result.then((data: BrandRatioMaster) => {
      if (data) {
        var model: InsertUpdateBrandRatioMasterModel = {
          MasterName: "BRAND_RATIO_MASTER",
          Mode: "Update",
          Brand_Ratio_Code: dataItem.Brand_Code,
          Entity: data.ENTITY,
          Ratio: data.RATIO
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditBrandRatioMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: BrandRatioMaster) => {
      if (data) {
        var model: InsertUpdateBrandRatioMasterModel = {
          MasterName: "BRAND_MASTER",
          Mode: "Insert",
          Brand_Ratio_Code: data.Brand_Code,
          Entity: data.ENTITY,
          Ratio: data.RATIO
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: BrandRatioMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Brand Ratio";
    componentInstance.message = "Are you sure you want to delete this brand ratio master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: any = {
          Brand_Ratio_Code: dataItem.Brand_Code,
          MasterName: "BRAND_RATIO_MASTER",
          Mode: "Delete",
        }
        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }
}
