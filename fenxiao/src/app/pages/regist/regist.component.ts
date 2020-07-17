import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UfastValidatorsService } from '../../core/infra/validators/validators.service';
import { UserServiceNs, UserService } from '@app/core/common-services/user.service';
import { AREA_DATA } from '../../../assets/area';

@Component({
    selector: 'app-regist',
    templateUrl: './regist.component.html',
    styleUrls: ['./regist.component.less']
})
export class RegistComponent implements OnInit {
    public areaObj: any;
    validateForm: FormGroup;
    public areaName: string;
    public canClick: boolean;
    public codeInterval: any;
    public phoneTip: string;
    public verifyText: string;
    public loginNameTip: string;
    public verifyImgUrl: string;
    phoneValidate: boolean;
    loginNameValidate: boolean;
    isSame: boolean;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private message: NzMessageService,
        private ufastValidotors: UfastValidatorsService) {

        this.areaName = '';
        this.phoneTip = '';
        this.canClick = false;
        this.loginNameValidate = false;
        this.phoneValidate = false;
        this.verifyImgUrl = '';
        this.loginNameTip = '';
        this.codeInterval = null;
        this.verifyText = '发送验证码';
        this.isSame = false;
    }

    checkPsd() {
        if (!this.validateForm.value.checkPassword) {
            this.isSame = false;
            return;
        }
        this.isSame = this.validateForm.value.password === this.validateForm.value.checkPassword ? false : true;
    }

    public async submitForm() {
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }

        if (!this.loginNameValidate || !this.phoneValidate) {
            return;
        }

        if (!this.validateForm.invalid) {
            const areaName = `${AREA_DATA[this.validateForm.value.arr[0]]}
             ${AREA_DATA[this.validateForm.value.arr[1]]}
             ${AREA_DATA[this.validateForm.value.arr[2]]}`;

            const params = {
                address: this.validateForm.value.address,
                areaName,
                provinceId: this.validateForm.value.arr[0],
                cityId: this.validateForm.value.arr[1],
                countyId: this.validateForm.value.arr[2],
                loginName: this.validateForm.value.loginName,
                orgName: this.validateForm.value.orgName,
                password: this.validateForm.value.password,
                smsValidCode: this.validateForm.value.smsValidCode,
                tel: this.validateForm.value.tel
            };
            const res = await this.userService.regist(params);
            if (res.status === 0) {
                this.message.success(res.message);
                this.initForm();
                setTimeout(() => {
                    this.router.navigateByUrl('login');
                }, 200);
            } else {
                this.message.error(res.message);
            }
        }
    }

    public updateConfirmValidator(): void {
        Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
    }

    public async checkLoginName() {
        if (!this.validateForm.value.loginName) {
            return false;
        }
        const res = await this.userService.checkLoginName(this.validateForm.value.loginName);
        if (res.status !== 0) {
            this.loginNameValidate = false;
            this.loginNameTip = res.message;
            return;
        }
        this.loginNameTip = '';
        this.loginNameValidate = true;
    }

    public async checkMobile() {
        if (!this.validateForm.controls.tel.valid) {
            return;
        }
        const res = await this.userService.checkMobile(this.validateForm.value.tel);
        if (res.status !== 0) {
            this.phoneValidate = false;
            this.phoneTip = res.message;
            return;
        }
        this.phoneTip = '';
        this.phoneValidate = true;
    }

    public confirmationValidator = (control: any): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    }

    public goLogin() {
        this.router.navigateByUrl('login');
    }

    public async getVerifyCode() {
        this.countDown();
        if (!this.validateForm.controls.tel.valid) {
            this.message.warning('请输入正确的手机号码');
            return false;
        }
        if (this.phoneValidate) {
            const res = await this.userService.getPhoneCode(this.validateForm.value.tel);
            if (res.status !== 0) {
                this.message.error(res.message);
                return;
            }
            this.message.success('发送成功,请稍后');
        }
    }

    public countDown() {
        let num = 60;
        this.verifyText = num + '秒后可重发';
        if (this.codeInterval) {
            clearInterval(this.codeInterval);
        } else {
            this.canClick = true;
            this.codeInterval = setInterval(() => {
                num--;
                this.verifyText = num + '秒后可重发';
                if (num === 0) {
                    clearInterval(this.codeInterval);
                    this.codeInterval = null;
                    this.canClick = false;
                    this.verifyText = '重新发送验证码';
                }
            }, 1000);
        }
    }

    public initForm() {
        this.validateForm = this.fb.group({
            orgName: [null, [Validators.required]],
            arr: [null, [Validators.required]],
            address: [null, [Validators.required]],
            loginName: [null, [Validators.required]],
            tel: [null, [Validators.required, this.ufastValidotors.mobileOrTeleValidator()]],
            smsValidCode: [null, [Validators.required]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required, this.confirmationValidator]],
            agree: [null, [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.initForm();
    }

}
