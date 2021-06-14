import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { DeleteGoAMasterModel, GoAMaster, InsertGoAMasterModel, UpdateGoAMasterModel } from "src/app/models/master"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditGoAMasterModalComponent } from '../../components/add-edit-go-a-master-modal/add-edit-go-a-master-modal.component';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';

@Component({
  selector: 'app-go-a-master-page',
  templateUrl: './go-a-master-page.component.html',
  styleUrls: ['./go-a-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoAMasterPageComponent implements OnInit {

  data: GoAMaster[] = [];
  constructor(
    private masterApi: MasterApi,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.masterApi.getMasters("Goa_Master").subscribe(data => {
      if (data && data.Goa_Master) {
        this.data = data.Goa_Master;
        this.cd.detectChanges();
      }
    });
  }

  onEdit(dataItem: GoAMaster) {
    const modalRef = this.modalService.open(AddEditGoAMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditGoAMasterModalComponent;
    componentInstance.goAMaster = dataItem;
    modalRef.result.then((data: GoAMaster) => {
      if (data) {
        var model: UpdateGoAMasterModel = {
          MasterName: "USER_MASTER",
          Mode: "Update",
          Department: data.Department,
          MudID: dataItem.MudID,
          Role: dataItem.Role,
          SlabEnd: dataItem.SlabEnd || 0,
          SlabStart: dataItem.SlabStart || 0,
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditGoAMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: GoAMaster) => {
      if (data) {
        var model: InsertGoAMasterModel = {
          MasterName: "USER_MASTER",
          Mode: "Insert",
          Department: data.Department,
          EmailId: data.EmailId,
          MudID: data.MudID,
          Role: data.Role,
          SlabEnd: data.SlabEnd || 0,
          SlabStart: data.SlabStart || 0,
          UserName: data.UserName
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: GoAMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete GL Code";
    componentInstance.message = "Are you sure you want to delete this GL Code master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteGoAMasterModel = {
          MasterName: "USER_MASTER",
          Mode: "Delete",
          MudID: dataItem.MudID
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }
}
