import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdtRateMasterRoutingModule } from './cdt-rate-master-routing.module';
import { CdtRateMasterPageComponent } from './pages/cdt-rate-master-page/cdt-rate-master-page.component';
import { AddEditCdtRateMasterModalComponent } from './components/add-edit-cdt-rate-master-modal/add-edit-cdt-rate-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CdtRateMasterPageComponent,
    AddEditCdtRateMasterModalComponent
  ],
  imports: [
    CommonModule,
    CdtRateMasterRoutingModule,
    SharedModule
  ]
})
export class CdtRateMasterModule { }
