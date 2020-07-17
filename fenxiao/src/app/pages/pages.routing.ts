import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistComponent } from './regist/regist.component';
import { MainComponent } from './main/main.component';
import { WorkboardComponent } from './workboard/workboard.component';
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'regist', component: RegistComponent },
    {
        path: 'main', component: MainComponent,
        children: [
            { path: '', redirectTo: 'workboard', pathMatch: 'full' },
            { path: 'workboard', component: WorkboardComponent },
            { path: 'partner', loadChildren: () => import('./partner/partner.module').then(mod => mod.PartnerModule) },
            { path: 'report', loadChildren: () => import('./report/report.module').then(mod => mod.ReportModule) },
            { path: 'goods', loadChildren: () => import('./goods/goods.module').then(mod => mod.GoodsModule) },
            { path: 'merchant', loadChildren: () => import('./merchant/merchant.module').then(mod => mod.MerchantModule) },
            { path: 'dataAnalysis', loadChildren: () => import('./dataAnalysis/dataAnalysis.module').then(mod => mod.DataAnalysisModule) },
            { path: 'ops', loadChildren: () => import('./ops/ops.module').then(mod => mod.OpsModule) },
            { path: 'sys', loadChildren: () => import('./sysSetting/sysSetting.module').then(mod => mod.SysModule) },
            { path: 'member', loadChildren: () => import('./member/member.module').then(mod => mod.MemberModule) },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false
        }),
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
