import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvisionCanvasChannelComponent } from './pages/provision-canvas-channel/provision-canvas-channel.component';
import { ProvisionCdtChannelComponent } from './pages/provision-cdt-channel/provision-cdt-channel.component';
import { ProvisionGtChannelComponent } from './pages/provision-gt-channel/provision-gt-channel.component';
import { ProvisionMttotChannelComponent } from './pages/provision-mttot-channel/provision-mttot-channel.component';

const routes: Routes = [
  {
    path: "GT/:type",
    component: ProvisionGtChannelComponent
  },
  {
    path: "Canvas/:type",
    component: ProvisionCanvasChannelComponent
  },
  {
    path: "CDT/:type",
    component: ProvisionCdtChannelComponent
  },
  {
    path: "MTTOT/:type",
    component: ProvisionMttotChannelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvisonRoutingModule { }
