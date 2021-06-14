import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemMasterPageComponent } from './pages/item-master-page/item-master-page.component'
const routes: Routes = [
  {
    path:"",
    component:ItemMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemMasterRoutingModule { }
