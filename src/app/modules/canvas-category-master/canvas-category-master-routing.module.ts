import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasCateogryMasterPageComponent } from './pages/canvas-category-master-page/canvas-category-master-page.component'

const routes: Routes = [
  {
    path:"",
    component:CanvasCateogryMasterPageComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanvasCategoryMasterRoutingModule { }
