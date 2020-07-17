import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { NzMessageService } from 'ng-zorro-antd';
import { MapPipe, MapSet } from '@app/directives/pipe/map.pipe';
import { ExchangeMerchantService } from '@app/core/common-services/member/exchangeMerchant.service';

@Component({
    selector: 'app-exchange-detail',
    templateUrl: './exchange-detail.component.html',
    styleUrls: ['./exchange-detail.component.less']
})

export class ExchangeDetailComponent implements OnInit, AfterViewInit {
    @Output() returnBack = new EventEmitter<any>();
    @Input() itemObj: any;
    @ViewChild('operationTpl', { static: false }) operationTpl: TemplateRef<any>;
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;
    @ViewChild('stateTpl', { static: false }) stateTpl: TemplateRef<any>;
    @ViewChild('memberNoTpl', { static: false }) memberNoTpl: TemplateRef<any>;
    @ViewChild('integraTpl', { static: false }) integraTpl: TemplateRef<any>;
    filters: any;
    tableConfig: UfastTableNs.TableConfig;
    dataList: any;
    integralStateList: any[];
    dateFormat: any;
    productExportParam: {
        downloadUrl: string; // 导出接口
        reqMethod: string; // 请求方式
        fileName: string; // 导出文件名
        fileParam: any;
        downloadServer: string;
    };
    timesRange: any;
    pageType: boolean;
    constructor(
        private message: NzMessageService,
        private exMerchantSer: ExchangeMerchantService,
    ) {
        this.filters = {};
        this.productExportParam = {
            // POST /MemberIntegrationLog/exchListExport 商户兑换明细列表导出
            // /memberMchSettleDtl/export 导出
            downloadUrl: 'memberMchSettleDtl/export', // 导出接口
            reqMethod: 'post', // 请求方式
            fileName: '结算明细列表', // 导出文件名
            fileParam: this.filters,
            downloadServer: 'Bs'
        };
        this.timesRange = [];
    }

    returnToList() {
        this.returnBack.emit();
    }

    getTime(index: number) {
        const y = new Date(this.timesRange[index]).getFullYear();
        const m = new Date(this.timesRange[index]).getMonth() + 1;
        const d = new Date(this.timesRange[index]).getDate();
        return `${y}/${m}/${d}`;
    }

    changeTime() {
        this.filters.start = new Date(`${this.getTime(0)} 00:00:00`);
        this.filters.end = new Date(`${this.getTime(1)} 23:59:59`);
    }

    resetCondition() {
        this.filters = {};
        this.timesRange = null;
        this.filters.mchId = this.itemObj.mchId;
        this.getDataList();
    }

    async getDataList(pageNum?) {
        const params = {
            pageSize: this.tableConfig.pageSize,
            pageNum: pageNum || this.tableConfig.pageNum,
            filters: this.filters,
        };
        this.productExportParam.fileParam = this.filters;
        const Service = this.pageType ? 'getExchList' : 'integralExchangeList';
        const res = await this.exMerchantSer[Service](params);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.dataList = res.data && res.data.list || [];
        this.tableConfig.total = res.data && res.data.total || 0;
    }

    initTime() {
        this.timesRange = [Date.now() - 24 * 60 * 60 * 1000 * 6, Date.now()];
        this.changeTime();
    }

    ngOnInit() {
        this.integralStateList = [...(new MapPipe()).transformMapToArray(MapSet.integralState)];
        this.filters.mchId = this.itemObj.mchId;
        this.pageType = this.itemObj.pageType || false;
        this.initTime();
    }

    ngAfterViewInit() {
        this.tableConfig = {
            pageSize: 10,
            pageNum: 1,
            showCheckbox: true,
            checkRowField: '_checked',
            showPagination: true,
            checkAll: false,
            total: 0,
            loading: false,
            headers: [
                { title: '序号', width: 60, tdTemplate: this.seqNoTpl },
                { title: '结算时间', width: 130, field: 'createTime', pipe: 'date:y-MM-dd HH:mm:ss' },
                { title: '结算积分', width: 80, field: 'integration' },
                { title: '金额', width: 100, field: 'amount' },
                { title: '备注', width: 80, field: 'note' },
            ]
        };
        if (this.pageType) {
            this.tableConfig.headers = [
                { title: '序号', width: 60, tdTemplate: this.seqNoTpl },
                { title: '兑换时间', width: 130, field: 'createTime', pipe: 'date:y-MM-dd HH:mm:ss' },
                { title: '平台会员', width: 80, field: 'memberName' },
                { title: '手机号', width: 100, field: 'phone' },
                { title: '兑换积分', width: 80, field: 'integration' },
                { title: '备注', width: 80, field: 'note' },
            ];
            this.productExportParam.downloadUrl = 'MemberIntegrationLog/exchListExport';
            this.productExportParam.fileName = '商户兑换明细列表';
        }
        this.getDataList();
    }

}
