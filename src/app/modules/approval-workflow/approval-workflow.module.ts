import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalWorkflowRoutingModule } from './approval-workflow-routing.module';
import { ApprovalWorkflowPageComponent } from './pages/approval-workflow-page/approval-workflow-page.component';


@NgModule({
  declarations: [
    ApprovalWorkflowPageComponent
  ],
  imports: [
    CommonModule,
    ApprovalWorkflowRoutingModule
  ]
})
export class ApprovalWorkflowModule { }
