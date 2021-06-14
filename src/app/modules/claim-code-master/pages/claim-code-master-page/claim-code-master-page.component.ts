import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { ClaimCodeMaster } from 'src/app/models/master';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditClaimCodeMasterModalComponent } from '../../components/add-edit-claim-code-master-modal/add-edit-claim-code-master-modal.component';

@Component({
  selector: 'app-claim-code-master-page',
  templateUrl: './claim-code-master-page.component.html',
  styleUrls: ['./claim-code-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimCodeMasterPageComponent implements OnInit {
  data: ClaimCodeMaster[] = [];

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
    this.masterApi.getMasters("CLAIM_CODE_MASTER").subscribe(data => {
      if (data && data.CLAIM_CODE_MASTER) {
        this.data = data.CLAIM_CODE_MASTER;
        this.cd.detectChanges();
      }
    });
  }

  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Channel": x.Channel || '',
        "Entity": x.Entity || "",
        "Type": x.Type || "",
        "Sub Type": x.Sub_Type || "",
        "Code": x.Code || ''
      }
    });
    const headers = ["Channel", "Entity", "SAP Bison Prod Code", "SAP Material Code", "Company Code"];
    this.appService.exportAsExcelFile(exportData, "Brand-Master", headers);
  }

  onEdit(dataItem: ClaimCodeMaster) {
    const modalRef = this.modalService.open(AddEditClaimCodeMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditClaimCodeMasterModalComponent;
    // componentInstance.brandMaster = dataItem;
    modalRef.result.then((data: ClaimCodeMaster) => {
      // if (data) {
      //   var model: InsertUpdateBrandMasterModel = {
      //     Brand_Code: data.Brand_Code,
      //     Brand_Description: data.Brand_Description,
      //     Company_Code: data.Company_Code,
      //     MasterName: "BRAND_MASTER",
      //     Mode: "Update",
      //     SAP_Bison_Prod_Code: data.SAP_Bison_Prod_Code,
      //     SAP_Material_Code: data.SAP_Material_Code
      //   }
      //   this.masterApi.saveMasterData(model).subscribe(responseData => {
      //     this.getData();
      //   })
      // }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditClaimCodeMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: ClaimCodeMaster) => {
      // if (data) {
      //   var model: InsertUpdateBrandMasterModel = {
      //     Brand_Code: data.Brand_Code,
      //     Brand_Description: data.Brand_Description,
      //     Company_Code: data.Company_Code,
      //     MasterName: "BRAND_MASTER",
      //     Mode: "Insert",
      //     SAP_Bison_Prod_Code: data.SAP_Bison_Prod_Code,
      //     SAP_Material_Code: data.SAP_Material_Code
      //   }
      //   this.masterApi.saveMasterData(model).subscribe(responseData => {
      //     this.getData();
      //   });
      // }
    });
  }

  onDelete(dataItem: ClaimCodeMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Brand";
    componentInstance.message = "Are you sure you want to delete this brand master?";
    modalRef.result.then((canDelete: boolean) => {
      // if (canDelete) {
      //   var model: DeleteBrandMasterModel = {
      //     Brand_Code: dataItem.Brand_Code,
      //     MasterName: "BRAND_MASTER",
      //     Mode: "Delete",
      //   }
      //   this.masterApi.saveMasterData(model).subscribe(data => {
      //     this.getData();
      //   });
      // }
    });
  }
}
