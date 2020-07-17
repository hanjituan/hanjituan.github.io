import { ShowMessageService } from './../../../compontents/widget/show-message/show-message';
import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { UfastTableNs } from '@app/shared/component/ufast-table/ufast-table.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MerchantTplModel } from './../../../core/models/merchant-model';
import { MerchantService } from './../../../core/common-services/merchant.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
@Component({
    selector: 'app-merchantTpl',
    templateUrl: './merchantTpl.component.html',
    styleUrls: ['./merchantTpl.component.less']
})
export class MerchantTplComponent implements OnInit, AfterViewInit {
    @ViewChild('operation', { static: false }) operationTpl: TemplateRef<any>;
    @ViewChild('tplFormTpl', { static: false }) tplFormTpl: TemplateRef<any>;
    tplList: MerchantTplModel[];
    tplForm: FormGroup;
    public tableConfig: UfastTableNs.TableConfig;
    constructor(
        private merchantSer: MerchantService,
        private fb: FormBuilder,
        private modalService: NzModalService,
        private msgSer: ShowMessageService,
        private router: Router
    ) { }

    init() {
        this.getTplList();
    }

    addTpl() {
    }

    getDetail(item) {
        this.router.navigate(['/main/merchant/tplRight'], { queryParams: { isDetail: true, id: item.id } });
    }

    deletItem(item: MerchantTplModel) {
        this.msgSer.showAlertMessage('', '确认是否删除', 'confirm').afterClose.subscribe((res) => {
            if (res === 'onCancel') {
                return;
            }
            this.merchantSer.deleteTpl(item.id).subscribe(() => {
                this.msgSer.showToastMessage('操作成功', 'success');
                this.getTplList();
            });
        });
    }

    editTpl(item: MerchantTplModel) {
        const tplObj = {
            templateName: item.templateName,
            remark: item.remark
        };
        this.tplForm.patchValue(tplObj);
        this.modalService.create({
            nzTitle: '编辑模板',
            nzContent: this.tplFormTpl,
            nzOnOk: () => {
                Object.keys(this.tplForm.controls).forEach((item) => {
                    this.tplForm.controls[item].markAsDirty();
                    this.tplForm.controls[item].updateValueAndValidity();
                });
                if (this.tplForm.invalid) {
                    return;
                }
                const param = this.tplForm.getRawValue();
                param.id = item.id;
                if (JSON.stringify(tplObj) === JSON.stringify(param)) {
                    return true;
                }
                return this.merchantSer.updateTplInfo(param).then(() => {
                    this.msgSer.showToastMessage('操作成功', 'success');
                    this.getTplList();
                    return true;
                }, () => {
                    return false;
                });
            }
        });
    }

    setRights(item) {
        this.router.navigate(['/main/merchant/tplRight'], { queryParams: { isDetail: false, id: item.id } });
    }

    initTable() {
        this.tableConfig = {
            showCheckbox: false,
            pageSize: 0,
            pageNum: 1,
            loading: false,
            showPagination: false,
            headers: [{
                title: '权限模板名称',
                width: 150,
                field: 'templateName'
            }, {
                title: '模板类型',
                width: 60,
                field: 'lx',
                pipe: 'merchantTplType'
            }, {
                title: '操作',
                width: 100,
                tdTemplate: this.operationTpl
            }]
        };
    }

    getTplList() {
        this.merchantSer.getRightsTplList().subscribe((res) => {
            this.tplList = res.data || [];
        });
    }


    ngOnInit() {
        this.init();
        this.tplForm = this.fb.group({
            templateName: [null, [Validators.required]],
            remark: [null, []]
        });
    }

    ngAfterViewInit(): void {
        this.initTable();
    }
}
