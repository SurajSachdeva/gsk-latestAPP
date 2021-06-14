import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelMasterRoutingModule } from './channel-master-routing.module';
import { ChannelMasterPageComponent } from './pages/channel-master-page/channel-master-page.component';
import { AddEditChannelMasterModalComponent } from './components/add-edit-channel-master-modal/add-edit-channel-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ChannelMasterPageComponent,
    AddEditChannelMasterModalComponent
  ],
  imports: [
    CommonModule,
    ChannelMasterRoutingModule,
    SharedModule
  ]
})
export class ChannelMasterModule { }
