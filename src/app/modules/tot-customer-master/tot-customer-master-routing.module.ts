import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotCustomerMasterPageComponent } from './pages/tot-customer-master-page/tot-customer-master-page.component';

const routes: Routes = [
  {
    path:"",
    component:TotCustomerMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TotCustomerMasterRoutingModule { }
