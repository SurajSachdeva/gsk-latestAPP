import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportChannelMasterPageComponent } from './pages/report-channel-master-page/report-channel-master-page.component'

const routes: Routes = [
  {
    path: "",
    component: ReportChannelMasterPageComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportChannelMasterRoutingModule { }
