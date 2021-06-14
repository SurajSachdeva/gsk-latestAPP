import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotCustomerMasterRoutingModule } from './tot-customer-master-routing.module';
import { TotCustomerMasterPageComponent } from './pages/tot-customer-master-page/tot-customer-master-page.component';
import { AddEditTotCustomerMasterModalComponent } from './component/add-edit-tot-customer-master-modal/add-edit-tot-customer-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TotCustomerMasterPageComponent,
    AddEditTotCustomerMasterModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TotCustomerMasterRoutingModule
  ]
})
export class TotCustomerMasterModule { }
