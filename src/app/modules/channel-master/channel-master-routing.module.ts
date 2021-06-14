import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelMasterPageComponent } from './pages/channel-master-page/channel-master-page.component'

const routes: Routes = [
  {
    path:"",
    component:ChannelMasterPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelMasterRoutingModule { }
