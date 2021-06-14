import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from './gaurds/auth.guard';
import { NoAuthGaurd } from './gaurds/no-auth.guard';
import { DefaultLayoutComponent } from './pages/default-layout/default-layout.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [NoAuthGaurd]
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    canActivate: [AuthGaurd],
    children: [
      {
        path: "Master",
        children: [
          {
            path: "Brand",
            loadChildren: () => import("./modules/brand-master/brand-master.module").then(x => x.BrandMasterModule)
          },
          {
            path: "Company",
            loadChildren: () => import("./modules/company-master/company-master.module").then(x => x.CompanyMasterModule)
          },
          {
            path: 'Channel',
            loadChildren: () => import("./modules/channel-master/channel-master.module").then(x => x.ChannelMasterModule)
          },
          {
            path: 'GLCode',
            loadChildren: () => import("./modules/gl-code-master/gl-code-master.module").then(x => x.GlCodeMasterModule)
          },
          {
            path: 'ChartAccount',
            loadChildren: () => import("./modules/chart-account-master/chart-account-master.module").then(x => x.ChartAccountMasterModule)
          },
          {
            path: 'GoA',
            loadChildren: () => import("./modules/go-a-master/go-a-master.module").then(x => x.GoAMasterModule)
          },
          {
            path: 'NextDocNumber',
            loadChildren: () => import("./modules/next-doc-number-master/next-doc-number-master.module").then(x => x.NextDocNumberMasterModule)
          },
          {
            path: 'Customer',
            loadChildren: () => import("./modules/customer-master/customer-master.module").then(x => x.CustomerMasterModule)
          },
          {
            path: 'Item',
            loadChildren: () => import("./modules/item-master/item-master.module").then(x => x.ItemMasterModule)
          },
          {
            path: 'Scheme',
            loadChildren: () => import("./modules/scheme-master/scheme-master.module").then(x => x.SchemeMasterModule)
          },
          {
            path: 'TOTCustomer',
            loadChildren: () => import("./modules/tot-customer-master/tot-customer-master.module").then(x => x.TotCustomerMasterModule)
          },
          {
            path: 'TOT',
            loadChildren: () => import("./modules/tot-master/tot-master.module").then(x => x.TotMasterModule)
          },
          {
            path: 'SDR',
            loadChildren: () => import("./modules/sdr-master/sdr-master.module").then(x => x.SdrMasterModule)
          },
          {
            path: 'CDTRate',
            loadChildren: () => import("./modules/cdt-rate-master/cdt-rate-master.module").then(x => x.CdtRateMasterModule)
          },
          {
            path: 'CDTCity',
            loadChildren: () => import("./modules/cdt-city-master/cdt-city-master.module").then(x => x.CdtCityMasterModule)
          },
          {
            path: 'Canvas',
            loadChildren: () => import("./modules/canvas-master/canvas-master.module").then(x => x.CanvasMasterModule)
          },
          {
            path: 'BusinessArea',
            loadChildren: () => import("./modules/business-area-master/business-area-master.module").then(x => x.BusinessAreaMasterModule)
          },
          {
            path: 'BrandRatio',
            loadChildren: () => import("./modules/brand-ratio-master/brand-ratio-master.module").then(x => x.BrandRatioMasterModule)
          },
          {
            path: 'CanvasCategory',
            loadChildren: () => import("./modules/canvas-category-master/canvas-category-master.module").then(x => x.CanvasCategoryMasterModule)
          },
          {
            path: 'ClaimCode',
            loadChildren: () => import("./modules/claim-code-master/claim-code-master.module").then(x => x.ClaimCodeMasterModule)
          },
          {
            path: 'LineItem',
            loadChildren: () => import("./modules/line-item-master/line-item-master.module").then(x => x.LineItemMasterModule)
          },
          {
            path: 'Plant',
            loadChildren: () => import("./modules/plant-master/plant-master.module").then(x => x.PlantMasterModule)
          },
          {
            path: 'ReportChannel',
            loadChildren: () => import("./modules/report-channel-master/report-channel-master.module").then(x => x.ReportChannelMasterModule)
          }
        ]
      },
      {
        path: "Provision",
        loadChildren: () => import("./modules/provison/provison.module").then(x => x.ProvisonModule)
      },
      {
        path: "Dashboard",
        loadChildren: () => import("./modules/dashboard/dashboard.module").then(x => x.DashboardModule)
      },
      {
        path: "LandingPage",
        loadChildren: () => import("./modules/landing-page/landing-page.module").then(x => x.LandingPageModule)
      },
      {
        path: "ApprovalWorkflow",
        loadChildren: () => import("./modules/approval-workflow/approval-workflow.module").then(x => x.ApprovalWorkflowModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: ""
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
