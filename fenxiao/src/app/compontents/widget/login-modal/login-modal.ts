
import { Component, Injectable, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, UserServiceNs } from '@app/core/common-services/user.service';
import { ShowMessageService } from '../show-message/show-message';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

@Injectable()
export class LoginModalService {


    public modalSubject: NzModalRef;


    constructor(private modalService: NzModalService, private msgService: ShowMessageService) {

    }

    public showLoginModal(maskCloseable: boolean = false): NzModalRef {
        this.modalSubject = this.modalService.create({
            nzTitle: '用户登录',
            nzContent: LoginModalComponent,
            nzMaskClosable: maskCloseable,
            nzOkLoading: true,
            nzFooter: null,
            nzClosable: false
        });
        let loading: boolean;
        this.modalSubject.afterOpen.subscribe(() => {
            loading = this.msgService.loadingIsShow();
            if (loading) {
                this.msgService.closeLoading();
            }
        });
        this.modalSubject.afterClose.subscribe(() => {
            if (loading) {
                this.msgService.showLoading();
            }
        });
        return this.modalSubject;
    }
}

@Component({
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

    validateForm: FormGroup;
    loginReqData: UserServiceNs.AuthLoginReqModel;
    verifyImgUrl: string;
    remark: string;
    loading: boolean;
    usernameDisable: boolean;
    constructor(
        public router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private message: ShowMessageService,
        private loginModalService: LoginModalService,
    ) {

        this.usernameDisable = false;
        this.verifyImgUrl = '';
        this.remark = '';
        this.loading = false;
    }

    public refreshVerify() {
        this.userService.getAuthInfo().then((data: UserServiceNs.AuthInfoResModel) => {
            this.verifyImgUrl = data.value.verifyImgUrl;
            this.loginReqData.authId = data.value.authId;
        }, (error) => {
            this.remark = error.message;
        });
    }

    public loginSubmit() {
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        if (this.validateForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.postLogin({
            loginNameOrMobile: this.loginReqData.loginName,
            password: this.loginReqData.password
        })
            .then((resData: UserServiceNs.AuthAnyResModel) => {
                this.loading = false;

                if (resData.status !== 0) {
                    this.remark = resData.message;
                    this.refreshVerify();
                    return;
                }
                this.loginModalService.modalSubject.destroy('onOk');
            }, (error) => {
                this.remark = error.message;
                this.loading = false;
            });
    }

    public cancelModal(data?: any) {
        this.loginModalService.modalSubject.destroy('onCancel');
        // this.router.navigateByUrl('/login');
    }

    ngOnInit() {
        // this.refreshVerify();
        this.loginReqData = {
            authId: '',
            loginNameOrMobile: this.userService.userInfo.username,
            password: '',
            // code: '',
        };
        if (this.userService.userInfo.username) {
            this.usernameDisable = true;
        }
        this.validateForm = this.fb.group({
            userName: [{ value: null, disabled: this.usernameDisable }, [Validators.required]],
            password: [null, [Validators.required]],
            // verifyCode: [null, [Validators.required]],
        });

    }

}
