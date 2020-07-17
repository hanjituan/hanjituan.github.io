import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReportService, ReportServiceNs } from '@app/core/common-services/report.service';
import { GoodsService } from '@app/core/common-services/goods.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ExportParamModel } from './../../../core/models/common-model';
@Component({
    selector: 'app-sale-report',
    templateUrl: './sale-report.component.html',
    styleUrls: ['./sale-report.component.less']
})
export class SaleReportComponent implements OnInit, AfterViewInit {
    dataList: ReportServiceNs.SaleReportModel[];
    exportParam: ExportParamModel;

    totalInfo = {};
    categoryList = [];
    subTotalInfo: {
        saleQty?: string | number;
        saleAmount?: string | number;
        saleCostAmount?: string | number;
        saleProfit?: string | number;
        saleProfitRate?: string | number;
        saleReturnQty?: string | number;
        saleReturnAmount?: string | number;
    };
    endDate: Date | null = null;
    startDate: Date | null = null;
    extendConditions: boolean;
    tbInfoObj = {
        totalNum: 0
    };
    searchParams = {
        pageNum: 1,
        pageSize: 10,
        filters: { beginTime: null, endTime: null, keyword: '', categoryCode: '', cateList: [] },
    };

    constructor(
        private reportSer: ReportService,
        private goodsService: GoodsService,
        private message: NzMessageService,
    ) {
        this.dataList = [];
        this.extendConditions = false;
        this.exportParam = {
            reqMethod: 'post',
            fileName: '销售报表',
            downloadServer: 'Business',
            fileParam: this.searchParams.filters,
            downloadUrl: 'report/exportSaleReportByProduct',
        };
    }

    resetFilters() {
        this.searchParams.filters.beginTime = null;
        this.searchParams.filters.endTime = null;
        this.searchParams.filters.categoryCode = null;
        this.searchParams.filters.cateList = null;
        this.searchParams.filters.keyword = null;
        this.endDate = null;
        this.searchData();
    }

    getTbData() {
        setTimeout(() => {
            this.getDataList();
        });
    }

    searchData() {
        this.searchParams.pageNum = 1;
        this.getTbData();
    }

    async getDataList() {
        const res: any = await this.reportSer.getSaleReportList(this.searchParams);
        this.dataList = res.value.pageInfo.list || [];
        setTimeout(() => {
            this.tbInfoObj.totalNum = res.value.pageInfo.total;
            this.subTotalInfo = res.value.subTotal;
            this.totalInfo = res.value.total;
        });
    }

    changeCateList(value) {
        this.searchParams.filters.categoryCode = value && value[value.length - 1];
    }

    async getAllGoodsList() {
        const res = await this.goodsService.getAllGoodsList(null);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        res.value.map(item => {
            item.label = item.name;
            item.value = item.code;
            if (item.sonCategoryList.length === 0) {
                item.isLeaf = true;
            } else {
                item.sonCategoryList.map(el => {
                    el.label = el.name;
                    el.value = el.code;
                    if (el.sonCategoryList.length === 0) {
                        el.isLeaf = true;
                    } else {
                        el.sonCategoryList.map(th => {
                            th.label = th.name;
                            th.value = th.code;
                            th.isLeaf = true;
                        });
                        el.children = el.sonCategoryList;
                    }
                });
                item.children = item.sonCategoryList;
            }
        });
        this.categoryList = res.value;
    }
    ngOnInit() {
        this.getAllGoodsList();
    }

    ngAfterViewInit(): void {
        this.getDataList();
    }

}
