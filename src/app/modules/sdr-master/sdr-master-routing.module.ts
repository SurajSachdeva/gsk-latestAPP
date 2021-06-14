import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SdrMasterPageComponent } from './pages/sdr-master-page/sdr-master-page.component';

const routes: Routes = [
  {
    path:"",
    component:SdrMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SdrMasterRoutingModule { }
