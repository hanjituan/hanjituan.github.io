import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { DatabaseService } from '@app/core/common-services/database.service';

@Component({
    selector: 'app-supplier-information',
    templateUrl: './supplier-information.component.html',
    styleUrls: ['./supplier-information.component.less']
})
export class SupplierInformationComponent implements OnInit, AfterViewInit {
    @ViewChild('operationTpl', { static: false }) operationTpl: TemplateRef<any>;
    @ViewChild('stateTpl', { static: false }) stateTpl: TemplateRef<any>;
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;
    validateForm: FormGroup;
    tableConfig: UfastTableNs.TableConfig;
    confirmModal: NzModalRef;
    dataList: any = [];
    selectedItemList: string[];
    selectedItemStatus: string[];
    filters: any;
    isVisible = false;
    dialogTitle = '';
    dialogtype = '';
    constructor(
        private fb: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private databaseService: DatabaseService,
    ) {
        this.dataList = [];
        this.selectedItemList = [];
        this.selectedItemStatus = [];
        this.filters = { keyword: '', enabled: '' };
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

    restCondition() {
        this.filters.keyword = '';
        this.filters.enabled = '';
        this.getDataList();
    }

    async getDataList(event?) {
        const params = {
            pageSize: this.tableConfig.pageSize,
            pageNum: this.tableConfig.pageNum,
            filters: this.filters
        };
        const res = await this.databaseService.getSupplierList(params);
        if (res.status !== 0) {
            this.message.error(res.message);
        }
        this.tableConfig.checkAll = false;
        this.dataList = res.value.list;
        this.tableConfig.total = res.value.total;
    }

    openDialog(str: string, item?: any) {
        this.dialogtype = str;
        if (str === 'add') {
            this.dialogTitle = '新增供应商';
        } else {
            this.dialogTitle = '编辑供应商';
            this.validateForm.patchValue({
                name: item.name,
                concatPeople: item.contacts,
                phone: item.tel,
                id: item.id
            });
        }
        this.isVisible = true;
    }

    handleOk(): void {
        this.submitForm();
    }

    async deleteSup(ids) {
        const res = await this.databaseService.deleteSupplier(ids);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.selectedItemList = [];
        this.message.success(res.message);
        this.getDataList();
    }

    deleteSupllier() {
        const arr = [];
        this.dataList.filter(item => {
            return item._checked === true ? arr.push(item.id) : arr;
        });
        if (arr.length > 0) {
            this.modal.confirm({
                nzTitle: '确定删除选中的供应商吗?',
                nzOnOk: () =>
                    new Promise((resolve, reject) => {
                        this.deleteSup(arr);
                        resolve();
                    }).catch(() => console.log('Oops errors!'))
            });
            return;
        }
        this.message.warning('请先选择供应商!');
    }

    disableSupllier(num) {
        const arr = [];
        this.dataList.filter(item => {
            return item._checked === true ? arr.push(item.id) : arr;
        });
        if (arr.length > 0) {
            this.disableSuplier(null, num, arr);
            return;
        }
        this.message.warning('请先选择供应商!');
    }

    async disableSuplier(id: any, status?: any, ids?: any) {
        this.confirmModal = this.modal.confirm({
            nzTitle: `确定${status === 1 ? '启用' : '停用'}当前供应商?`,
            nzContent: `${status === 1 ? '启用' : '停用'}后，当前供应商将${status === 1 ? '可以' : '不再'}展示在供应商选择列表中`,
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    const params = {
                        enabled: status,
                        ids: ids ? ids : [id]
                    };
                    this.databaseService.updateState(params).then(res => {
                        if (res.status === 0) {
                            this.message.success(res.message);
                        } else {
                            this.message.error(res.message);
                        }
                        this.getDataList();
                        resolve();
                    });
                }).catch(() => console.log('Oops errors!'))
        });
    }

    submitForm(): void {
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        if (this.validateForm.invalid) {
            return;
        }

        const params: any = {
            contacts: this.validateForm.getRawValue().concatPeople,
            name: this.validateForm.getRawValue().name,
            tel: this.validateForm.getRawValue().phone
        };

        if (this.dialogtype === 'add') {
            this.addServer(params);
        } else {
            params.id = this.validateForm.getRawValue().id;
            this.editServer(params);
        }

    }

    async addServer(params) {
        const res = await this.databaseService.addSupplier(params);
        if (res.status !== 0) {
            this.message.error(res.message);
        } else {
            this.message.success(res.message);
            this.getDataList();
        }
        this.isVisible = false;
        this.validateForm.reset();
    }

    async editServer(params) {
        const res = await this.databaseService.editSupplier(params);
        if (res.status !== 0) {
            this.message.error(res.message);
        } else {
            this.message.success(res.message);
            this.getDataList();
        }
        this.isVisible = false;
        this.validateForm.reset();
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }

    initForm() {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            concatPeople: [null],
            phone: [null],
            id: [null]
        });
    }

    ngOnInit(): void {
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
                { title: '序号', fixed: true, width: 50, tdTemplate: this.seqNoTpl },
                { title: '供应商名称', width: 140, field: 'name' },
                { title: '联系人', width: 160, field: 'contacts' },
                { title: '联系电话', width: 120, field: 'tel' },
                { title: '状态', width: 100, tdTemplate: this.stateTpl },
                { title: '操作', width: 150, tdTemplate: this.operationTpl },
            ]
        };
        this.getDataList();
    }

}
