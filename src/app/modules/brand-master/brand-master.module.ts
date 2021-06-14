import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandMasterRoutingModule } from './brand-master-routing.module';
import { BrandMasterPageComponent } from './pages/brand-master-page/brand-master-page.component';
import { AddEditBrandMasterModalComponent } from './components/add-edit-brand-master-modal/add-edit-brand-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BrandMasterPageComponent,
    AddEditBrandMasterModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrandMasterRoutingModule
  ]
})
export class BrandMasterModule { }
