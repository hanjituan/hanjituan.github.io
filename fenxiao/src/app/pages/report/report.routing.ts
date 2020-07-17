
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SaleReportComponent } from './sale-report/sale-report.component';
import { IncomeAndExpensesComponent } from './income-and-expenses/income-and-expenses.component';
const routes: Routes = [
    { path: 'salesReport', component: SaleReportComponent },
    { path: 'incomeAndExpenses', component: IncomeAndExpensesComponent}
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ReportRouteModule {}
