import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemeMasterRoutingModule } from './scheme-master-routing.module';
import { SchemeMasterPageComponent } from './pages/scheme-master-page/scheme-master-page.component';


@NgModule({
  declarations: [
    SchemeMasterPageComponent
  ],
  imports: [
    CommonModule,
    SchemeMasterRoutingModule
  ]
})
export class SchemeMasterModule { }
