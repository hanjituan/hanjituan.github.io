import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRouteModule } from './report.routing';
import { SaleReportComponent } from './sale-report/sale-report.component';
import { IncomeAndExpensesComponent } from './income-and-expenses/income-and-expenses.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from './../../shared/shared.module';
import { DirectivesModule } from '@app/directives/directives.module';
@NgModule({
    imports: [
        CommonModule,
        ReportRouteModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        SharedModule,
        DirectivesModule
    ],
    declarations: [
        SaleReportComponent,
        IncomeAndExpensesComponent
    ]
})
export class ReportModule { }
