import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MasterApi } from 'src/app/apis/master-api';
import { CustomerMaster } from 'src/app/models/master';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-customer-master-page',
  templateUrl: './customer-master-page.component.html',
  styleUrls: ['./customer-master-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerMasterPageComponent implements OnInit {

  data: CustomerMaster[] = []
  constructor(
    private masterApi: MasterApi,
    private cd: ChangeDetectorRef,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.masterApi.getMasters("CustomerMaster").subscribe(data => {
      if (data && data.CustomerMaster) {
        this.data = data.CustomerMaster;
        this.cd.detectChanges();
      }
    });
  }
  onDownload() {
    const exportData = this.data.map(x => {
      return {
        "Distributer ID": x.Customer_Code || '',
        "Distributer Name": x.Customer_Name || "",
        "Customer Type": x.Customer_Type || "",
        "Customer Type Description": x.Customer_Description || "",
      }
    });
    const headers = ["Distributer ID", "Distributer Name", "Customer Type", "Customer Type Description"];
    this.appService.exportAsExcelFile(exportData, "Customer-Master", headers);
  }
}
