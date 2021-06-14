import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyMasterRoutingModule } from './company-master-routing.module';
import { CompanyMasterPageComponent } from './pages/company-master-page/company-master-page.component';
import { AddEditCompanyMasterModalComponent } from './components/add-edit-company-master-modal/add-edit-company-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CompanyMasterPageComponent,
    AddEditCompanyMasterModalComponent
  ],
  imports: [
    CommonModule,
    CompanyMasterRoutingModule,
    SharedModule
  ]
})
export class CompanyMasterModule { }
