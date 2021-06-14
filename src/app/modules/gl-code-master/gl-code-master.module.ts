import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlCodeMasterRoutingModule } from './gl-code-master-routing.module';
import { GlCodeMasterPageComponent } from './pages/gl-code-master-page/gl-code-master-page.component';
import { AddEditGlCodeMasterModalComponent } from './components/add-edit-gl-code-master-modal/add-edit-gl-code-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GlCodeMasterPageComponent,
    AddEditGlCodeMasterModalComponent
  ],
  imports: [
    CommonModule,
    GlCodeMasterRoutingModule,
    SharedModule
  ]
})
export class GlCodeMasterModule { }
