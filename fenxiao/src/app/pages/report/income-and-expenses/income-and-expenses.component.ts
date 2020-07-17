
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReportService, ReportServiceNs } from './../../../core/common-services/report.service';
import { ImportModalService } from '@app/compontents/widget/import-modal/import-modal.service';

@Component({
    selector: 'app-income-and-expenses',
    templateUrl: './income-and-expenses.component.html',
    styleUrls: ['./income-and-expenses.component.less']
})
export class IncomeAndExpensesComponent implements OnInit, AfterViewInit {
    dataList: ReportServiceNs.IncomeAndExpendModel[];

    filters: any;

    productExportParam: {
        downloadUrl: string; // 导出接口
        reqMethod: string; // 请求方式
        fileName: string; // 导出文件名
        fileParam: any; downloadServer: string;
    };

    constructor(private reportSer: ReportService, private importService: ImportModalService, ) {
        this.filters = {
            // startDate: null,
            // endDate: null,
            beginTime: null,
            endTime: null,
        }

        this.dataList = [];
        this.productExportParam = {
            // business/report/exportIncomeAndExpendStatistics 账户收支统计导出
            downloadUrl: 'report/exportIncomeAndExpendStatistics', // 导出接口
            reqMethod: 'post', // 请求方式
            fileName: '账户收支统计列表', // 导出文件名
            fileParam: this.filters,
            downloadServer: 'Business'
        };
    }

    resetFilters() {
        this.filters.beginTime = null;
        this.filters.endTime = null;
        this.getDataList();
    }

    async getDataList() {
        const res = await this.reportSer.getReportList(this.filters);
        this.dataList = res.value.itemList;
    }

    ngOnInit() {
        setTimeout(() => {
            this.getDataList();
        }, 0);
    }

    ngAfterViewInit(): void { }
}
