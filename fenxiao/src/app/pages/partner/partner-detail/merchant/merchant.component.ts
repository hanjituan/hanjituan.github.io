import { Component, OnInit, Output, ViewChild, TemplateRef, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MapPipe, MapSet } from '../../../../directives/pipe/map.pipe';
import { MarketService } from '@app/core/common-services/partner/market.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'app-merchant',
    templateUrl: './merchant.component.html',
    styleUrls: ['./merchant.component.less']
})
export class MerchantComponent implements OnInit, AfterViewInit {
    @Input() id: any;
    @Output() returnBack = new EventEmitter<any>();
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;
    @ViewChild('opTpl', { static: false }) opTpl: TemplateRef<any>;
    @ViewChild('stateTpl', { static: false }) stateTpl: TemplateRef<any>;
    tableConfig: UfastTableNs.TableConfig;
    choosedTableConfig: UfastTableNs.TableConfig;
    listId: any;
    filters: any;
    dataList: any;
    dateFormat: any;
    pageType: string;
    isVisible = false;
    timesRange: any[];
    choosedDataList: any;
    asyncStateList: any[];
    contractStateList: any[];
    extendConditions: boolean;
    settleFilters: { companyName: any; };
    productExportParam: {
        downloadUrl: string; // 导出接口
        reqMethod: string; // 请求方式
        fileName: string; // 导出文件名
        fileParam: any; downloadServer: string;
    };
    constructor(
        private modal: NzModalService,
        private marketSer: MarketService,
        private message: NzMessageService,
    ) {
        this.filters = {};
        this.pageType = 'list';
        this.extendConditions = false;
        this.settleFilters = { companyName: null };
        this.productExportParam = {
            downloadUrl: '/inventory/export', // 导出接口
            reqMethod: 'get', // 请求方式
            fileName: '库存查询列表', // 导出文件名
            fileParam: this.filters,
            downloadServer: 'Business'
        };
    }


    resetConditionsForAll() {
        this.settleFilters.companyName = null;
        this.getAllMerchantList();
    }

    async handleOk() {
        const orgIds = [];
        this.choosedDataList.filter(item => {
            return item._checked === true ? orgIds.push(item.orgId) : orgIds;
        });

        if (orgIds.length < 1) { this.message.warning('请先选择商户!'); return; }

        const params = { marketId: this.id, orgIds, };

        const res = await this.marketSer.addSettledMerchant(params);

        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.isVisible = false;
        this.getDataList();
        this.message.success(res.message);
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    backToList() {
        this.pageType = 'list';
    }

    addMerchant() {
        this.isVisible = true;
        this.getAllMerchantList();
    }

    async getAllMerchantList() {
        this.choosedTableConfig.loading = true;
        const res = await this.marketSer.allMerchantList({
            filters: { companyName: this.settleFilters.companyName },
            pageNum: 0,
            pageSize: 0
        });
        this.choosedTableConfig.loading = false;
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.choosedDataList = res.data.list;
        this.choosedTableConfig.checkAll = false;
    }

    checkTableItem(event: UfastTableNs.SelectedChange, val?: string): void {
        const tempObj = val ? this.choosedTableConfig : this.tableConfig;
        const tempArr = val ? this.choosedDataList : this.dataList;
        if (event.index === -1) {
            tempObj.checkAll = event.type === UfastTableNs.SelectedChangeType.Checked;
            tempArr.forEach((item: any) => {
                item._checked = event.type === UfastTableNs.SelectedChangeType.Checked;
            });
            return;
        }
        tempArr[event.index]._checked = event.type === UfastTableNs.SelectedChangeType.Checked;
        tempObj.checkAll = tempArr.every((item) => {
            return item._checked;
        });
    }

    returnToList(val?) {
        this.returnBack.emit(val || null);
    }

    createMessage(type: string, val: string): void {
        this.message.create(type, val);
    }

    async deleteMerchant(item) {
        const res = await this.marketSer.settleMerchantDel(item.orgId);
        this.createMessage(res.status === 0 ? 'success' : 'error', res.message);
        if (res.status === 0) {
            this.getDataList();
        }
    }

    async asyncMerchant(item, val?) {
        const params = val === 'all' ? item : [item.orgId];
        const res = await this.marketSer.settleMerchantAsync(params);
        this.createMessage(res.status === 0 ? 'success' : 'error', res.message);
        if (res.status === 0) {
            this.getDataList();
        }
    }
    asyncBatch() {
        const arr = [];
        this.dataList.filter(item => {
            return item._checked === true ? arr.push(item.orgId) : arr;
        });

        if (arr.length < 1) {
            this.message.warning('请先选择商户!');
            return;
        }

        this.modal.confirm({
            nzTitle: '确定批量同步选中的商户吗?',
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.asyncMerchant(arr, 'all');
                    resolve();
                }).catch(() =>
                    console.log('Oops errors!')
                )
        });
    }

    infoSetting(item) {
        this.pageType = 'add';
        this.listId = item.orgId;
    }

    async getDataList(pageNum?: number) {
        this.tableConfig.loading = true;
        const params = {
            pageSize: this.tableConfig.pageSize,
            pageNum: pageNum || this.tableConfig.pageNum,
            filters: this.filters
        };
        const res = await this.marketSer.settleMerchantList(params);
        this.tableConfig.loading = false;
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.dataList = res.data.list;
        this.tableConfig.checkAll = false;
        this.tableConfig.total = res.data.total;
    }

    resetCondition() {
        this.filters = {};
        this.filters.marketId = this.id;
        this.getDataList();
        this.timesRange = [];
    }

    ngOnInit() {
        this.filters.marketId = this.id;
        this.asyncStateList = [...(new MapPipe()).transformMapToArray(MapSet.asyncState)];
        this.contractStateList = [...(new MapPipe()).transformMapToArray(MapSet.contractState)];
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
            loading: true,
            headers: [
                { title: '序号', width: 40, tdTemplate: this.seqNoTpl },
                { title: '商户编号', width: 100, field: 'orgId' },
                { title: '商户名称', width: 130, field: 'companyName' },
                { title: '联系人', width: 100, field: 'linkMan1' },
                { title: '注册手机号', width: 80, field: 'linkManTel1' },
                { title: '账户类型', width: 80, field: 'companyAccountType', pipe: 'AccountType' },
                { title: '商户状态', width: 130, field: 'isLock', tdTemplate: this.stateTpl },
                { title: '同步状态', width: 130, field: 'synchroState', pipe: 'asyncState' },
                { title: '操作', width: 230, tdTemplate: this.opTpl },
            ]
        };

        this.choosedTableConfig = {
            pageSize: 10,
            pageNum: 1,
            showCheckbox: true,
            checkRowField: '_checked',
            showPagination: true,
            checkAll: false,
            total: 0,
            loading: false,
            headers: [
                { title: '序号', width: 40, tdTemplate: this.seqNoTpl },
                { title: '商户编号', width: 100, field: 'orgId' },
                { title: '商户名称', width: 130, field: 'companyName' },
                { title: '联系人', width: 100, field: 'linkMan1' },
                { title: '注册手机号', width: 80, field: 'linkManTel1' },
                { title: '账户类型', width: 80, field: 'companyAccountType', pipe: 'AccountType' },
            ]
        };
        this.getDataList();
    }
}
