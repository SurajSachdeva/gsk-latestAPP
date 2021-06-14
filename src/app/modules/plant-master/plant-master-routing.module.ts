import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantMasterPageComponent } from './pages/sdr-master-page/plant-master-page.component';

const routes: Routes = [
  {
    path:"",
    component:PlantMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantMasterRoutingModule { }
