import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { AppService } from 'src/app/services/app.service';
import { DeleteNextDocNumberMasterModel, InsertUpdateNextDocNumberMasterModel, NextDocMaster } from "src/app/models/master";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditNextDocNumberModalComponent } from '../../components/add-edit-next-doc-number-modal/add-edit-next-doc-number-modal.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
@Component({
  selector: 'app-next-doc-number-master-page',
  templateUrl: './next-doc-number-master-page.component.html',
  styleUrls: ['./next-doc-number-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextDocNumberMasterPageComponent implements OnInit {

  data: NextDocMaster[] = [];
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
    this.masterApi.getMasters("NextDoc_Master").subscribe(data => {
      if (data && data.NextDoc_Master) {
        this.data = data.NextDoc_Master;
        this.cd.detectChanges();
      }
    });
  }

  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Type": x.A_Type || '',
        "Company Code": x.Company_Code || "",
        "Doc Type": x.Doc_type || "",
        "Fiscal Year": x.Fiscal_Year || "",
        "Next Number": x.Next_Number || ''
      }
    });
    const headers = ["Type", "Company Code", "Doc Type", "Fiscal Year", "Next Number"]
    this.appService.exportAsExcelFile(exportData, "Next-Doc-Number-Master", headers);
  }
  onEdit(dataItem: NextDocMaster) {
    const modalRef = this.modalService.open(AddEditNextDocNumberModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditNextDocNumberModalComponent;
    componentInstance.nextDocMaster = dataItem;
    modalRef.result.then((data: NextDocMaster) => {
      if (data) {
        var model: InsertUpdateNextDocNumberMasterModel = {
          Mode: "Update",
          MasterName: "NEXTDOC_MASTER",
          A_Type: data.A_Type,
          Doc_type: dataItem.Doc_type,
          Fiscal_Year: dataItem.Fiscal_Year,
          NextDoc_Company_Code: dataItem.Company_Code,
          Next_Number: data.Next_Number
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditNextDocNumberModalComponent, { size: "lg" });
    modalRef.result.then((data: NextDocMaster) => {
      if (data) {
        var model: InsertUpdateNextDocNumberMasterModel = {
          Mode: "Insert",
          MasterName: "NEXTDOC_MASTER",
          A_Type: data.A_Type,
          Doc_type: data.Doc_type,
          Fiscal_Year: data.Fiscal_Year,
          NextDoc_Company_Code: data.Company_Code,
          Next_Number: data.Next_Number
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        })
      }
    });
  }

  onDelete(dataItem: NextDocMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Next Doc Number Master";
    componentInstance.message = "Are you sure you want to delete this Next Doc Number Master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteNextDocNumberMasterModel = {
          Mode: "Delete",
          MasterName: "NEXTDOC_MASTER",
          Doc_type: dataItem.Doc_type,
          Fiscal_Year: dataItem.Fiscal_Year,
          NextDoc_Company_Code: dataItem.Company_Code
        }
        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }


}
