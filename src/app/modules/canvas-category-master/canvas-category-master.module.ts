import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasCategoryMasterRoutingModule } from './canvas-category-master-routing.module';
import { CanvasCateogryMasterPageComponent } from './pages/canvas-category-master-page/canvas-category-master-page.component';
import { AddEditCanvasCategoryMasterModalComponent } from './components/add-edit-canvas-category-master-modal/add-edit-canvas-category-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CanvasCateogryMasterPageComponent,
    AddEditCanvasCategoryMasterModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CanvasCategoryMasterRoutingModule
  ]
})
export class CanvasCategoryMasterModule { }
