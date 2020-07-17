import { Component, OnInit, Output, ViewChild, TemplateRef, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd';
import { StockService } from '@app/core/common-services/dataAnalysis/stock.service';
import { OrganizService } from '@app/core/common-services/sysSetting/organiz.service';


@Component({
    selector: 'app-stockMerchant',
    templateUrl: './stockMerchant.component.html',
    styleUrls: ['./stockMerchant.component.less']
})

export class StockMerchantComponent implements OnInit, AfterViewInit {
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;
    @ViewChild('opTpl', { static: false }) opTpl: TemplateRef<any>;
    @ViewChild('stateTpl', { static: false }) stateTpl: TemplateRef<any>;
    tableConfig: UfastTableNs.TableConfig;
    choosedTableConfig: UfastTableNs.TableConfig;
    filters: any;
    dataList: any;
    changeValue: (value: any) => {};
    settleFilters: { companyName: any; };
    productExportParam: {
        downloadUrl: string; // 导出接口
        reqMethod: string; // 请求方式
        fileName: string; // 导出文件名
        fileParam: any; downloadServer: string;
    };
    tbInfoObj = { totalNum: 0 };
    searchParams = {
        pageNum: 1,
        pageSize: 10,
        filters: { beginTime: null, endTime: null, keyword: '', categoryCode: '', cateList: [] },
    };
    activeTab: string;
    curOrgValue: string[];
    currentArr: any;
    constructor(
        private modal: NzModalService,
        private message: NzMessageService,
        private stockSer: StockService,
        private orgSer: OrganizService,
    ) {
        this.filters = { dimension: '2' };
        this.productExportParam = {
            downloadUrl: '/reportStaticXdesMch/exportSaleManCompanyStatisList', // 导出接口
            reqMethod: 'post', // 请求方式
            fileName: '存量商户信息统计列表', // 导出文件名
            fileParam: this.filters,
            downloadServer: 'Bs'
        };
        this.activeTab = '1';
    }

    public loadData(node: any, index: number): PromiseLike<any> {
        return new Promise(async (resolve) => {
            const pid = index < 0 ? 0 : node.id;
            this.getOrgList(pid).then((res) => {
                node.children = res || [];
                resolve();
            });
        });
    }

    public getOrgList(pid) {
        return this.orgSer.deptChildrenList({ pId: pid }).then((res) => {
            res.data.forEach((item) => {
                item.isLeaf = !!item.leaf;
                item.value = item.code;
                item.label = item.name;
            });
            return res.data;
        });
    }

    public dataChange(value) {
        console.log(value);
    }

    public optionChange(event) {
        this.currentArr = event;
    }

    switchTab(val) {
        this.activeTab = val;
        this.resetCondition();
    }

    getTbData(val?) {
        this.searchParams.pageNum = 1;
        setTimeout(() => {
            this.getDataList(val);
        });
    }

    async getDataList(pageNum?: number) {
        this.tableConfig.loading = true;
        const filters: any = {};
        if (this.activeTab === '1') {
            if (this.curOrgValue && this.curOrgValue.length) {
                filters.deptCode = this.curOrgValue[this.curOrgValue.length - 1];
            }
            filters.dimension = this.filters.dimension;
            this.productExportParam.fileName = '存量商户信息统计列表(按机构)';
        } else {
            if (this.currentArr && this.currentArr.length) {
                filters.deptId = this.currentArr[this.currentArr.length - 1].id;
            }
            filters.saleManSearchStr = this.filters.saleManSearchStr;
            this.productExportParam.fileName = '存量商户信息统计列表(按员工)';
        }
        this.productExportParam.fileParam = filters;


        const params = {
            pageSize: this.searchParams.pageSize,
            pageNum: pageNum || this.searchParams.pageNum,
            filters,
        };
        const res = await this.stockSer.getList(params);
        this.tableConfig.loading = false;
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        setTimeout(() => {
            this.dataList = res.data.list;
            this.tbInfoObj.totalNum = res.data.total;
        });
    }

    resetCondition() {
        this.filters = {};
        this.curOrgValue = null;
        this.currentArr = [];
        this.filters.dimension = '2';
        this.getTbData(1);
    }

    ngOnInit() { }

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
        this.getDataList();
    }
}
