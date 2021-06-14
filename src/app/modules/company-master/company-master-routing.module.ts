import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyMasterPageComponent } from './pages/company-master-page/company-master-page.component';

const routes: Routes = [
  {
    path:"",
    component:CompanyMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyMasterRoutingModule { }
