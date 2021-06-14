import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalWorkflowPageComponent } from './pages/approval-workflow-page/approval-workflow-page.component';

const routes: Routes = [{
  path:"",
  component:ApprovalWorkflowPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalWorkflowRoutingModule { }
