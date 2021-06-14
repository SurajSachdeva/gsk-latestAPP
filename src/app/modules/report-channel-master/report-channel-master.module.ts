import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportChannelMasterRoutingModule } from './report-channel-master-routing.module';
import { ReportChannelMasterPageComponent } from './pages/report-channel-master-page/report-channel-master-page.component';
import { AddEditReportChannelMasterModalComponent } from './components/add-edit-report-channel-master-modal/add-edit-report-channel-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ReportChannelMasterPageComponent,
    AddEditReportChannelMasterModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportChannelMasterRoutingModule
  ]
})
export class ReportChannelMasterModule { }
