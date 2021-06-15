import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import { ClaimCodeMaster, DeleteClaimCodeMasterModel, InsertUpdateClaimCodeMasterModel } from 'src/app/models/master';
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
    const headers = ["Channel", "Entity", "Type", "Sub Type", "Code"];
    this.appService.exportAsExcelFile(exportData, "Claim-Code-Master", headers);
  }

  onEdit(dataItem: ClaimCodeMaster) {
    const modalRef = this.modalService.open(AddEditClaimCodeMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditClaimCodeMasterModalComponent;
    componentInstance.claimCodeMaster = dataItem;
    modalRef.result.then((data: ClaimCodeMaster) => {
      if (data) {
        var model: InsertUpdateClaimCodeMasterModel = {
          MasterName: "CLAIM_CODE_MASTER",
          Mode: "Update",
          CC_ENTITY: dataItem.Entity,
          CC_TYPE: dataItem.Type,
          SUB_TYPE: dataItem.Sub_Type,
          CHANNEL_CLAIM: dataItem.Channel,
          CC_CODE: data.Code
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditClaimCodeMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: ClaimCodeMaster) => {
      if (data) {
        var model: InsertUpdateClaimCodeMasterModel = {
          MasterName: "CLAIM_CODE_MASTER",
          Mode: "Insert",
          CC_ENTITY: data.Entity,
          CC_TYPE: data.Type,
          SUB_TYPE: data.Sub_Type,
          CHANNEL_CLAIM: data.Channel,
          CC_CODE: data.Code
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: ClaimCodeMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Claim Code Master";
    componentInstance.message = "Are you sure you want to delete this Claim Code master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteClaimCodeMasterModel = {
          MasterName: "CLAIM_CODE_MASTER",
          Mode: "Delete",
          CC_ENTITY: dataItem.Entity,
          CC_TYPE: dataItem.Type,
          SUB_TYPE: dataItem.Sub_Type,
          CHANNEL_CLAIM: dataItem.Channel
        }
        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }
}
