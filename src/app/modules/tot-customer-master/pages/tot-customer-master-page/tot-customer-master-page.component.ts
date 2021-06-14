import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { DeleteTOTCustomerMasterModel, InsertUpdateTOTCustomerMasterModel, TOTCustomerMaster } from 'src/app/models/master';
import { AppService } from 'src/app/services/app.service';
import { AddEditTotCustomerMasterModalComponent } from '../../component/add-edit-tot-customer-master-modal/add-edit-tot-customer-master-modal.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';

@Component({
  selector: 'app-tot-customer-master-page',
  templateUrl: './tot-customer-master-page.component.html',
  styleUrls: ['./tot-customer-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotCustomerMasterPageComponent implements OnInit {

  data: TOTCustomerMaster[] = []
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
    this.masterApi.getMasters("MT_Customer_MST").subscribe(data => {
      if (data && data.MT_Customer_MST) {
        this.data = data.MT_Customer_MST;
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
        "Rowid": x.ROWID || '',
        "Category": x.Category || '',
        "Channel": x.Channel || '',
        "Filter": x.Filter || '',
        "Account": x.Account || '',
        "AccountId": x.AccountId || ''
      }
    });
    const headers = ["Rowid", "Category", "Channel", "Filter", "Account", "AccountId"];
    this.appService.exportAsExcelFile(exportData, "TOT-Customer-Master", headers);
  }
  onEdit(dataItem: TOTCustomerMaster) {
    const modalRef = this.modalService.open(AddEditTotCustomerMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditTotCustomerMasterModalComponent;
    componentInstance.totCustomerMaster = dataItem;
    modalRef.result.then((data: TOTCustomerMaster) => {
      if (data) {
        var model: InsertUpdateTOTCustomerMasterModel = {
          MasterName: "MT_CUSTOMER_MASTER",
          Mode: "Update",
          Filter: data.Filter,
          Account: data.Account,
          MTTOTCustomerCategory: data.Category,
          MTTOTCustomerChannel: data.Channel
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditTotCustomerMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: TOTCustomerMaster) => {
      if (data) {
        var model: InsertUpdateTOTCustomerMasterModel = {
          MasterName: "MT_CUSTOMER_MASTER",
          Mode: "Insert",
          Account: data.Account,
          Filter: data.Filter,
          MTTOTCustomerCategory: data.Category,
          MTTOTCustomerChannel: data.Channel
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: TOTCustomerMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete TOT Customer";
    componentInstance.message = "Are you sure you want to delete this TOT Customer master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteTOTCustomerMasterModel = {
          MasterName: "MT_CUSTOMER_MASTER",
          Mode: "Delete",
          Account: dataItem.Account,
          MTTOTCustomerCategory: dataItem.Category
        }
        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }

}
