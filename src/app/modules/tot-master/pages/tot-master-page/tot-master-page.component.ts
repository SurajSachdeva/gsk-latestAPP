import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { DeleteTOTMasterModel, InsertTOTMasterModel, TOTCustomerMaster, TOTMaster } from 'src/app/models/master';
import { AppService } from 'src/app/services/app.service';
import { AddEditTotMasterModalComponent } from '../../component/add-edit-tot-master-modal/add-edit-tot-master-modal.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';

@Component({
  selector: 'app-tot-master-page',
  templateUrl: './tot-master-page.component.html',
  styleUrls: ['./tot-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotMasterPageComponent implements OnInit {
  data: TOTMaster[] = []
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
    this.masterApi.getMasters("MTTOT").subscribe(data => {
      if (data && data.MTTOT) {
        this.data = data.MTTOT;
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
        "Category": x.Category || '',
        "Customer Name": x.Account || '',
        "Brand Name": x.Brand || '',
        "Rate": x.Rate || '',
        "Effec. Date": x.Effective_Date || ''
      }
    });
    const headers = ["Category", "Customer Name", "Brand Name", "Rate", "Effec. Date"];
    this.appService.exportAsExcelFile(exportData, "TOT-Customer-Master", headers);
  }
  onAdd() {
    const modalRef = this.modalService.open(AddEditTotMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: TOTMaster) => {
      if (data) {
        var model: InsertTOTMasterModel = {
          Mode: "Insert",
          MasterName: "MTTOT_MASTER_NEW",
          MTTOTRateMaster_Category: data.Category,
          MTTOTRate_Account: data.Account,
          MTTOTRate_Brand: data.Brand,
          MTTOTRate_Rate: `${data.Rate}`
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: TOTMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete TOT Rate Master";
    componentInstance.message = "Are you sure you want to delete this TOT rate master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteTOTMasterModel = {
          Mode: "Delete",
          MasterName: "MTTOT_MASTER_NEW",
          MTTOTRateMaster_Category: dataItem.Category,
          MTTOTRate_Brand: dataItem.Brand
        }
        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }



}




