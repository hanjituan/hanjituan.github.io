import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SaleService } from '@app/core/common-services/sale.service';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '@env/environment';


interface ParamsModel {
    id?: string | number;
    name: string | number;
    merchantNo: string | number;
    contacts: string | number;
    phone: string | number;
    provinceId: string | number;
    cityId: string | number;
    countyId: string | number;
    address: string | number;
    logoUrl: any;
}

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
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

    urlChange(e) {
        console.log(e);
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
        const params: ParamsModel = {
            logoUrl: this.imgUrl,
            name: this.validateForm.value.name,
            merchantNo: this.validateForm.value.merchantNo,
            contacts: this.validateForm.value.contacts,
            phone: this.validateForm.value.phone,
            provinceId: this.validateForm.value.arr[0],
            cityId: this.validateForm.value.arr[1],
            countyId: this.validateForm.value.arr[2],
            address: this.validateForm.value.address,
        };
        let SERVICE = 'marAdd';
        if (this.id) {
            SERVICE = 'marUpdate';
            params.id = this.id;
        }
        const res = await this.saleSer[SERVICE](params);
        this.createMessage(res.status === 0 ? 'success' : 'error', res.message);
        if (res.status === 0) {
            this.returnToList(true);
        }
    }

    initForm() {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            merchantNo: [null, [Validators.required]],
            contacts: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            address: [null, [Validators.required]],
            arr: [null, [Validators.required]]
        });
    }


    async getDetail(id: any) {
        const res = await this.saleSer.marDetail(this.id);
        if (res.status === 0) {
            this.validateForm.patchValue({
                name: res.data.name,
                merchantNo: res.data.merchantNo,
                contacts: res.data.contacts,
                phone: res.data.phone,
                address: res.data.address,
                arr: [String(res.data.provinceId), String(res.data.cityId), String(res.data.countyId)],
            });
            if (res.data.logoUrl) {
                // tslint:disable-next-line:max-line-length
                this.imgUrlFromCheckDetail = environment.useOss ? res.data.logoUrl : `${environment.baseUrl.bs}file/read?fileId=${res.data.logoUrl}`;
            }
        }
    }

    ngOnInit() {
        this.initForm();
        return this.id ? this.getDetail(this.id) : false;
    }
}
