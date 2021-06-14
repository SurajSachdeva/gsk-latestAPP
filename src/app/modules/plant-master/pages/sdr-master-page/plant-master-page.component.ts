import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { PlantMaster } from 'src/app/models/master';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-plant-master-page',
  templateUrl: './plant-master-page.component.html',
  styleUrls: ['./plant-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantMasterPageComponent implements OnInit {

  data: PlantMaster[] = [];
  constructor(
    private masterApi: MasterApi,
    private cd: ChangeDetectorRef,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
   this.getData();
  }
  getData(){
    this.masterApi.getMasters("Plant_Master").subscribe(data => {
      if (data && data.Plant_Master) {
        this.data = data.Plant_Master;
        this.cd.detectChanges();
      }else {
        this.data = [];
        this.cd.detectChanges();
      }
    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Company Code": x.Company_Code || '',
        "Region": x.Region || "",
        "Plant Code": x.Plant_Code || "",
        "Sales Org": x.Sales_Org || "",
      }
    });
    const headers = ["Company Code", "Region", "Plant Code","Sales Org"];
    this.appService.exportAsExcelFile(exportData, "Plant-Master", headers);
  }
 
}
