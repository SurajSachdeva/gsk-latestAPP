import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { BrandMaster, DeleteBrandMasterModel, InsertUpdateBrandMasterModel } from 'src/app/models/master';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditBrandMasterModalComponent } from '../../components/add-edit-brand-master-modal/add-edit-brand-master-modal.component';

@Component({
  selector: 'app-brand-master-page',
  templateUrl: './brand-master-page.component.html',
  styleUrls: ['./brand-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandMasterPageComponent implements OnInit {
  data: BrandMaster[] = [];

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
    this.masterApi.getMasters("Brand_Master").subscribe(data => {
      if (data && data.Brand_Master) {
        this.data = data.Brand_Master;
        this.cd.detectChanges();
      }
    });
  }

  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Brand Code": x.Brand_Code || '',
        "Brand Desc": x.Brand_Description || "",
        "SAP Bison Prod Code": x.SAP_Bison_Prod_Code || "",
        "SAP Material Code": x.SAP_Material_Code || "",
        "Company Code": x.Company_Code || ''
      }
    });
    const headers = ["Brand Code", "Brand Desc", "SAP Bison Prod Code", "SAP Material Code", "Company Code"];
    this.appService.exportAsExcelFile(exportData, "Brand-Master", headers);
  }

  onEdit(dataItem: BrandMaster) {
    const modalRef = this.modalService.open(AddEditBrandMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditBrandMasterModalComponent;
    componentInstance.brandMaster = dataItem;
    modalRef.result.then((data: BrandMaster) => {
      if (data) {
        var model: InsertUpdateBrandMasterModel = {
          Brand_Code: data.Brand_Code,
          Brand_Description: data.Brand_Description,
          Company_Code: data.Company_Code,
          MasterName: "BRAND_MASTER",
          Mode: "Update",
          SAP_Bison_Prod_Code: data.SAP_Bison_Prod_Code,
          SAP_Material_Code: data.SAP_Material_Code
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditBrandMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: BrandMaster) => {
      if (data) {
        var model: InsertUpdateBrandMasterModel = {
          Brand_Code: data.Brand_Code,
          Brand_Description: data.Brand_Description,
          Company_Code: data.Company_Code,
          MasterName: "BRAND_MASTER",
          Mode: "Insert",
          SAP_Bison_Prod_Code: data.SAP_Bison_Prod_Code,
          SAP_Material_Code: data.SAP_Material_Code
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: BrandMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Brand";
    componentInstance.message = "Are you sure you want to delete this brand master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteBrandMasterModel = {
          Brand_Code: dataItem.Brand_Code,
          MasterName: "BRAND_MASTER",
          Mode: "Delete",
        }
        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }
}
