import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartAccountMasterRoutingModule } from './chart-account-master-routing.module';
import { ChartAccountMasterPageComponent } from './pages/chart-account-master-page/chart-account-master-page.component';
import { AddEditChartAccountMasterModalComponent } from './components/add-edit-chart-account-master-modal/add-edit-chart-account-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ChartAccountMasterPageComponent,
    AddEditChartAccountMasterModalComponent
  ],
  imports: [
    CommonModule,
    ChartAccountMasterRoutingModule,
    SharedModule
  ]
})
export class ChartAccountMasterModule { }
