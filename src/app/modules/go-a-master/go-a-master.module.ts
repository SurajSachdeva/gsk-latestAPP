import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoAMasterRoutingModule } from './go-a-master-routing.module';
import { GoAMasterPageComponent } from './pages/go-a-master-page/go-a-master-page.component';
import { AddEditGoAMasterModalComponent } from './components/add-edit-go-a-master-modal/add-edit-go-a-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GoAMasterPageComponent,
    AddEditGoAMasterModalComponent
  ],
  imports: [
    CommonModule,
    GoAMasterRoutingModule,
    SharedModule
  ],
  entryComponents:[AddEditGoAMasterModalComponent]
})
export class GoAMasterModule { }
