import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysRoutes } from './sysSetting.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WidgetModule } from '@app/compontents/widget/widget.module';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { SupplierInformationComponent } from './supplier-information/supplier-information.component';
import { RoleAuthComponent } from './role-auth/role-auth.component';
import { JobAuthorityAddComponent } from './role-auth/job-authority-add/job-authority-add.component';
import { OrganizInfomationComponent } from './organiz-infomation/organiz-infomation.component';
import { DirectivesModule } from '@app/directives/directives.module';


@NgModule({
    imports: [
        CommonModule,
        SysRoutes,
        NgZorroAntdModule,
        NzIconModule,
        WidgetModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        DirectivesModule,
    ],
    declarations: [
        EmployeeInformationComponent,
        SupplierInformationComponent,
        RoleAuthComponent,
        JobAuthorityAddComponent,
        OrganizInfomationComponent,
    ]
})
export class SysModule { }
