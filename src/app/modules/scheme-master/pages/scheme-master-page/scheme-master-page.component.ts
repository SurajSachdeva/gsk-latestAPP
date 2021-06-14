import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { SchemeMaster } from 'src/app/models/master';
import { AppService } from 'src/app/services/app.service';
import * as moment from "moment"

@Component({
  selector: 'app-scheme-master-page',
  templateUrl: './scheme-master-page.component.html',
  styleUrls: ['./scheme-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchemeMasterPageComponent implements OnInit {

  data: SchemeMaster[] = [];
  constructor(
    private masterApi: MasterApi,
    private cd: ChangeDetectorRef,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.masterApi.getMasters("Scheme_Master", true).subscribe(data => {
      if (data && data.Scheme_Master) {
        this.data = data.Scheme_Master;
        this.cd.detectChanges();
      }
    });

  }

  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "WON ID": x.WON_ID || '',
        "Brand": x.Brand || "",
        "Scheme Description": x.SchemeDescription || "",
        "Scheme Based On": x.SchemeBasedOn || "",
        "Start Date": x.StartDate ? moment(x.StartDate).format("MM-DD-YYYY") : '',
        "End Date": x.EndDate ? moment(x.EndDate).format("MM-DD-YYYY") : '',
        "Budget Value": x.BudgetValue || "",
        "Creation Date": x.CreationDate ? moment(x.CreationDate).format("MM-DD-YYYY") : '',
        "Slab Start": x.SlabStart || "",
        "Slab End": x.SlabEnd || "",
        "Benefit Value": x.BenefitValue || ""
      }
    });
    const headers = ["WON ID", "Brand", "Scheme Description", "Scheme Based On", "Start Date", "End Date", "Budget Value", "Creation Date", "Slab Start", "Slab End", "Benefit Value"]
    this.appService.exportAsExcelFile(exportData, "Scheme-Master", headers);
  }

}
