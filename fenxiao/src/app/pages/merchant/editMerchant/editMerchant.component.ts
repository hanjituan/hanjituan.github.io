import { NzModalService } from 'ng-zorro-antd/modal';
import { ShowMessageService } from '@app/compontents/widget/show-message/show-message';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MapPipe, MapSet } from '@app/directives/pipe/map.pipe';
import { MerchantService } from './../../../core/common-services/merchant.service';
import { Location } from '@angular/common';
@Component({
    selector: 'app-editMerchant',
    templateUrl: './editMerchant.component.html',
    styleUrls: ['./editMerchant.component.less']
})
export class EditMerchantComponent implements OnInit {
    @ViewChild('merchantChangeTpl', { static: false }) merchantChangeTpl: TemplateRef<any>;
    merchantChangeForm: FormGroup;
    merchantForm: FormGroup;
    orgId: string;
    isDetail: boolean;
    salesManDeptName = '';
    merchantInfo: any = {};
    tplList: { value: string; label: string; }[];
    cardTypeList: { value: string; label: string; }[];
    merchantTypeList: { value: string; label: string; }[];
    constructor(
        private fb: FormBuilder,
        private location: Location,
        private message: ShowMessageService,
        private activeRouter: ActivatedRoute,
        private merchantSer: MerchantService,
        private modalService: NzModalService,
    ) {
        this.activeRouter.queryParams.subscribe(queryParams => {
            if (queryParams['id']) {
                this.orgId = queryParams['id'];
            }
            this.isDetail = queryParams['isDetail'] === 'true';
            this.init();
        });
        this.tplList = [];
        this.cardTypeList = [...(new MapPipe().transformMapToArray(MapSet.idCardType))];
        this.merchantTypeList = [...(new MapPipe().transformMapToArray(MapSet.merchantType, true))];
    }

    init() {
        if (!this.orgId) {
            return;
        }
        this.getMerchantExtra(this.orgId);
        this.getMerchantInfo(this.orgId);
    }

    goBack() {
        this.location.back();
    }

    logout() {
        this.message.showAlertMessage('', '是否确认注销', 'confirm').afterClose.subscribe((res) => {
            if (res === 'onCancel') {
                return;
            }
            this.merchantSer.removeMerchant(this.orgId).subscribe(resData => {
                this.message.showToastMessage('操作成功', 'success');
                this.init();
            });
        });
    }

    setOnOrOff(isOff?) {
        this.merchantSer.lockMerchant({
            isLock: !!isOff,
            orgId: this.orgId
        }).subscribe(res => {
            this.message.showToastMessage('操作成功', 'success');
            this.init();
        });
    }

    changeInfo() {
        this.merchantChangeForm.patchValue(this.merchantInfo);
        this.modalService.create({
            nzTitle: '变更商户信息',
            nzContent: this.merchantChangeTpl,
            nzOnOk: () => {
                const param = this.merchantChangeForm.getRawValue();
                param.orgId = this.orgId;
                return this.merchantSer.changeMerchantInfo(param).then((res) => {
                    this.init();
                    return true;
                }, () => {
                    return false;
                });
            }
        });
    }

    editInfo() {
        this.isDetail = false;
        Object.keys(this.merchantForm.controls).forEach((item) => {
            this.merchantForm.controls[item].enable();
        });
    }

    deptNameChange(val) {
        this.salesManDeptName = val;
    }

    submitForm() {
        if (this.orgId) {
            Object.keys(this.merchantForm.controls).forEach((item) => {
                this.merchantForm.controls[item].markAsDirty();
                this.merchantForm.controls[item].updateValueAndValidity();
            });
            if (this.merchantForm.invalid) {
                return;
            }
            const deptCodes = this.merchantForm.getRawValue().salesManDeptCodeList;
            const deptCode = deptCodes.length > 0 ? deptCodes[deptCodes.length - 1] : '';
            const formData = this.merchantForm.getRawValue();
            formData.salesManDeptCode = deptCode;
            formData.salesManDeptName = this.salesManDeptName;
            if (formData.addressIds.length < 3) {
                this.message.showToastMessage('请填写正确的地址', 'error');
                return;
            }
            formData.companyAreaId = formData.addressIds[2];
            delete formData.addressIds;
            const param = Object.assign({ orgId: this.orgId }, formData);
            this.merchantSer.editMerchantInfo(param).subscribe((res) => {
                this.message.showToastMessage('操作成功', 'success');
                this.goBack();
            });
        }
    }

