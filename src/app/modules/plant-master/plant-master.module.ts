import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantMasterRoutingModule } from './plant-master-routing.module';
import { PlantMasterPageComponent } from './pages/sdr-master-page/plant-master-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PlantMasterPageComponent,
  ],
  imports: [
    CommonModule,
    PlantMasterRoutingModule,
    SharedModule
  ]
})
export class PlantMasterModule { }
