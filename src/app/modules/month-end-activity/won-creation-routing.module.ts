import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthEndTriggerComponent } from './month-end-trigger/month-end-trigger.component';
import { WonCreationSheetComponent } from './won-creation-sheet/won-creation-sheet.component';


const routes: Routes = [
  {
    path: "",
    component: WonCreationSheetComponent
  },
  {
    path: "monthendtrigger",
    component: MonthEndTriggerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WonRoutingModule { }
