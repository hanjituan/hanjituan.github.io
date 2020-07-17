import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceNs, UserService } from '@app/core/common-services/user.service';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UfastValidatorsService } from '../../core/infra/validators/validators.service';
import { Title } from '@angular/platform-browser';
import { FxI18nPipe } from './../../directives/pipe/fxI18n.pipe';
import { ResetPasswordModalService } from '@app/compontents/widget/reset-password-modal/reset-password-modal.component';
import { LoginServices } from '@app/core/common-services/login/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    public errMsg = '';
    public canClick = false;
    public verifyImgUrl = '';
    public codeInterval: any;
    public validateForm: FormGroup;
    public verifyText = '发送验证码';
    public phoneValidateForm: FormGroup;
    public codes = '';
    public loginReqData: UserServiceNs.AuthLoginReqModel;
    public array = [1, 2, 3, 4];
    dropdownBox = {
        padding: '10px 15px',
        backgroundColor: '#fff',
        marginTop: '10px',
        fontSize: '12px'
    };
    constructor(
        private title: Title,
        private router: Router,
        private loginSer: LoginServices,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private message: NzMessageService,
        private activeRouter: ActivatedRoute,
        private ufastValidotors: UfastValidatorsService,
        private resetPwdModal: ResetPasswordModalService,
    ) {
        this.loginReqData = { authId: '', loginNameOrMobile: '', password: '' };
        this.codeInterval = null;

        // RSA.setMaxDigits(130);
        // const key = new RSA.RSAKeyPair(10001, '', '1e2qwe2we32qw35e4qw3e43qwe4qw3e');
        // RSA.encryptedString(key, 'pwd'); // 对你的密码加密处理
    }


    loginByTestAccount(value) {
        console.log(value);
        this.getRsaKey();
    }

    openQ() {
        window.location.href = 'tencent://message/?uin=2131167919&amp;Site=货氪分销&amp;Menu=yes';
    }

    loginSubmit() {
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        if (!this.validateForm.invalid) { this.accountLogin(); }
    }

    async accountLogin() {
        this.router.navigate(['../main'], {
            relativeTo: this.activeRouter
        });
        return;
        this.errMsg = '';
        const postData = this.validateForm.getRawValue();
        const resData: UserServiceNs.AuthAnyResModel = await this.userService.postLogin(postData);
        this.handleLogin(resData);
    }

    handleLogin(res) {
        if (res.status !== 0) {
            this.errMsg = res.message;
            return;
        }
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        if (res.data.isFirstLogin) {
            this.resetPwdModal.showModal();
        }
        this.router.navigate(['../main'], {
            relativeTo: this.activeRouter
        });
    }

    public goRegist() {
        this.router.navigateByUrl('regist');
    }

    public async getVerifyCode() {
        if (!this.phoneValidateForm.value.phoneNumber) {
            this.message.warning('请先输入正确的手机号码');
            return false;
        } else {
            const res = await this.userService.getPhoneLoginCode(this.phoneValidateForm.value.phoneNumber);
            if (res.status === 0) {
                this.message.success(res.message);
                this.setCountInterval();
            } else {
                this.message.error(res.message);
            }

        }
    }

    public setCountInterval() {
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

    public async refreshVerify() {
        const data: UserServiceNs.AuthInfoResModel = await this.userService.getAuthInfo();
        this.verifyImgUrl = data.value.verifyImgUrl;
        this.loginReqData.authId = data.value.authId;
        this.codes = data.value.verifyCode;
    }

    public initForm() {
        this.validateForm = this.formBuilder.group({
            // loginName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            // code: [null, [Validators.required]],
            loginNameOrMobile: [null, [Validators.required]],
            // "loginNameOrMobile": "string",
            // "password": "string",
            // "verifyCode": "string",
            // "verifyId": "string"
        });
        this.phoneValidateForm = this.formBuilder.group({
            phoneNumber: [null, [Validators.required, this.ufastValidotors.mobileOrTeleValidator()]],
            verificationCode: [null, [Validators.required]],
        });
    }

    async getRsaKey() {
        try {
            const res = await this.loginSer.getRsaKey();
            console.log(res);
        } catch (error) {
            console.log(error);

        }
        // if (res.Code !== 0) {
        //     this.message.error(res.Message);
        //     return;
        // }
        // _rsa.setPublic(res.Value.Modulus, res.Value.Exponent);
    }

    ngOnInit(): void {
        // this.refreshVerify();
        // var _rsa = new RSAKey();

        this.initForm();
        this.title.setTitle(new FxI18nPipe().transform('', 'projectTitle'));
    }
}
