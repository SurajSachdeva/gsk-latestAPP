import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvisonRoutingModule } from './provison-routing.module';
import { ProvisionGtChannelComponent } from './pages/provision-gt-channel/provision-gt-channel.component';
import { SharedModule } from '../shared/shared.module';
import { ProvisionCdtChannelComponent } from './pages/provision-cdt-channel/provision-cdt-channel.component';
import { ProvisionMttotChannelComponent } from './pages/provision-mttot-channel/provision-mttot-channel.component';
import { ProvisionCanvasChannelComponent } from './pages/provision-canvas-channel/provision-canvas-channel.component';
import { ProvisionGtViewDetailComponent } from './components/provision-gt-view-detail/provision-gt-view-detail.component';
import { ProvisionCanvasViewDetailComponent } from './components/provision-canvas-view-detail/provision-canvas-view-detail.component';
import { ProvisionCdtViewDetailComponent } from './components/provision-cdt-view-detail/provision-cdt-view-detail.component';
import { ProvisionMttotViewDetailComponent } from './components/provision-mttot-view-detail/provision-mttot-view-detail.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    ProvisionGtChannelComponent,
    ProvisionCdtChannelComponent,
    ProvisionMttotChannelComponent,
    ProvisionCanvasChannelComponent,
    ProvisionGtViewDetailComponent,
    ProvisionCanvasViewDetailComponent,
    ProvisionCdtViewDetailComponent,
    ProvisionMttotViewDetailComponent
  ],
  imports: [
    CommonModule,
    ProvisonRoutingModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ]
})
export class ProvisonModule { }
