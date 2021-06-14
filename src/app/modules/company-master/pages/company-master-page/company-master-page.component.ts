import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { CompanyMaster, DeleteCompanyMasterModel, InsertUpdateCompanyMasterModel } from "src/app/models/master/index"
import { AppService } from 'src/app/services/app.service';
import { AddEditCompanyMasterModalComponent } from '../../components/add-edit-company-master-modal/add-edit-company-master-modal.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-company-master-page',
  templateUrl: './company-master-page.component.html',
  styleUrls: ['./company-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyMasterPageComponent implements OnInit {
  data: CompanyMaster[] = []
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
    this.masterApi.getMasters("Company_Master").subscribe(data => {
      if (data && data.Company_Master) {
        this.data = data.Company_Master;
        this.cd.detectChanges();
      }
    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Company Code": x.Company_Code || '',
        "Company Name": x.Company_Description || "",
        "Profit Center": x.Profit_Center || "",
        "Plant": x.Plant || "",
        "SalesOrg": x.Sales_Org || ""
      }
    });
    const headers = ["Company Code", "Company Name", "Profit Center", "Plant", "SalesOrg"];
    this.appService.exportAsExcelFile(exportData, "Company-Master", headers);
  }
  onEdit(dataItem: CompanyMaster) {
    const modalRef = this.modalService.open(AddEditCompanyMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditCompanyMasterModalComponent;
    componentInstance.companyMaster = dataItem;
    modalRef.result.then((data: CompanyMaster) => {
      if (data) {
        var model: InsertUpdateCompanyMasterModel = {
          MasterName: "COMPANY_MASTER",
          Mode: "Update",
          Company_CodeMst: data.Company_Code,
          Company_Description: data.Company_Description,
          Plant: data.Plant,
          Profit_Center: `${data.Profit_Center}`,
          Sales_Org: data.Sales_Org
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditCompanyMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: CompanyMaster) => {
      if (data) {
        var model: InsertUpdateCompanyMasterModel = {
          MasterName: "COMPANY_MASTER",
          Mode: "Insert",
          Company_CodeMst: data.Company_Code,
          Company_Description: data.Company_Description,
          Plant: data.Plant,
          Profit_Center: `${data.Profit_Center}`,
          Sales_Org: data.Sales_Org
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: CompanyMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Company";
    componentInstance.message = "Are you sure you want to delete this company master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteCompanyMasterModel = {
          MasterName: "COMPANY_MASTER",
          Mode: "Delete",
          Company_CodeMst: dataItem.Company_Code
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }
}
