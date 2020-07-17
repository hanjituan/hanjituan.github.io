import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { UfastTableNs } from '../../../shared/component/ufast-table/ufast-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RoleAuthService } from '@app/core/common-services/sysSetting/roleAuth.service';
import { EmployeeService } from '@app/core/common-services/sysSetting/employee.service';
import { ImportModalService } from '@app/compontents/widget/import-modal/import-modal.service';
import { UfastValidatorsService } from '@app/core/infra/validators/validators.service';

@Component({
    selector: 'app-employee-information',
    templateUrl: './employee-information.component.html',
    styleUrls: ['./employee-information.component.less']
})
export class EmployeeInformationComponent implements OnInit, AfterViewInit {
    @ViewChild('operationTpl', { static: false }) operationTpl: TemplateRef<any>;
    @ViewChild('orderTpl', { static: false }) orderTpl: TemplateRef<any>;
    @ViewChild('stateTpl', { static: false }) stateTpl: TemplateRef<any>;
    @ViewChild('seqNoTpl', { static: false }) seqNoTpl: TemplateRef<any>;

    confirmModal: NzModalRef;
    selectedValue = null;
    tableConfig: UfastTableNs.TableConfig;
    dataList: any = [];
    jobList: any = [];
    validateForm: FormGroup;
    isVisible = false;
    modalTitle = '';
    dialogType = '';
    filters: any;
    constructor(
        private fb: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private employeeSer: EmployeeService,
        private roleAuthService: RoleAuthService,
        private importService: ImportModalService,
        private ufastValidatorsService: UfastValidatorsService
    ) {
        this.dataList = [];
        this.filters = { locked: false, name: '', };
    }

    public showUploadModal() {
        const params = {
            templateAPI: 'user/downloadTemplate',
            templateName: '员工导入模板',
            tpMethod: 'get',
            importAPI: 'user/userImport',
            fileTypeList: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
            tpService: 'Ius'
        };
        this.importService.show(params).then((data) => {
            this.getEmList();
        }, () => {
            this.getEmList();
        });
    }

    checkTableItem(event: UfastTableNs.SelectedChange): void { }

    async addEmployeeServe(params) {
        const res = await this.employeeSer.addEmployee(params);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.getEmList();
        this.message.success(res.message);
        this.isVisible = false;
    }

    async editEmployeeServe(params) {
        const res = await this.employeeSer.editEmployee(params);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.getEmList();
        this.message.success(res.message);
        this.isVisible = false;
    }

    async setNewPassword(psd, id) {
        const params = {
            password: psd,
            userId: id
        };
        const res = await this.employeeSer.resetPsd(params);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.isVisible = false;
        this.message.success(res.message);
    }

    splitCode(code: string): string[] {
        if (!code) {
            return [];
        }
        const list = [];
        let val = '';
        code.split('').forEach(str => {
            val += str;
            if (val.length > 0 && val.length % 3 === 0) {
                list.push(val);
            }
        });
        return list;
    }
    openDialog(str: string, item?: any) {
        this.validateForm.reset();
        this.dialogType = str;
        if (str === 'edit') {
            this.modalTitle = '编辑员工';
            this.validateForm.controls.name.enable();
            this.validateForm.controls.roleIds.enable();
            this.validateForm.controls.mobile.enable();
            this.validateForm.controls.password.disable();
            this.validateForm.controls.checkPassword.disable();
            this.validateForm.controls.employeeNumber.enable();
            this.validateForm.patchValue(
                {
                    name: item.name,
                    mobile: item.mobile,
                    userId: item.id,
                    roleIds: item.roleIds && item.roleIds.length && item.roleIds[0],
                    employeeNumber: item.employeeNumber,
                    deptCode: this.splitCode(item.deptCode)
                }
            );
        } else if (str === 'add') {
            this.modalTitle = '新增员工';
            this.validateForm.controls.name.enable();
            this.validateForm.controls.roleIds.enable();
            this.validateForm.controls.mobile.enable();
            this.validateForm.controls.password.enable();
            this.validateForm.controls.checkPassword.enable();
            this.validateForm.controls.employeeNumber.enable();
            this.validateForm.reset();
        } else {
            this.modalTitle = '重置密码';
            this.validateForm.controls.name.disable();
            this.validateForm.controls.mobile.disable();
            this.validateForm.controls.roleIds.disable();
            this.validateForm.controls.password.enable();
            this.validateForm.controls.deptCode.disable();
            this.validateForm.controls.employeeNumber.disable();
            this.validateForm.controls.checkPassword.enable();
            this.validateForm.patchValue({ userId: item.id });
        }
        this.isVisible = true;
    }

