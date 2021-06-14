import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdtCityMasterRoutingModule } from './cdt-city-master-routing.module';
import { CdtCityMasterPageComponent } from './pages/cdt-city-master-page/cdt-city-master-page.component';
import { AddEditCdtCityMasterModalComponent } from './components/add-edit-cdt-city-master-modal/add-edit-cdt-city-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CdtCityMasterPageComponent,
    AddEditCdtCityMasterModalComponent
  ],
  imports: [
    CommonModule,
    CdtCityMasterRoutingModule,
    SharedModule
  ]
})
export class CdtCityMasterModule { }
