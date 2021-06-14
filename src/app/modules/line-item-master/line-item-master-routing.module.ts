import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineItemMasterPageComponent } from './pages/line-item-master-page/line-item-master-page.component'

const routes: Routes = [
  {
    path:"",
    component:LineItemMasterPageComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineItemMasterRoutingModule { }
