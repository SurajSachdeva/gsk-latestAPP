import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessAreaMasterPageComponent } from './pages/business-area-master-page/business-area-master-page.component';

const routes: Routes = [
  {
    path:"",
    component:BusinessAreaMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessAreaMasterRoutingModule { }
