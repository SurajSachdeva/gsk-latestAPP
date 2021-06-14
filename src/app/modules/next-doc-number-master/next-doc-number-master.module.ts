import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NextDocNumberMasterRoutingModule } from './next-doc-number-master-routing.module';
import { NextDocNumberMasterPageComponent } from './pages/next-doc-number-master-page/next-doc-number-master-page.component';
import { AddEditNextDocNumberModalComponent } from './components/add-edit-next-doc-number-modal/add-edit-next-doc-number-modal.component';


@NgModule({
  declarations: [
    NextDocNumberMasterPageComponent,
    AddEditNextDocNumberModalComponent
  ],
  imports: [
    CommonModule,
    NextDocNumberMasterRoutingModule
  ]
})
export class NextDocNumberMasterModule { }
