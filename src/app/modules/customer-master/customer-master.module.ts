import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerMasterRoutingModule } from './customer-master-routing.module';
import { CustomerMasterPageComponent } from './pages/customer-master-page/customer-master-page.component';


@NgModule({
  declarations: [
    CustomerMasterPageComponent
  ],
  imports: [
    CommonModule,
    CustomerMasterRoutingModule
  ]
})
export class CustomerMasterModule { }
