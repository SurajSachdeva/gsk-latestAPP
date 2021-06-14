import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SdrMasterRoutingModule } from './sdr-master-routing.module';
import { SdrMasterPageComponent } from './pages/sdr-master-page/sdr-master-page.component';
import { AddEditSdrMasterModalComponent } from './components/add-edit-sdr-master-modal/add-edit-sdr-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SdrMasterPageComponent,
    AddEditSdrMasterModalComponent
  ],
  imports: [
    CommonModule,
    SdrMasterRoutingModule,
    SharedModule
  ]
})
export class SdrMasterModule { }
