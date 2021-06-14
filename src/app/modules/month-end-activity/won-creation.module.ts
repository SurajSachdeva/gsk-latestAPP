import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WonRoutingModule } from './won-creation-routing.module';
import { WonCreationSheetComponent } from './won-creation-sheet/won-creation-sheet.component';
import { MonthEndTriggerComponent } from './month-end-trigger/month-end-trigger.component';


@NgModule({
  declarations: [
      WonCreationSheetComponent,
      MonthEndTriggerComponent,
  ],
  imports: [
    CommonModule,
    WonRoutingModule,
  
  ]
})
export class WonCreationModule { }
