import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimCodeMasterPageComponent } from './pages/claim-code-master-page/claim-code-master-page.component'

const routes: Routes = [
  {
    path:"",
    component:ClaimCodeMasterPageComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimCodeMasterRoutingModule { }
