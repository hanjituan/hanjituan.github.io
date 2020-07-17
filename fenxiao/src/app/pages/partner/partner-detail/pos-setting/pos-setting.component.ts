import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SaleService } from '@app/core/common-services/sale.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PosService } from '@app/core/common-services/partner/posSetting.service';


@Component({
    selector: 'app-pos-setting',
    templateUrl: './pos-setting.component.html',
    styleUrls: ['./pos-setting.component.less']
})
export class PosSettingComponent implements OnInit {
    @Input() id;
    @Output() returnBack = new EventEmitter<any>();
    validateForm: FormGroup;
    imgUrl: string;
    imgUrlFromCheckDetail: string;
    areaName: any;

    constructor(
        private fb: FormBuilder,
        private saleSer: SaleService,
        private message: NzMessageService,
        private posSer: PosService,
    ) {
        this.imgUrlFromCheckDetail = '';
        this.areaName = '';
    }

    createMessage(type: string, val: string): void {
        this.message.create(type, val);
    }

    returnToList(val?) {
        this.returnBack.emit(val ? 'refresh' : null);
    }

    async submitForm() {
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }

        if (this.validateForm.invalid) {
            return;
        }

        const params = {
            marketId: this.id,
            reqVOList: [
                {
                    id: this.validateForm.value.id1 || null,
                    bankCardType: 1,
                    cappingAmount: this.validateForm.value.collect1,
                    rate: this.validateForm.value.rate1,
                    thresholdAmount: this.validateForm.value.overMoney1,
                },
                {
                    id: this.validateForm.value.id2 || null,
                    bankCardType: 2,
                    cappingAmount: this.validateForm.value.collect2,
                    rate: this.validateForm.value.rate2,
                    thresholdAmount: this.validateForm.value.overMoney2,
                },

            ]
        };

        const res = await this.posSer.posSave(params);
        this.createMessage(res.status === 0 ? 'success' : 'error', res.message);
        if (res.status === 0) {
            this.returnToList(true);
        }
    }

    initForm() {
        this.validateForm = this.fb.group({
            rate1: [null, [Validators.required]],
            overMoney1: [null],
            collect1: [null],
            rate2: [null, [Validators.required]],
            overMoney2: [null],
            collect2: [null],
            id1: [null],
            id2: [null],
        });
    }

    async getDetail(id: any) {
        const res = await this.posSer.posCheck(this.id);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }

        if (!res.data || !res.data.length) {
            return;
        }

        res.data.map(item => {
            if (item.bankCardType === 1) {
                this.validateForm.patchValue({
                    rate1: item.rate,
                    overMoney1: item.thresholdAmount,
                    collect1: item.cappingAmount,
                    id1: item.id,
                });
            }

            if (item.bankCardType === 2) {
                this.validateForm.patchValue({
                    rate2: item.rate,
                    overMoney2: item.thresholdAmount,
                    collect2: item.cappingAmount,
                    id2: item.id,
                });
            }
        });
    }

    ngOnInit() {
        this.initForm();
        return this.id ? this.getDetail(this.id) : false;
    }
}
