import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotMasterRoutingModule } from './tot-master-routing.module';
import { TotMasterPageComponent } from './pages/tot-master-page/tot-master-page.component';
import { AddEditTotMasterModalComponent } from './component/add-edit-tot-master-modal/add-edit-tot-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TotMasterPageComponent,
    AddEditTotMasterModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TotMasterRoutingModule
  ]
})
export class TotMasterModule { }
