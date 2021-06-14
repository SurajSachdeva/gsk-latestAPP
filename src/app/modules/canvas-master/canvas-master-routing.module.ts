import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasMasterPageComponent } from './pages/canvas-master-page/canvas-master-page.component';

const routes: Routes = [
  {
    path:"",
    component:CanvasMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanvasMasterRoutingModule { }
