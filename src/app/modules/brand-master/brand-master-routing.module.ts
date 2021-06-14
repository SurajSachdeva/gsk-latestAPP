import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandMasterPageComponent } from './pages/brand-master-page/brand-master-page.component'

const routes: Routes = [
  {
    path:"",
    component:BrandMasterPageComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandMasterRoutingModule { }
