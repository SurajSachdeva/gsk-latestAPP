import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterApi } from 'src/app/apis/master-api';
import {  CanvasCategoryMaster, DeleteBrandMasterModel} from 'src/app/models/master';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { AppService } from 'src/app/services/app.service';
import { AddEditCanvasCategoryMasterModalComponent } from '../../components/add-edit-canvas-category-master-modal/add-edit-canvas-category-master-modal.component';

@Component({
  selector: 'app-canvas-category-master-page',
  templateUrl: './canvas-category-master-page.component.html',
  styleUrls: ['./canvas-category-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasCateogryMasterPageComponent implements OnInit {
  
  data: CanvasCategoryMaster[] = [];

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
    this.masterApi.getMasters("CANVAS_CATEGORY_MST").subscribe(data => {
      if (data && data.CANVAS_CATEGORY_MST) {
        this.data = data.CANVAS_CATEGORY_MST;
        this.cd.detectChanges();
      }
    });
  }

  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Secondary Channel": x.Secondary_Channel || '',
        "Category": x.Category || ""
      }
    });
    const headers = ["Secondary Channel", "Category"];
    this.appService.exportAsExcelFile(exportData, "Canvas-Cateogry-Master", headers);
  }

  onEdit(dataItem: CanvasCategoryMaster) {
    const modalRef = this.modalService.open(AddEditCanvasCategoryMasterModalComponent, { size: "lg" });
    var componentInstance = modalRef.componentInstance as AddEditCanvasCategoryMasterModalComponent;
    componentInstance.canvasCategoryMaster = dataItem;
    modalRef.result.then((data: CanvasCategoryMaster) => {
      if (data) {
        var model: any = {
          MasterName: "CANVAS_CATEGORY_MST",
          Mode: "Update",
          Secondary_Channel:dataItem.Secondary_Channel,
          Canvas_Category:data.Category
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        })
      }
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddEditCanvasCategoryMasterModalComponent, { size: "lg" });
    modalRef.result.then((data: CanvasCategoryMaster) => {
      if (data) {
        var model: any = {
          MasterName: "CANVAS_CATEGORY_MST",
          Mode: "Insert",
          Secondary_Channel:data.Secondary_Channel,
          Canvas_Category:data.Category
        }
        this.masterApi.saveMasterData(model).subscribe(responseData => {
          this.getData();
        });
      }
    });
  }

  onDelete(dataItem: CanvasCategoryMaster) {
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, { size: "md", backdrop: "static" });
    var componentInstance = modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.heading = "Delete Canvas Category Master";
    componentInstance.message = "Are you sure you want to delete this Canvas Category Master?";
    modalRef.result.then((canDelete: boolean) => {
      if (canDelete) {
        var model: any = {
          MasterName: "CANVAS_CATEGORY_MST",
          Secondary_Channel:dataItem.Secondary_Channel,
          Mode: "Delete"
        }
        this.masterApi.saveMasterData(model).subscribe(data => {
          this.getData();
        });
      }
    });
  }
}
