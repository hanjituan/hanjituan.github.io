import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '@app/core/common-services/merchant.service';
import { ShowMessageService } from '@app/compontents/widget/show-message/show-message';
import { Location } from '@angular/common';
@Component({
    selector: 'app-pay-setting',
    templateUrl: './pay-setting.component.html',
    styleUrls: ['./pay-setting.component.less']
})
export class PaySettingComponent implements OnInit {
    orgId: string;
    isDetail: boolean;
    payConfigForm: FormGroup;
    constructor(private activeRouter: ActivatedRoute,
        private fb: FormBuilder,
        private merchantSer: MerchantService,
        private location: Location,
        private message: ShowMessageService) {
        this.activeRouter.queryParams.subscribe(queryParams => {
            if (queryParams['id']) {
                this.orgId = queryParams['id'];
            }
            this.isDetail = queryParams['isDetail'] === 'true';
            this.init();
        });
    }

    init() {
        if (!this.orgId) {
            return;
        }
        this.getTdbcConfig(this.orgId);
    }

    editInfo() {
        this.isDetail = false;
        Object.keys(this.payConfigForm.controls).forEach((item) => {
            this.payConfigForm.controls[item].enable();
        });
    }

    submitForm() {
        Object.keys(this.payConfigForm.controls).forEach((item) => {
            this.payConfigForm.controls[item].markAsDirty();
            this.payConfigForm.controls[item].updateValueAndValidity();
        });
        if (this.payConfigForm.invalid) {
            return;
        }
        const param = Object.assign({ orgId: this.orgId }, this.payConfigForm.getRawValue());
        this.merchantSer.saveTdbcConfig(param).subscribe((res) => {
            this.message.showToastMessage('操作成功', 'success');
            this.backTo();
        });
    }

    backTo() {
        this.location.back();
    }

    getTdbcConfig(id) {
        this.merchantSer.getTdbcConfig(id).subscribe((res) => {
            if (res && res.data) {
                this.payConfigForm.patchValue(res.data);
            }
        });
    }
    initForm() {
        this.payConfigForm = this.fb.group({
            devSn: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            key: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            merchantId: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            operNo: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            storeNo: [{ value: null, disabled: this.isDetail }, [Validators.required]],
        });
    }
    ngOnInit() {
        this.initForm();
    }

}
