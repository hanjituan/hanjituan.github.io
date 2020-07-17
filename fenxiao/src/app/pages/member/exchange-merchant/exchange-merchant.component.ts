import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ImportModalService } from '@app/compontents/widget/import-modal/import-modal.service';
import { UfastUtilService } from '@app/shared/services/ufast-util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExchangeMerchantService } from '@app/core/common-services/member/exchangeMerchant.service';
import { MerchantService } from '@app/core/common-services/merchant.service';

enum PageType {
    List,
    Add,
    Edit,
    Detail
}

@Component({
    selector: 'app-exchange-merchant',
    templateUrl: './exchange-merchant.component.html',
    styleUrls: ['./exchange-merchant.component.less']
})
export class ExchangeMerchantComponent implements OnInit, AfterViewInit {
    @ViewChild('operationTpl', { static: false }) operationTpl: TemplateRef<any>;
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;
    @ViewChild('alreadyExchTpl', { static: false }) alreadyExchTpl: TemplateRef<any>;
    @ViewChild('alreadySettleTpl', { static: false }) alreadySettleTpl: TemplateRef<any>;

    modalTableConfig: UfastTableNs.TableConfig;
    tableConfig: UfastTableNs.TableConfig;
    confirmModal: NzModalRef;
    validateForm: FormGroup;
    pageType = PageType;
    filters: any;
    dataList: any;
    itemObj: any;
    itemId: number;
    modalFilter: any;
    isVisible = false;
    currentPage: number;
    modalDataList: any[];
    memberInfoDetail: any;
    settleVisible: boolean;
    extendConditions = false;
    constructor(
        private fb: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private merchantSer: MerchantService,
        private exMerchantSer: ExchangeMerchantService,
    ) {
        this.filters = {};
        this.dataList = [];
        this.modalFilter = {};
        this.modalDataList = [];
        this.memberInfoDetail = { id: null };
        this.currentPage = this.pageType.List;
    }

