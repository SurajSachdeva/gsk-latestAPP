import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextDocNumberMasterPageComponent } from './pages/next-doc-number-master-page/next-doc-number-master-page.component'
const routes: Routes = [
  {
    path:"",
    component:NextDocNumberMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NextDocNumberMasterRoutingModule { }
