import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { MarketService } from '@app/core/common-services/partner/market.service';
import { MapSet, MapPipe } from '@app/directives/pipe/map.pipe';
import { UfastValidatorsService } from '@app/core/infra/validators/validators.service';


@Component({
    selector: 'app-info-setting',
    templateUrl: './info-setting.component.html',
    styleUrls: ['./info-setting.component.less']
})
export class InfoSettingComponent implements OnInit {

    @Input() id;
    @Output() returnBack = new EventEmitter<any>();
    @Output() changePageType = new EventEmitter<any>();

    validateForm: FormGroup;
    imgUrl: string;
    imgUrlFromCheckDetail: string;
    areaName: any;
    merchantCardTypeList: any[];
    legalCardTypeList: any[];
    merchantNatureList: any[];
    settleWaysList: any[];

    constructor(
        private fb: FormBuilder,
        private marketSer: MarketService,
        private message: NzMessageService,
        private ufastValidotors: UfastValidatorsService,
    ) {
        this.imgUrlFromCheckDetail = '';
        this.areaName = '';
    }

    createMessage(type: string, val: string): void {
        this.message.create(type, val);
    }

    returnToList(val) {
        this.returnBack.emit(val ? 'refresh' : null);
    }

    pageTypeChanged() {
        this.changePageType.emit();
    }

    urlChange(e) {
        this.imgUrl = e;
    }

    async submitForm() {
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }

        if (this.validateForm.invalid) {
            return;
        }
        const params = this.validateForm.getRawValue();
        delete params.commName;
        delete params.commId;
        delete params.corName;
        delete params.commPhone;

        params.provinceAreaCode = this.validateForm.value.arr[0];
        params.prefAreaCode = this.validateForm.value.arr[1];
        params.countryAreaCode = this.validateForm.value.arr[2];
        params.storeAreaCode = this.validateForm.value.arr[2];
        const res = await this.marketSer.settleMerchantSave(params);
        this.createMessage(res.status === 0 ? 'success' : 'error', res.message);
        if (res.status === 0) { this.pageTypeChanged(); }
    }

    initForm() {
        this.validateForm = this.fb.group({
            arr: [null, [Validators.required]],
            accName: [null, [Validators.required]],
            accBankName: [null, [Validators.required]],
            accNo: [null, [Validators.required]],
            cleanChannel: [null, [Validators.required]],
            cleanType: [null, [Validators.required]],
            commName: [null, [Validators.required]],
            commPhone: [null, [Validators.required, this.ufastValidotors.mobileOrTeleValidator()]],
            commShortName: [null, [Validators.required]],
            corName: [null, [Validators.required]],
            dirCusNo: [null, [Validators.required]],
            eleAcc: [null, [Validators.required]],
            expOperNo: [null],
            licNo: [null, [Validators.required]],
            licType: [null, [Validators.required]],
            mcc: [null, [Validators.required]],
            merLicNo: [null, [Validators.required]],
            merLicType: [null, [Validators.required]],
            orgId: [this.id, [Validators.required]],
            storeAddr: [null, [Validators.required]],
            // storeAreaCode: [null, [Validators.required]],
            // countryAreaCode: [null, [Validators.required]],
            // provinceAreaCode: [null, [Validators.required]],
            // prefAreaCode: [null, [Validators.required]],
            commKind: [null, [Validators.required]],
            isWithdrawQualify: ['1', [Validators.required]],
            isWithdrawVerify: ['1', [Validators.required]],
            commId: [null, [Validators.required]],
        });

        this.validateForm.controls.commName.disable();
        this.validateForm.controls.commId.disable();
        this.validateForm.controls.corName.disable();
        this.validateForm.controls.commPhone.disable();
    }



    async getDetail(id: any) {
        const res = await this.marketSer.marketInfoDetail(this.id);
        if (res.status === 0 && res.data) {
            this.validateForm.patchValue(res.data);
            this.validateForm.patchValue({
                arr: [String(res.data.provinceAreaCode), String(res.data.prefAreaCode), String(res.data.countryAreaCode)],
                licType: String(this.validateForm.value.licType),
                orgId: this.id
            });
        }
    }

    ngOnInit() {
        this.initForm();
        this.merchantCardTypeList = [...(new MapPipe()).transformMapToArray(MapSet.merchantCardType)];
        this.legalCardTypeList = [...(new MapPipe()).transformMapToArray(MapSet.legalCardType)];
        this.merchantNatureList = [...(new MapPipe()).transformMapToArray(MapSet.merchantNature)];
        this.settleWaysList = [...(new MapPipe()).transformMapToArray(MapSet.settleWays)];
        return this.id ? this.getDetail(this.id) : false;
    }
}
