import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LandingPageDetailComponent } from './components/landing-page-detail/landing-page-detail.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RemarksModalComponent } from './components/remarks-modal/remarks-modal.component';
import { NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ConfirmationDialogModalComponent } from './components/confirmation-dialog-modal/confirmation-dialog-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LandingPageDetailComponent,
    BreadcrumbComponent,
    RemarksModalComponent,
    AlertModalComponent,
    ConfirmationDialogModalComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    RouterModule,
    NgbCollapseModule,
    NgbDatepickerModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    LandingPageDetailComponent,
    BreadcrumbComponent,

    CommonModule,
    NgbModalModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    RouterModule,
    NgbCollapseModule,
    NgbDatepickerModule
  ]
})
export class SharedModule {

  // static forRoot() : ModuleWithProviders<SharedModule> {
  //   return {
  //     ngModule:SharedModule,
  //     providers:[SharedService]
  //   }
  // }
 }
