import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemeMasterPageComponent } from './pages/scheme-master-page/scheme-master-page.component'
const routes: Routes = [
  {
    path:"",
    component:SchemeMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemeMasterRoutingModule { }
