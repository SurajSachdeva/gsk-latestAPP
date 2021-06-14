import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoAMasterPageComponent } from './pages/go-a-master-page/go-a-master-page.component'
const routes: Routes = [
  {
    path:"",
    component:GoAMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoAMasterRoutingModule { }
