import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasMasterRoutingModule } from './canvas-master-routing.module';
import { CanvasMasterPageComponent } from './pages/canvas-master-page/canvas-master-page.component';
import { AddEditCanvasMasterModalComponent } from './components/add-edit-canvas-master-modal/add-edit-canvas-master-modal.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CanvasMasterPageComponent,
    AddEditCanvasMasterModalComponent
  ],
  imports: [
    CommonModule,
    CanvasMasterRoutingModule,
    SharedModule,
    NgbDatepickerModule
  ]
})
export class CanvasMasterModule { }
