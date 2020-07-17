import { async } from '@angular/core/testing';
import { logging } from 'protractor';
import { GoodsService } from './../../../core/common-services/goods.service';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ImportModalService } from '@app/compontents/widget/import-modal/import-modal.service';
import { UfastUtilService } from '@app/shared/services/ufast-util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from '@app/core/common-services/member/member.service';

enum PageType {
    List,
    Add,
    Edit,
    Detail
}

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.less']
})
export class MemberComponent implements OnInit, AfterViewInit {
    @ViewChild('operationTpl', { static: false }) operationTpl: TemplateRef<any>;
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;
    @ViewChild('stateTpl', { static: false }) stateTpl: TemplateRef<any>;
    @ViewChild('memberNoTpl', { static: false }) memberNoTpl: TemplateRef<any>;
    @ViewChild('integraTpl', { static: false }) integraTpl: TemplateRef<any>;

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
    validateForm: FormGroup;
    memberDetailVisible: boolean;
    memberInfoDetail: any;
    itemObj: any;
    constructor(
        private fb: FormBuilder,
        private memberSer: MemberService,
        private modal: NzModalService,
        private message: NzMessageService,
        private importService: ImportModalService,
        private ufastService: UfastUtilService,
    ) {
        this.filters = { keyword: null, enabled: '1', categoryCode: null, cateList: null, existsPicture: null, brandId: null };
        this.productExportParam = {
            downloadUrl: '/Member/export', // 导出接口
            reqMethod: 'post', // 请求方式
            fileName: '会员列表', // 导出文件名
            fileParam: this.filters,
            downloadServer: 'Bs'
        };
        this.dataList = [];
        this.currentPage = this.pageType.List;
        this.goodKinds = [];
        this.memberInfoDetail = {
            id: null
        };
    }

    transformNum() {
        this.validateForm.patchValue({
            cutIntegral: this.validateForm.value.cutIntegral.toFixed(0),
        });
    }

    changeCateList(value) {
        this.filters.categoryCode = value && value[value.length - 1];
    }

    // 上传模板
    public showUploadModal() {
        const params = {
            templateAPI: 'product/downloadTemplate',
            templateName: '会员导入模板',
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


    searchByCondition() {
        this.getDataList();
    }

    resetCondition() {
        this.filters = {};
        this.getDataList();
    }

    openDialog(item) {
        this.memberDetailVisible = true;
        this.getDetail(item.id);
    }

    changePageType(item) {
        this.currentPage = this.pageType.Add;
        this.itemObj = item;
    }

    async getDetail(id) {
        const res = await this.memberSer.getMemberDetail(id);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        this.memberInfoDetail = res.data;

    }

    memberDetailModalCancel() {
        this.memberDetailVisible = false;
    }

    memberDetailModalhandleOk() {
        this.memberDetailVisible = false;
    }


    bonusPoints(bol: boolean) {
        const arr = [];
        this.dataList.filter(item => {
            return item._checked === true ? arr.push(item) : arr;
        });

        if (arr.length < 1) {
            this.message.warning('请先选择会员!');
            return;
        }
        if (arr.length > 1) {
            this.message.warning('只能选择单个会员进行操作!');
            return;
        }
        this.itemObj = arr[0];
        this.validateForm.reset();
        this.validateForm.patchValue({
            name: arr[0].nickname,
            integral: arr[0].integration,
        });
        this.validateForm.controls.name.disable();
        this.validateForm.controls.integral.disable();
        this.modalTitle = bol ? '赠送积分' : '扣减积分';
        this.isVisible = true;
    }

    handleOk(): void {
        this.submitForm();
    }

    submitForm() {
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        if (this.validateForm.invalid) {
            return;
        }
        const params: any = {
            currentIntegration: this.validateForm.getRawValue().integral,
            integration: this.validateForm.getRawValue().cutIntegral,
            memberId: this.itemObj.id,
            note: this.validateForm.getRawValue().note
        };

        this.integralChangeFn(params);
    }


    async integralChangeFn(params) {
        const service = this.modalTitle === '赠送积分' ? 'integralAdd' : 'integralReduce';
        const res: any = await this.memberSer[service](params);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        this.message.success(res.message);
        this.getDataList();
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
            this.message.warning('请先选择会员');
            return;
        }
        this.enableGoods(null, num, arr);
    }

    async enableGoods(id, status, arr?) {
        this.confirmModal = this.modal.confirm({
            nzTitle: `确定${!!status ? '解锁' : '锁定'}当前会员?`,
            nzContent: `${!!status ? '解锁' : '锁定'}后，当前会员将${!!status ? '可以' : '不可以'} 以会员身份消费`,
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.memberSer.memberChangeState({
                        memberIds: id ? [id] : arr,
                        state: !status,
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

    async isLock(status) {
        const arr = [];
        this.dataList.filter(item => {
            return item._checked === true ? arr.push(item.id) : arr;
        });

        if (arr.length < 1) {
            this.message.warning('请先选择会员!');
            return;
        }
        this.enableGoods(null, status, arr);
    }

    sortOrderBy(e) {
        console.log(e);

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
        const res = await this.memberSer.memberList(params);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        if (res && res.data && res.data.list) {
            this.dataList = res.data.list;
            this.tableConfig.total = res.data.total;
        }
    }

    initForm() {
        this.validateForm = this.fb.group({
            name: [null],
            integral: [null],
            cutIntegral: [null, [Validators.required]],
            note: [null]
        });
    }

    ngOnInit() {
        this.initForm();
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
                { title: '平台会员号', width: 100, field: 'memberNo', tdTemplate: this.memberNoTpl },
                { title: '姓名', width: 80, field: 'nickname' },
                { title: '手机号', width: 80, field: 'phone' },
                { title: '交易金额', width: 80, field: 'amount' },
                { title: '积分', width: 80, field: 'integration', sort: true, tdTemplate: this.integraTpl },
                { title: '注册时间', width: 130, field: 'createTime', sort: true, pipe: 'date:y-MM-dd HH:mm:ss' },
                { title: '状态', width: 80, field: 'state', tdTemplate: this.stateTpl },
                { title: '操作', width: 80, tdTemplate: this.operationTpl },
            ]
        };
        this.getDataList();
    }
}
