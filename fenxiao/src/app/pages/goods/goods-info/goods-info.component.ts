import { GoodsService } from './../../../core/common-services/goods.service';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ImportModalService } from '@app/compontents/widget/import-modal/import-modal.service';
import { UfastUtilService } from '@app/shared/services/ufast-util.service';

enum PageType {
    List,
    Add,
    Edit,
    Detail
}
@Component({
    selector: 'app-goods-info',
    templateUrl: './goods-info.component.html',
    styleUrls: ['./goods-info.component.less']
})
export class GoodsInfoComponent implements OnInit, AfterViewInit {
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
    itemId: number;
    categoryList: any;
    productExportParam: any;
    nzOptions: any[];
    sortBy = '';
    constructor(
        private goodsService: GoodsService,
        private modal: NzModalService,
        private message: NzMessageService,
        private importService: ImportModalService,
        private ufastService: UfastUtilService,
    ) {
        this.filters = { keyword: null, enabled: '1', categoryCode: null, cateList: null, existsPicture: null, brandId: null };
        this.productExportParam = {
            downloadUrl: '/product/productExport', // 导出接口
            reqMethod: 'post', // 请求方式
            fileName: '商品列表', // 导出文件名
            fileParam: this.filters
        };
        this.dataList = [];
        this.currentPage = this.pageType.List;
        this.goodKinds = [];
    }

    changeCateList(value) {
        this.filters.categoryCode = value && value[value.length - 1];
    }

    // 上传模板
    public showUploadModal() {
        const params = {
            templateAPI: 'product/downloadTemplate',
            templateName: '商品导入模板',
            tpMethod: 'get',
            importAPI: '/product/productImport',
            fileTypeList: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        };
        this.importService.show(params).then((data) => {
            const len = this.dataList.length || 0;
            data.forEach((item, index) => {
                item.seqNo = this.ufastService.add((index + 1), len);
                item.reverseTime = item.reverseTime ? new Date(item.reverseTime) : null;
                item.departTime = item.departTime ? new Date(item.departTime) : null;
            });
            this.dataList = this.dataList.concat(data);
            this.getDataList();
        }, () => {
            this.getDataList();
        });
    }

    returnToList(event) {
        this.currentPage = this.pageType.List;
        if (event === 'refresh') {
            this.getDataList();
        }
    }

    addGoods(id?: number) {
        this.itemId = id;
        this.currentPage = this.pageType.Add;
    }

    printTag() { }

    searchByCondition() {
        this.getDataList();
    }

    resetCondition() {
        this.filters = {};
        this.getDataList();
    }

    showGoodsModal(str: string) {
        if (str === 'unit') {
            this.productObj = { list: 'productUomItems', other: 'productUomItem' };
            this.modalTitle = '添加单位';
        } else {
            this.productObj = { list: 'productBrands', other: 'productBrand' };
            this.modalTitle = '添加品牌';
        }
        this.isVisible = true;
    }

    handleOk(): void {
        this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
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

    enableGoodsByIds(num) {
        const arr = [];
        this.dataList.filter(item => {
            return item._checked === true ? arr.push(item.id) : arr;
        });

        if (arr.length === 0) {
            this.message.warning('请先选择商品');
            return;
        }
        this.enableGoods(null, num, arr);
    }

    async enableGoods(id, status, arr?) {
        this.confirmModal = this.modal.confirm({
            nzTitle: `确定${status === 1 ? '启用' : '停用'}当前商品?`,
            nzContent: `${status === 1 ? '启用' : '停用'}后，当前商品将${status === 1 ? '可以' : '不可以'}进行进货与销售`,
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.goodsService.enableGoods({
                        ids: id ? [id] : arr,
                        enabled: status,
                    }).then(res => {
                        if (res.code === 0) {
                            this.message.success(res.message);
                        } else {
                            this.message.error(res.message);
                        }
                        this.getDataList();
                        this.tableConfig.checkAll = false;
                        resolve();
                    });
                }).catch(() => console.log('Oops errors!'))
        });
    }

    async deleteGoods() {
        const arr = [];
        this.dataList.filter(item => {
            return item._checked === true ? arr.push(item.id) : arr;
        });

        if (arr.length < 1) {
            this.message.warning('请先选择商品!');
            return;
        }

        this.modal.confirm({
            nzTitle: '确定删除选中的商品吗?',
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.goodsService.deleteGood(arr).then(res => {
                        if (res.code !== 0) {
                            this.message.error(res.message);
                            return;
                        }
                        this.message.success(res.message);
                        this.tableConfig.checkAll = false;
                        this.getDataList();
                    });
                    resolve();
                }).catch(() => console.log('Oops errors!'))
        });
    }
    sortOrderBy(e) {
        this.sortBy = e.res;
        this.getDataList();
    }

    async getDataList(pageNum?: number) {
        const params = {
            pageSize: this.tableConfig.pageSize,
            pageNum: pageNum || this.tableConfig.pageNum,
            filters: this.filters,
            sort: this.sortBy
        };
        const res = await this.goodsService.getGoodList(params);
        if (res.code !== 0) {
            this.message.error(res.message);
        }
        if (res && res.value && res.value.list) {
            this.dataList = res.value.list;
            this.tableConfig.total = res.value.total;
        }
    }

    async getAllUnitslist(str) {
        const res = await this.goodsService.getAllUnitsList(null, str);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        this.goodKinds = res.value;
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
        this.getAllUnitslist('productBrands');
        this.getAllGoodsList();
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
                { title: '商品名称', width: 100, field: 'name' },
                { title: '规格', width: 80, field: 'specification' },
                { title: '条码', width: 80, field: 'barcode' },
                { title: '分类', width: 80, field: 'categoryName' },
                { title: '单位', width: 80, field: 'uomName' },
                { title: '销售价（￥）', width: 130, field: 'salePrice', sort: true },
                { title: '进货价（￥）', width: 130, field: 'buyPrice', sort: true },
                { title: '毛利率（%）', width: 130, field: 'grossProfit', sort: true },
                { title: '会员价', width: 80, field: 'memberPrice' },
                { title: '状态', width: 80, tdTemplate: this.stateTpl },
                { title: '操作', width: 240, tdTemplate: this.operationTpl },
            ]
        };
        this.getDataList();
    }
}
