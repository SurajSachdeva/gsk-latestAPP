import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdtCityMasterPageComponent } from './pages/cdt-city-master-page/cdt-city-master-page.component';

const routes: Routes = [
  {
    path:"",
    component:CdtCityMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdtCityMasterRoutingModule { }
