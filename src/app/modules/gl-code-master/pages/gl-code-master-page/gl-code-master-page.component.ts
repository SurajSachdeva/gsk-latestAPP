import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { DeleteGLCodeMasterModel, GLCodeMaster, InsertUpdateGLCodeMasterModel } from 'src/app/models/master';
import { AppService } from 'src/app/services/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AddEditGlCodeMasterModalComponent } from '../../components/add-edit-gl-code-master-modal/add-edit-gl-code-master-modal.component';
@Component({
  selector: 'app-gl-code-master-page',
  templateUrl: './gl-code-master-page.component.html',
  styleUrls: ['./gl-code-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlCodeMasterPageComponent implements OnInit {

  data: GLCodeMaster[] = []
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
    this.masterApi.getMasters("GL_Code_Master").subscribe(data => {
      if (data && data.GL_Code_Master) {
        this.data = data.GL_Code_Master;
        this.cd.detectChanges();
      }
    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "GL Account Code": x.GL_Account_Code || '',
        "GL Acc Desc": x.GL_Account_Desc || "",
      }
    });
    const headers = ["GL Account Code", "GL Acc Desc"];
    this.appService.exportAsExcelFile(exportData, "GL-Code-Master", headers);
  }

  onEdit(dataItem: GLCodeMaster) {
    const modalRef = this.modalService.open(AddEditGlCodeMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditGlCodeMasterModalComponent;
    componentInstance.glCodeMaster = dataItem;
    modalRef.result.then((data: GLCodeMaster) => {
      if (data) {
        var model: InsertUpdateGLCodeMasterModel = {
          MasterName: "GL_CODE_MASTER",
          Mode: "Update",
          GLCodeMaster_Account_Code: `${dataItem.GL_Account_Code}`,
          GL_Account_Desc: data.GL_Account_Desc
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditGlCodeMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: GLCodeMaster) => {
      if (data) {
        var model: InsertUpdateGLCodeMasterModel = {
          MasterName: "GL_CODE_MASTER",
          Mode: "Insert",
          GLCodeMaster_Account_Code: `${data.GL_Account_Code}`,
          GL_Account_Desc: data.GL_Account_Desc
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: GLCodeMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete GL Code";
    componentInstance.message = "Are you sure you want to delete this GL Code master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: DeleteGLCodeMasterModel = {
          MasterName: "GL_CODE_MASTER",
          Mode: "Delete",
          GLCodeMaster_Account_Code: `${dataItem.GL_Account_Code}`
        }
        this.masterApi.saveMasterData(model).subscribe(_ => {
          this.getData();
        });
      }
    });
  }
}
