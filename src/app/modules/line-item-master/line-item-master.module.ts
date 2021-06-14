import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineItemMasterRoutingModule } from './line-item-master-routing.module';
import { LineItemMasterPageComponent } from './pages/line-item-master-page/line-item-master-page.component';
import { AddEditLineItemMasterModalComponent } from './components/add-edit-line-item-master-modal/add-edit-line-item-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LineItemMasterPageComponent,
    AddEditLineItemMasterModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LineItemMasterRoutingModule
  ]
})
export class LineItemMasterModule { }
