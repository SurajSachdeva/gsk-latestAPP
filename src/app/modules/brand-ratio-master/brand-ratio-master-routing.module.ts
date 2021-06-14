import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  BrandRatioMasterPageComponent } from './pages/brand-ratio-master-page/brand-ratio-master-page.component'

const routes: Routes = [
  {
    path:"",
    component:BrandRatioMasterPageComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRatioMasterRoutingModule { }
