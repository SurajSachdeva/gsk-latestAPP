import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { SharedModule } from '../shared/shared.module';
import { ActualGtChannelComponent } from './pages/actual-gt-channel/actual-gt-channel.component';
import { ActualRoutingModule } from './actual-routing.module';
import { ActualMttotChannelComponent } from './pages/actual-mttot-channel/actual-mttot-channel.component';
import { ActualGtViewDetailComponent } from './components/actual-gt-view-detail/actual-gt-view-detail.component';
import { ActualMttotViewDetailComponent } from './components/actual-mttot-view-detail/actual-mttot-view-detail.component';
import { ActualCanvasChannelComponent } from './pages/actual-canvas-channel/actual-canvas-channel.component';
import { ActualCanvasViewDetailComponent } from './components/actual-canvas-view-detail/actual-canvas-view-detail.component';
import { ActualSdrChannelComponent } from './pages/actual-sdr-channel/actual-sdr-channel.component';
import { ActualSdrViewDetailComponent } from './components/actual-sdr-view-detail/actual-sdr-view-detail.component';
import { ActualCdtChannelComponent } from './pages/actual-cdt-channel/actual-cdt-channel.component';
import { ActualCdtViewDetailComponent } from './components/actual-cdt-view-detail/actual-cdt-view-detail.component';

@NgModule({
  declarations: [
    ActualGtChannelComponent,
    ActualMttotChannelComponent,
    ActualGtViewDetailComponent,
    ActualMttotViewDetailComponent,
    ActualCanvasChannelComponent,
    ActualCanvasViewDetailComponent,
    ActualSdrChannelComponent,
    ActualSdrViewDetailComponent,
    ActualCdtChannelComponent,
    ActualCdtViewDetailComponent,
  ],
  imports: [
    CommonModule,
    ActualRoutingModule,
    SharedModule,
  ]
})
export class ActualModule { }
