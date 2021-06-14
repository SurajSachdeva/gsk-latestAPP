import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualCanvasChannelComponent } from './pages/actual-canvas-channel/actual-canvas-channel.component';
import { ActualCdtChannelComponent } from './pages/actual-cdt-channel/actual-cdt-channel.component';
import { ActualGtChannelComponent } from './pages/actual-gt-channel/actual-gt-channel.component';
import { ActualMttotChannelComponent } from './pages/actual-mttot-channel/actual-mttot-channel.component';
import { ActualSdrChannelComponent } from './pages/actual-sdr-channel/actual-sdr-channel.component';

const routes: Routes = [
  {
    path: "GT/:type",
    component: ActualGtChannelComponent
  },
  {
    path: "MTTOT/:type",
    component: ActualMttotChannelComponent
  },
  {
    path: "Canvas/:type",
    component: ActualCanvasChannelComponent
  },
  {
    path: "SDR/:type",
    component: ActualSdrChannelComponent
  },
  {
    path: "CDT/:type",
    component: ActualCdtChannelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualRoutingModule { }
