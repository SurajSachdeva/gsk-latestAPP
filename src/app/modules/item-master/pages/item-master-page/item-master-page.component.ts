import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { ItemMaster } from 'src/app/models/master';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-item-master-page',
  templateUrl: './item-master-page.component.html',
  styleUrls: ['./item-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemMasterPageComponent implements OnInit {
  data: ItemMaster[] = [];

  constructor(private masterApi: MasterApi, private cd: ChangeDetectorRef, private appService: AppService) { }

  ngOnInit(): void {
    this.masterApi.getMasters("Item_Master", true).subscribe(data => {
      if (data && data.Item_Master) {
        this.data = data.Item_Master;
        this.cd.detectChanges();
      }
    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Item Code": x.SKU_Code || '',
        "Parent Description": x.Parent_Description || "",
        "Brand Description": x.Brand_Description || "",
        "Item Desc": x.Item_Desc || "",
        "BLITM_Old": x.QBLITM_old || ''
      }
    });
    const headers = ["Item Code", "Parent Description", "Brand Description", "Item Desc", "BLITM_Old"]
    this.appService.exportAsExcelFile(exportData, "Item-Master", headers);
  }
}