    async lockEmployee(id: any, status: any) {
        const url = status ? 'user/lock' : 'user/unlock';
        this.confirmModal = this.modal.confirm({
            nzTitle: `确定${!status ? '解锁' : '锁定'}当前员工?`,
            nzContent: `${!status ? '解锁' : '锁定'}后，当前员工将${!status ? '可以' : '不可以'}登录系统`,
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    const params = { userIds: [id] };
                    this.employeeSer.setEmployeeLock(params, url).then(res => {
                        if (res.status === 0) {
                            this.message.success(res.message);
                        } else {
                            this.message.error(res.message);
                        }
                        this.getEmList();

                        resolve();
                    });
                }).catch(() => console.log('Oops errors!'))
        });
    }

    async resetPassword(id) {
        this.modalTitle = '重置密码';
        this.isVisible = true;
    }

    handleOk(): void {
        this.submitForm();
    }

    submitForm(): void {
        console.log(this.validateForm.value);

        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        if (this.validateForm.invalid) {
            return;
        }

        let site;
        this.jobList.map(item => {
            if (item.id === this.validateForm.getRawValue().roleIds) {
                site = item.site;
            }
        });
        const deptCodes = this.validateForm.getRawValue().deptCode || [];
        const deptCode = deptCodes.length > 0 ? deptCodes[deptCodes.length - 1] : '';
        const params: any = {
            name: this.validateForm.getRawValue().name,
            mobile: this.validateForm.getRawValue().mobile,
            loginName: this.validateForm.getRawValue().mobile,
            roleIds: this.validateForm.getRawValue().roleIds ? [this.validateForm.getRawValue().roleIds] : null,
            site,
            deptCode,
            employeeNumber: this.validateForm.getRawValue().employeeNumber
        };
        if (this.dialogType === 'add') {
            params.password = this.validateForm.getRawValue().password;
            this.addEmployeeServe(params);
        } else if (this.dialogType === 'edit') {
            params.userId = this.validateForm.getRawValue().userId;
            this.editEmployeeServe(params);
        } else {
            params.password = this.validateForm.getRawValue().password;
            params.userId = this.validateForm.getRawValue().userId;
            this.setNewPassword(params.password, params.userId);
        }

    }

    handleCancel(): void {
        this.isVisible = false;
    }

    searchByFilter() {
        this.getEmList();
    }

    resetFilters() {
        this.filters.name = '';
        this.filters.locked = '';
        this.getEmList();
    }

    async getEmList() {
        this.tableConfig.loading = true;
        const params = {
            pageSize: this.tableConfig.pageSize,
            pageNum: this.tableConfig.pageNum,
            filters: this.filters,
        };
        const res: any = await this.employeeSer.getEmployeeList(params);
        this.tableConfig.loading = false;
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.dataList = res.data.list;
        this.tableConfig.total = res.data.total;
    }

    async getRoleList() {
        const params = { name: this.filters.name };
        const res = await this.roleAuthService.roleList(params);
        if (res.status !== 0) {
            this.message.error(res.message);
        }
        this.jobList = res.data;
    }

    public confirmationValidator = (control: any): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    }

    public updateConfirmValidator(): void {
        Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
    }

    initForm() {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            password: [null, [Validators.required, this.ufastValidatorsService.passwordValidator()]],
            checkPassword: [null, [Validators.required, this.confirmationValidator]],
            roleIds: [null, [Validators.required]],
            mobile: [null, [Validators.required]],
            userId: [null],
            employeeNumber: [null, [Validators.required]],
            deptCode: [[], [Validators.required]]
        });
    }

    ngOnInit() {
        this.getRoleList();
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
                { title: '序号', fixed: true, width: 40, tdTemplate: this.seqNoTpl },
                { title: '姓名', fixed: true, width: 80, field: 'name' },
                { title: '手机号', fixed: true, width: 80, field: 'mobile' },
                { title: '员工编号', width: 80, field: 'employeeNumber' },
                { title: '所属机构', width: 80, field: 'deptName' },
                { title: '角色', width: 80, field: 'roleNames' },
                { title: '状态', width: 80, tdTemplate: this.stateTpl },
                { title: '操作', width: 300, tdTemplate: this.operationTpl },
            ]
        };
        this.getEmList();
    }
}
