import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessAreaMasterRoutingModule } from './business-area-master-routing.module';
import { BusinessAreaMasterPageComponent } from './pages/business-area-master-page/business-area-master-page.component';
import { AddEditBusinessAreaMasterModalComponent } from './components/add-edit-business-area-master-modal/add-edit-business-area-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BusinessAreaMasterPageComponent,
    AddEditBusinessAreaMasterModalComponent
  ],
  imports: [
    CommonModule,
    BusinessAreaMasterRoutingModule,
    SharedModule
  ]
})
export class BusinessAreaMasterModule { }
