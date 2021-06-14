import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { AppService } from 'src/app/services/app.service';
import { NextDocMaster } from "src/app/models/master";
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
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
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
  onEdit() {
    const modalRef = this.modalService.open(AddEditNextDocNumberModalComponent, { size: "lg" });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditNextDocNumberModalComponent, { size: "lg" });
  }
  
  onDelete() {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop:"static" });
    var componentInstance=modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading="Delete Brand";
    componentInstance.message="Are you sure you want to delete this brand master?";
  }


}
