import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { UserService } from './../../../core/common-services/user.service';
import { SaleService } from './../../../core/common-services/sale.service';
import { GoodsService } from './../../../core/common-services/goods.service';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UfastUtilService } from '@app/shared/services/ufast-util.service';
import { ImportModalService } from '@app/compontents/widget/import-modal/import-modal.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { DatabaseService } from '@app/core/common-services/database.service';

enum PageType {
    List,
    Add,
    Edit,
    Detail
}

@Component({
    selector: 'app-saleOrder',
    templateUrl: './saleOrder.component.html',
    styleUrls: ['./saleOrder.component.less']
})
export class SaleOrderComponent implements OnInit, AfterViewInit {
    @ViewChild('operationTpl', { static: false }) operationTpl: TemplateRef<any>;
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;
    @ViewChild('stateTpl', { static: false }) stateTpl: TemplateRef<any>;
    tableConfig: UfastTableNs.TableConfig;
    confirmModal: NzModalRef;
    filters: any;
    dataList: any;
    extendConditions = false;
    pageType = PageType;
    currentPage: number;
    isVisible = false;
    modalTitle = '';
    goodKinds: any;
    productObj: any;
    itemObj: number;
    goodList: any;
    selectedItemList: string[];
    selectedItemStatus: string[];
    productExportParam: any;
    personList: any;
    timesRange: any;
    dateFormat: any;
    sort: any;
    constructor(
        private goodsService: GoodsService,
        private userService: UserService,
        private message: NzMessageService,
        private importService: ImportModalService,
        private ufastService: UfastUtilService,
        private saleSer: SaleService,
        private databaseService: DatabaseService,
    ) {
        this.filters = {};
        this.productExportParam = {
            downloadUrl: 'inventorySaleOut/export', // 导出接口
            reqMethod: 'post', // 请求方式
            fileName: '销售单据', // 导出文件名
            fileParam: this.filters,
            downloadServer: 'Business'
        };
        this.dataList = [];
        this.currentPage = this.pageType.List;
        this.goodKinds = [];
        this.selectedItemList = [];
        this.selectedItemStatus = [];
    }

    handleCancel() {

    }

    handleOk() {

    }

    showUploadModal() {

    }

    listByOrder(value) {
        if (value.value === 'ascend') {
            this.sort = value.key;
        } else {
            this.sort = value.key + ' desc';
        }
        this.getDataList();
    }
    goAdd() {
        this.currentPage = this.pageType.Add;
    }

    checkDetail(item) {
        this.currentPage = this.pageType.Add;
        this.itemObj = item;
    }

    resetCondition() {
        this.filters = {};
        this.getDataList();
        this.timesRange = [];
    }

    getTime(index) {
        const y = new Date(this.timesRange[index]).getFullYear();
        const m = new Date(this.timesRange[index]).getMonth() + 1;
        const d = new Date(this.timesRange[index]).getDate();
        return `${y}/${m}/${d}`;
    }

    changeTime() {
        let index = 0;
        this.filters.beginCreateTime = new Date(`${this.getTime(index)} 00:00:00`);
        index += 1;
        this.filters.endCreateTime = new Date(`${this.getTime(index)} 23:59:59`);
        index = 0;
    }

    returnToList(event) {
        this.currentPage = this.pageType.List;
        if (event === 'refresh') {
            this.getDataList();
        }
    }

    checkTableItem(event: UfastTableNs.SelectedChange): void {
        if (event.index === -1) {
            this.tableConfig.checkAll = event.type === UfastTableNs.SelectedChangeType.Checked;
            this.dataList.forEach((item: any) => {
                item['_checked'] = event.type === UfastTableNs.SelectedChangeType.Checked;
            });
            return;
        }
        this.dataList[event.index]['_checked'] = event.type === UfastTableNs.SelectedChangeType.Checked;
        this.tableConfig.checkAll = this.dataList.every((item) => {
            return item['_checked'];
        });
    }

    async getDataList(pageNum?: number) {
        const params = {
            pageSize: this.tableConfig.pageSize,
            pageNum: pageNum || this.tableConfig.pageNum,
            filters: this.filters,
            sort: this.sort
        };
        const res = await this.saleSer.getSaleList(params);
        if (res.status !== 0) {
            this.message.error(res.message);
        }
        if (res && res.data) {
            this.dataList = [...res.data.list, ...res.data.list, ...res.data.list];
            this.tableConfig.total = res.data.total;
        }
    }

    async getEmList() {
        const params = {
            pageSize: 10,
            pageNum: 1,
            filters: this.filters,
        };
        const res = await this.databaseService.getEmployeeList(params);
        this.personList = res.value.list;
    }

    ngOnInit() {
        // this.getEmList();
    }

    ngAfterViewInit() {
        this.tableConfig = {
            pageSize: 10,
            pageNum: 1,
            showCheckbox: false,
            checkRowField: '_checked',
            showPagination: true,
            checkAll: false,
            total: 0,
            loading: false,
            headers: [
                { title: '序号', width: 60, tdTemplate: this.seqNoTpl },
                { title: '单据编号', width: 100, tdTemplate: this.operationTpl },
                { title: '创建时间', width: 150, field: 'createTime', sort: true },
                { title: '单据类型', width: 100, field: 'billTypeName' },
                { title: '收银员', width: 80, field: 'creatorName' },
                { title: '会员', width: 80, field: 'memberName' },
                { title: '商品数量', width: 130, field: 'totalQty' },
                { title: '总金额（￥）', width: 130, field: 'totalValue', sort: true },
                { title: '实收金额', width: 150, field: 'totalPresentValue', sort: true },
                { title: '总优惠', width: 100, field: 'totalDiscountValue', sort: true },
                { title: '利润', width: 80, field: 'totalProfitValue', sort: true },
                { title: '状态', width: 80, field: 'state', pipe: 'saleState' },
            ]
        };
        this.getDataList();
    }

}
