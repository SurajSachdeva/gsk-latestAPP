import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimCodeMasterRoutingModule } from './claim-code-master-routing.module';
import { ClaimCodeMasterPageComponent } from './pages/claim-code-master-page/claim-code-master-page.component';
import { AddEditClaimCodeMasterModalComponent } from './components/add-edit-claim-code-master-modal/add-edit-claim-code-master-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClaimCodeMasterPageComponent,
    AddEditClaimCodeMasterModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClaimCodeMasterRoutingModule
  ]
})
export class ClaimCodeMasterModule { }
