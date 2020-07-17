import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerDetailComponent } from './partner-detail/partner-detail.component';
const routes: Routes = [
    { path: 'marketDetail', component: PartnerDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PartnerRoutingModule { }
