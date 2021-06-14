import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlCodeMasterPageComponent } from './pages/gl-code-master-page/gl-code-master-page.component';

const routes: Routes = [
  {
    path:"",
    component:GlCodeMasterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlCodeMasterRoutingModule { }
