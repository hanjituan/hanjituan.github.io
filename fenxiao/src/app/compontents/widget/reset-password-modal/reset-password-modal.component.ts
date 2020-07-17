import { Component, Injectable, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, UserServiceNs } from '@app/core/common-services/user.service';
import { ShowMessageService } from '../show-message/show-message';
import { Router } from '@angular/router';

@Injectable()
export class ResetPasswordModalService {


    public modalSubject: NzModalRef;

    constructor(private modalService: NzModalService, private msgService: ShowMessageService) {

    }

    public showModal(maskCloseable: boolean = false): NzModalRef {
        this.modalSubject = this.modalService.create({
            nzTitle: '修改密码',
            nzContent: ResetPasswordModalComponent,
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
    selector: 'app-reset-password-modal',
    templateUrl: './reset-password-modal.component.html',
    styleUrls: ['./reset-password-modal.component.less']
})
export class ResetPasswordModalComponent implements OnInit {
    validateForm: FormGroup;
    remark = '';
    constructor(
        public router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private modalService: ResetPasswordModalService) {

    }

    submitPassword() {
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        const param: { password: string; rePassword: string } = this.validateForm.getRawValue();
        if (this.validateForm.invalid) {
            return;
        }
        // tslint:disable-next-line:max-line-length
        const regex = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_?!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_?!@#$%^&*`~()-+=]+$)(?![0-9\W_?!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_?!@#$%^&*`~()-+=]{8,30}$');
        if (!regex.test(param.password)) {
            this.remark = '密码由含大写、小写字母、数字、特殊字符三种及以上,8-20位组成';
            return;
        }
        if (param.password !== param.rePassword) {
            this.remark = '密码不一致请修改';
            return;
        }
        const userId = (localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))
            : {})['userId'] || '';
        this.userService.updatePassword({
            password: param.password,
            userId
        }).then((res) => {
            this.cancelModal();
        });
    }

    cancelModal() {
        this.modalService.modalSubject.destroy('onCancel');
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            password: [null, [Validators.required]],
            rePassword: [null, [Validators.required]],
        });
    }

}
