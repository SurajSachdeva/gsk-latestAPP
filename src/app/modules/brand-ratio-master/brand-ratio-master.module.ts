import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRatioMasterRoutingModule } from './brand-ratio-master-routing.module';
import { AddEditBrandRatioMasterModalComponent } from './components/add-edit-brand-ratio-master-modal/add-edit-brand-ratio-master-modal.component';
import { SharedModule } from '../shared/shared.module';
import { BrandRatioMasterPageComponent } from './pages/brand-ratio-master-page/brand-ratio-master-page.component';


@NgModule({
  declarations: [
    BrandRatioMasterPageComponent,
    AddEditBrandRatioMasterModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrandRatioMasterRoutingModule
  ]
})
export class BrandRatioMasterModule { }