    getMerchantInfo(orgId) {
        this.merchantSer.getMerchantInfo(orgId).subscribe((res) => {
            Object.assign(this.merchantInfo, res.data);
            res.data.salesManDeptCodeList = this.splitCode(res.data.salesManDeptCode);
            this.salesManDeptName = res.data.salesManDeptName || '';
            this.merchantForm.patchValue(res.data);
            this.merchantForm.controls['addressIds'].setValue([res.data.provinceAreaId, res.data.prefAreaId,
            res.data.countryAreaId]);
        });
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

    getMerchantExtra(orgId) {
        this.merchantSer.getMerchantExtra(orgId).subscribe(res => {
            Object.assign(this.merchantInfo, res.data);
            this.merchantForm.patchValue(res.data);
        });
    }
    getRigthsTpl() {
        this.merchantSer.getRightsTplList().subscribe((res) => {
            const list = res.data || [];
            list.forEach((item) => {
                this.tplList.push({
                    value: item.id,
                    label: item.templateName
                });
            });
        });
    }

    ngOnInit() {
        this.getRigthsTpl();
        let formCtrl = {
            companyName: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            linkMan1: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            linkManTel1: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            addressIds: [{ value: [], disabled: this.isDetail }, [Validators.required]],
            address: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            //entSortId: [{ value: null, disabled: this.isDetail }, []],
            //industryVersionType: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            moduleTemplateId: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            companyAccountType: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            userNumber: [{ value: null, disabled: this.isDetail }, []],
            isLimitUserNumber: [{ value: false, disabled: this.isDetail }, []],
            expireDate: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            salesMan: [{ value: null, disabled: this.isDetail }, []],
            salesManDeptCodeList: [{ value: [], disabled: this.isDetail }, []],
            idCardType: [{ value: '01', disabled: this.isDetail }, [Validators.required]],
            legalName: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            businessLicenseNo: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            idcardNo: [{ value: null, disabled: this.isDetail }, [Validators.required]],
            extend1: [{ value: null, disabled: this.isDetail }],
            extend2: [{ value: null, disabled: this.isDetail }],
            extend3: [{ value: null, disabled: this.isDetail }],
        };

        if (this.orgId && !this.isDetail) {
            let formCtrl = {
                companyName: [{ value: null, disabled: this.isDetail }, [Validators.required]],
                linkMan1: [{ value: null, disabled: this.isDetail }, [Validators.required]],
                linkManTel1: [{ value: null, disabled: this.isDetail }, [Validators.required]],
                addressIds: [{ value: [], disabled: this.isDetail }, [Validators.required]],
                address: [{ value: null, disabled: this.isDetail }, [Validators.required]],
                //entSortId: [{ value: null, disabled: this.isDetail }, []],
                //industryVersionType: [{ value: null, disabled: this.isDetail }, [Validators.required]],
                salesMan: [{ value: null, disabled: this.isDetail }, []],
                salesManDeptCodeList: [{ value: [], disabled: this.isDetail }, []],
                idCardType: [{ value: '01', disabled: this.isDetail }, [Validators.required]],
                legalName: [{ value: null, disabled: this.isDetail }, [Validators.required]],
                businessLicenseNo: [{ value: null, disabled: this.isDetail }, [Validators.required]],
                idcardNo: [{ value: null, disabled: this.isDetail }, [Validators.required]],
                extend1: [{ value: null, disabled: this.isDetail }],
                extend2: [{ value: null, disabled: this.isDetail }],
                extend3: [{ value: null, disabled: this.isDetail }],
            };
            this.merchantForm = this.fb.group(formCtrl);
        } else {
            this.merchantForm = this.fb.group(formCtrl);
        }

        this.merchantChangeForm = this.fb.group({
            moduleTemplateId: [null, [Validators.required]],
            companyAccountType: [null, [Validators.required]],
            userNumber: [null, []],
            isLimitUserNumber: [false, []],
            expireDate: [null, [Validators.required]]
        });
    }

}
