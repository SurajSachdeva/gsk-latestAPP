import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartAccountMasterPageComponent } from './pages/chart-account-master-page/chart-account-master-page.component'
const routes: Routes = [
  {
    path:"",
    component:ChartAccountMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartAccountMasterRoutingModule { }
