import { RoleAuthService } from '@app/core/common-services/sysSetting/roleAuth.service';
import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';


enum PageType {
    List,
    Add,
    Edit,
    Detail
}

@Component({
    selector: 'app-role-auth',
    templateUrl: './role-auth.component.html',
    styleUrls: ['./role-auth.component.less']
})
export class RoleAuthComponent implements OnInit, AfterViewInit {
    @ViewChild('operationTpl', { static: false }) operationTpl: TemplateRef<any>;
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;
    selectedValue = null;
    tableConfig: UfastTableNs.TableConfig;
    dataList: any = [];
    filters: any;
    currentPage: number;
    pageType = PageType;
    itemId: string;
    isVisible: boolean;
    validateForm: FormGroup;
    dialogtype: string;
    dialogTitle: string;
    constructor(
        private fb: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private roleAuthService: RoleAuthService,
    ) {
        this.dataList = [];
        this.filters = { name: '' };
        this.currentPage = this.pageType.List;
        this.isVisible = false;
        this.dialogtype = '';
        this.dialogTitle = '';
    }

    openDialog(str: string, item?: any) {
        this.dialogtype = str;
        if (str === 'add') {
            this.validateForm.reset();
            this.dialogTitle = '新增角色';
        } else {
            this.dialogTitle = '编辑角色';
            this.validateForm.patchValue({ name: item.name, id: item.id });
        }
        this.isVisible = true;
    }

    deleteRole(item) {
        // const arr = [];
        // this.dataList.filter(item => {
        //     return item._checked === true ? arr.push(item.id) : arr;
        // });
        // if (arr.length > 0) {
        this.modal.confirm({
            nzTitle: '确定删除选中的角色吗?',
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.deleteSer(item);
                    resolve();
                }).catch(() => console.log('Oops errors!'))
        });
        // return;
        // }
        // this.message.warning('请先选择供应商!');
    }

    async deleteSer(item) {
        const params = {
            delWhenUsed: true,
            id: item.id,
            roleIds: [item.id]
        };
        const res = await this.roleAuthService.roleDel(params);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.message.success(res.message);
        this.getDataList();
    }


    handleCancel(): void {
        this.isVisible = false;
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
            name: this.validateForm.getRawValue().name,
        };

        if (this.dialogtype === 'add') {
            this.addServer(params);
        } else {
            params.id = this.validateForm.getRawValue().id;
            this.editServer(params);
        }
    }


    async addServer(params) {
        const res = await this.roleAuthService.roleAdd(params);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.message.success(res.message);
        this.getDataList();
        this.isVisible = false;
    }

    async editServer(params) {
        const res = await this.roleAuthService.roleUpdate(params);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.message.success(res.message);
        this.getDataList();
        this.isVisible = false;
    }


    returnToList(event) {
        this.currentPage = this.pageType.List;
        if (event === 'refresh') {
            this.getDataList();
        }
    }

    resetCondition() {
        this.filters.name = '';
        this.getDataList();
    }

    searchByCondition() {
        this.getDataList();
    }

    checkTableItem(event: UfastTableNs.SelectedChange): void {

    }

    setAuth(item) {
        this.itemId = item.id;
        this.currentPage = this.pageType.Add;
    }

    add() {
        this.itemId = '';
        this.currentPage = this.pageType.Add;
    }

    edit(id) {
        this.itemId = id;
        this.currentPage = this.pageType.Edit;
    }


    async getDataList(event?) {
        this.tableConfig.loading = true;
        const params = { name: this.filters.name };
        const res = await this.roleAuthService.roleList(params);
        this.tableConfig.loading = false;
        if (res.status !== 0) {
            this.message.error(res.message);
        }
        this.dataList = res.data;
    }

    initForm() {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            id: [null],
        });
    }


    ngOnInit() {
        this.initForm();
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
                { title: '序号', fixed: true, width: 50, tdTemplate: this.seqNoTpl },
                { title: '角色名称', width: 140, field: 'name' },
                { title: '操作', width: 150, tdTemplate: this.operationTpl },
            ]
        };
        this.getDataList();
    }

}
