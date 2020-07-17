import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowMessageService } from './../../compontents/widget/show-message/show-message';
import { UserService, UserServiceNs } from '@app/core/common-services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResetPasswordModalService } from '@app/compontents/widget/reset-password-modal/reset-password-modal.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
    userName: string;
    constructor(
        public router: Router,
        public userService: UserService,
        private modalSer: NzModalService,
        private messageService: ShowMessageService,
        private resetPwdModal: ResetPasswordModalService
    ) {
        this.userName = '';
    }

    public navigateUserInfo() {
        this.router.navigateByUrl('/main/userManage/personalInfo');
    }

    public modifyPwd() {
        this.resetPwdModal.showModal();
    }

    public logOut() {
        this.modalSer.confirm({
            nzTitle: '提示',
            nzContent: '确定退出吗?',
            nzOnOk: () => {
                this.userService.logout().subscribe(() => {
                    this.router.navigateByUrl('/login');
                }, (error: any) => {
                    this.router.navigateByUrl('/login');
                });
            }
        });
    }

    private getUserInfo() {
        this.userService.getLogin().subscribe((resData: UserServiceNs.UfastHttpAnyResModel) => {
            if (resData.status === 0) {
                this.userName = resData.data.name;
            } else {
                this.messageService.showAlertMessage('', resData.message, 'warning');
            }
        }, (error: any) => {
            this.messageService.showAlertMessage('', error.message, 'error');
        });
    }

    ngOnInit() {
        // this.getUserInfo();
        this.userName = JSON.parse(localStorage.getItem('userInfo')).userName;
    }

}