    transformNum() {
        this.validateForm.patchValue({
            integration: Number(this.validateForm.value.integration).toFixed(0),
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

    resetCondition(num) {
        this.filters = {};
        this.getDataList(num);
    }

    changePageType(item, pageType) {
        this.currentPage = this.pageType.Detail;
        this.itemObj = Object.assign(item, { pageType });
    }

    settleIntegralModalCancel() {
        this.settleVisible = false;
    }

    openSettleModal(item) {
        this.validateForm.reset();
        this.settleVisible = true;
        this.validateForm.patchValue({
            merchantName: item.mchName,
            mchId: item.mchId,
            unSettleIntergral: item.unSettled,
        });
        this.validateForm.controls.merchantName.disable();
        this.validateForm.controls.mchId.disable();
        this.validateForm.controls.unSettleIntergral.disable();
    }

    settleIntegralModalOk() {
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        if (this.validateForm.invalid) {
            return;
        }
        this.integralSettleFn(this.validateForm.getRawValue());
    }

    async integralSettleFn(params) {
        try {
            const res = await this.exMerchantSer.settleIntegral(params);
            if (res.status !== 0) {
                this.message.error(res.message);
                return;
            }
            this.message.success(res.message);
            this.getDataList();
            this.settleVisible = false;
        } catch (error) {
            console.log(error);
        }
    }

    handleCancel(): void {
        this.isVisible = false;
        this.modalTableConfig.checkAll = false;
        this.modalReset();
    }

    handleAddMerchant() {
        const tempArr = [];
        this.modalDataList.map(item => {
            if (item._checked) {
                tempArr.push({
                    linkMan: item.linkMan1,
                    mchId: item.orgId,
                    mchName: item.companyName
                });
            }
        });

        if (tempArr.length <= 0) {
            this.message.warning('请选择要新增的商户');
            return;
        }
        this.addMerchantFn(tempArr);
    }

    async addMerchantFn(params) {
        try {
            const res = await this.exMerchantSer.addMecharnt(params);
            if (res.status !== 0) {
                this.message.error(res.message);
                return;
            }
            this.message.success(res.message);
            this.isVisible = false;
            this.getDataList();
            this.modalTableConfig.checkAll = false;
        } catch (error) {
            console.log(error);
        }
    }

    checkTableItem(event: UfastTableNs.SelectedChange, list: string, config: string): void {
        if (event.index === -1) {
            this[config].checkAll = event.type === UfastTableNs.SelectedChangeType.Checked;
            this[list].forEach((item: any) => {
                item._checked = event.type === UfastTableNs.SelectedChangeType.Checked;
            });
            return;
        }
        this[list][event.index]._checked = event.type === UfastTableNs.SelectedChangeType.Checked;
        this[config].checkAll = this[list].every((item) => {
            return item._checked;
        });
    }

    updateStateMulty() {
        const tempArr = [];
        this.dataList.map(item => {
            if (item._checked) {
                tempArr.push(item.id);
            }
        });
        if (tempArr.length === 0) {
            this.message.warning('请先选择商户');
            return;
        }
        console.log(tempArr);

        this.updateState(tempArr, 2);
    }

    updateState(id, state) {
        this.confirmModal = this.modal.confirm({
            nzTitle: `提示`,
            nzContent: `${state !== 1 ? '确定该商户开始兑换平台积分？' : ' 结束后活商户将无法兑换平台积分，确定结束？'}  `,
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.exMerchantSer.stateChange({
                        ids: id,
                        state: state !== 1 ? 1 : 2,
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

    async getDataList(pageNum?: number) {
        this.tableConfig.loading = true;
        const params = {
            pageSize: this.tableConfig.pageSize,
            pageNum: pageNum || this.tableConfig.pageNum,
            filters: this.filters,
        };
        const res = await this.exMerchantSer.exchangeMecharntList(params);
        this.tableConfig.loading = false;
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        if (res && res.data && res.data.list) {
            this.dataList = res.data.list;
            this.tableConfig.total = res.data.total;
        }
    }

    openAddMerchantDialog() {
        this.isVisible = true;
        this.modalGetDataList();
    }

    modalReset() {
        this.modalFilter = {};
        this.modalGetDataList();
        this.modalTableConfig.pageSize = 10;
        this.modalTableConfig.pageNum = 1;
    }

    public modalGetDataList(pageNum?) {
        this.modalTableConfig.loading = true;
        this.modalTableConfig.pageNum = pageNum ? pageNum : this.modalTableConfig.pageNum;
        const param = {
            pageNum: this.modalTableConfig.pageNum,
            pageSize: this.modalTableConfig.pageSize,
            filters: this.modalFilter
        };
        this.merchantSer.getMerchantList(param).subscribe((res) => {
            this.modalTableConfig.loading = false;
            this.modalDataList = res.data.list || [];
            this.modalTableConfig.total = res.data.total;
        }, () => { }, () => {
            this.modalTableConfig.loading = false;
        });
    }

    initForm() {
        this.validateForm = this.fb.group({
            merchantName: [null],
            unSettleIntergral: [null],
            mchId: [null],
            integration: [null, [Validators.required]],
            amount: [null, [Validators.required]],
            note: [null]
        });
    }

    ngOnInit() {
        this.initForm();
        this.modalTableConfig = {
            pageSize: 10,
            pageNum: 1,
            showCheckbox: true,
            checkRowField: '_checked',
            showPagination: true,
            checkAll: false,
            total: 0,
            loading: false,
            headers: [
                { title: '商户编号', width: 80, field: 'orgId' },
                { title: '商户名称', width: 100, field: 'companyName', },
                { title: '联系人', width: 80, field: 'linkMan1' },
                { title: '注册手机号', width: 130, field: 'linkManTel1' },
                { title: '账户类型', width: 100, field: 'companyAccountType', pipe: 'merchantType' },
            ]
        };

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
                { title: '商户名称', width: 100, field: 'mchName', },
                { title: '编号', width: 80, field: 'mchId' },
                { title: '联系人', width: 80, field: 'linkMan' },
                { title: '已兑换积分数', width: 80, field: 'alreadyExch', tdTemplate: this.alreadyExchTpl },
                { title: '已结算积分数', width: 80, field: 'alreadySettle', tdTemplate: this.alreadySettleTpl },
                { title: '未结算积分数', width: 130, field: 'unSettled' },
                { title: '状态', width: 60, field: 'state', pipe: 'merchantSettleState' },
                { title: '操作', width: 150, tdTemplate: this.operationTpl },
            ]
        };
        this.getDataList();
    }
}
