import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotMasterPageComponent } from './pages/tot-master-page/tot-master-page.component';

const routes: Routes = [
  {
    path:"",
    component:TotMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TotMasterRoutingModule { }
