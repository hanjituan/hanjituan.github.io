import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { UserService } from './../../../core/common-services/user.service';
import { GoodsService } from './../../../core/common-services/goods.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UfastUtilService } from '@app/shared/services/ufast-util.service';
import { ImportModalService } from '@app/compontents/widget/import-modal/import-modal.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { DatabaseService } from '@app/core/common-services/database.service';
import { MarketService } from '@app/core/common-services/partner/market.service';
import { environment } from '@env/environment';

enum PageType {
    List,
    Add,
    Edit,
    Detail,
    Merchant,
    Pos,
}

@Component({
    selector: 'app-partner-detail',
    templateUrl: './partner-detail.component.html',
    styleUrls: ['./partner-detail.component.less']
})
export class PartnerDetailComponent implements OnInit {

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
    itemId: any;
    constructor(
        private goodsService: GoodsService,
        private userService: UserService,
        private message: NzMessageService,
        private importService: ImportModalService,
        private ufastService: UfastUtilService,
        private marketSer: MarketService,
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
        this.tableConfig = {
            pageSize: 0,
            pageNum: 0,
            showCheckbox: false,
            checkRowField: '_checked',
            showPagination: true,
            checkAll: false,
            total: 0,
            loading: false,
            headers: []
        };
    }

    createMessage(type: string, val: string): void {
        this.message.create(type, val);
    }

    async isLockCom(item) {
        const params = {
            id: item.id,
            isLock: !item.enabled
        };
        const res = await this.marketSer.marLock(params);
        this.createMessage(res.status === 0 ? 'success' : 'error', res.message);
        this.getDataList();
    }

    edit(item, val?) {
        this.itemId = item.id;
        this.currentPage = val ? this.pageType.Pos : this.pageType.Add;
    }

    goAdd() {
        this.itemId = null;
        this.currentPage = this.pageType.Add;
    }

    goMerchant(item) {
        this.itemId = item.id;
        this.currentPage = this.pageType.Merchant;
    }

    checkDetail(item) {
        this.currentPage = this.pageType.Add;
        this.itemObj = item;
    }

    returnToList(event) {
        this.currentPage = this.pageType.List;
        if (event === 'refresh') {
            this.getDataList();
        }
    }

    async getDataList(pageNum?: number) {
        const params = {
            pageSize: this.tableConfig.pageSize,
            pageNum: pageNum || this.tableConfig.pageNum,
            filters: this.filters,
            sort: this.sort
        };
        const res = await this.marketSer.marketList(params);
        if (res.status !== 0) {
            this.message.error(res.message);
        }
        if (res && res.data) {

            res.data.list.map(item => {
                item.logoUrl = `${environment.baseUrl.bs}file/read?fileId=${item.logoUrl}`;
            });
            this.dataList = res.data.list;
            this.tableConfig.total = res.data.total;
        }
    }

    ngOnInit() {
        this.getDataList();
    }
}
