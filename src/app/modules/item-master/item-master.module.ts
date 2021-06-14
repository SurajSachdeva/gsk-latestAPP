import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemMasterRoutingModule } from './item-master-routing.module';
import { ItemMasterPageComponent } from './pages/item-master-page/item-master-page.component';


@NgModule({
  declarations: [
    ItemMasterPageComponent
  ],
  imports: [
    CommonModule,
    ItemMasterRoutingModule
  ]
})
export class ItemMasterModule { }
