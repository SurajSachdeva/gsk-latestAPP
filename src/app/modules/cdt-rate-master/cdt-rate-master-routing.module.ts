import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdtRateMasterPageComponent } from './pages/cdt-rate-master-page/cdt-rate-master-page.component';

const routes: Routes = [
  {
    path:"",
    component:CdtRateMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdtRateMasterRoutingModule { }
