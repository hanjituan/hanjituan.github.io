import { Component, OnInit } from '@angular/core';
import { MerhcantActivityModel } from '@app/core/models/dataAnalysis';
import { ActivenessService } from '@app/core/common-services/dataAnalysis/activeness.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-activenessData',
    templateUrl: './activenessData.component.html',
    styleUrls: ['./activenessData.component.less']
})
export class ActivenessDataComponent implements OnInit {
    filters = {
        beginDate: null,
        endDate: null,
        dateType: 10,
        saleManName: '',
        activeStandard: null,
        activeDays: null,
        billDateType: 1,
        dataType: 1,
        date: null,
        firstMonthOfQuarter: null,
        deptName: ''
    };
    merchantList: MerhcantActivityModel[];
    tbDataObj = { total: 0, pageSize: 10, pageNum: 1 };
    extendConditions = false;
    sort: any;
    productExportParam: {
        downloadUrl: string; // 导出接口
        reqMethod: string; // 请求方式
        fileName: string; // 导出文件名
        fileParam: any;
        downloadServer: string;
    };
    constructor(
        private acSer: ActivenessService,
        private message: NzMessageService,
    ) {
        this.productExportParam = {
            downloadUrl: '/reportStaticXdesBill/exportMerchantBillActivityList', // 导出接口
            reqMethod: 'post', // 请求方式
            fileName: '商户活跃度列表', // 导出文件名
            fileParam: this.filters,
            downloadServer: 'Bs'
        };
    }

    pageChange(value) {
        this.tbDataObj.pageNum = value;
        this.searchData();
    }

    pageSizeChange(value) {
        this.tbDataObj.pageSize = value;
        this.searchData();
    }

    resetForm() {
        this.filters = {
            beginDate: null,
            endDate: null,
            dateType: 10,
            saleManName: '',
            activeStandard: null,
            activeDays: null,
            billDateType: 1,
            dataType: 1,
            date: null,
            firstMonthOfQuarter: null,
            deptName: ''
        };
        this.searchData();
    }

    changeType() {
        this.filters.billDateType === 1 ? this.filters.billDateType = 2 : this.filters.billDateType = 1;
    }

    async searchData() {
        if (this.filters.dateType === 10) { // 日
            this.filters.dataType = 1;
        }
        if (this.filters.dateType === 30) { // 月
            this.filters.dataType = 2;
            this.filters.date = +new Date(new Date().getFullYear(), this.filters.beginDate - 1, 1);
        }
        if (this.filters.dateType > 40 && this.filters.dateType < 50) { // 季
            this.filters.dataType = 3;
            this.filters.date = +new Date();
            if (this.filters.dateType === 41) {
                this.filters.firstMonthOfQuarter = 1;
            }
            if (this.filters.dateType === 42) {
                this.filters.firstMonthOfQuarter = 4;
            }
            if (this.filters.dateType === 43) {
                this.filters.firstMonthOfQuarter = 7;
            }
            if (this.filters.dateType === 44) {
                this.filters.firstMonthOfQuarter = 10;
            }
        }
        if (this.filters.dateType === 51) { // 年
            this.filters.dataType = 4;
            this.filters.date = +new Date(this.filters.beginDate, 0, 1);
        }
        const params = {
            pageNum: this.tbDataObj.pageNum,
            pageSize: this.tbDataObj.pageSize,
            filters: this.filters,
            sort: this.sort
        };
        this.productExportParam.fileParam = this.filters;
        const res = await this.acSer.getActiveList(params);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        this.merchantList = res.data.list;
        this.tbDataObj.total = res.data.total;
    }

    getMerchantList() {

    }

    currentPageDataChange() {

    }

    ngOnInit() {
        setTimeout(() => {
            this.searchData();
        }, 0);
    }

}
