import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleAuthService } from '@app/core/common-services/sysSetting/roleAuth.service';
import { MenuService } from '@app/core/common-services/menu.service';
import { audit } from 'rxjs/operators';

@Component({
    selector: 'app-job-authority-add',
    templateUrl: './job-authority-add.component.html',
    styleUrls: ['./job-authority-add.component.less']
})
export class JobAuthorityAddComponent implements OnInit {
    @Input() id;
    @Output() returnBack = new EventEmitter<any>();
    dialogType = false;
    value: any;
    mapOfExpandData: { [key: string]: boolean } = {};
    listOfData = [
        {
            id: 1,
            name: 'John Brown',
            age: 32,
            expand: false,
            address: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
        }];
    menuList: any;
    constructor(
        private menuSer: MenuService,
        private message: NzMessageService,
        private roleAuthService: RoleAuthService,
    ) { }

    updateAllChecked(a, b, c): void { // 全选
        this.menuList[a].children[b].children[c].indeterminate = false;
        this.menuList[a].children[b].children[c].auths.map(item => {
            item.checked = this.menuList[a].children[b].children[c].allChecked;
        });
    }

    updateSingleChecked(a, b, c): void { // 单选
        const arr1 = [];
        this.menuList[a].children[b].children[c].auths.map(item => {
            if (item.checked) {
                arr1.push(item);
            }
        });
        // tslint:disable-next-line:max-line-length
        this.menuList[a].children[b].children[c].indeterminate = arr1.length > 0 && arr1.length < this.menuList[a].children[b].children[c].auths.length;
        this.menuList[a].children[b].children[c].allChecked = arr1.length === this.menuList[a].children[b].children[c].auths.length;
    }

    async save() {
        const params = { authIds: [], menuIds: [], roleId: this.id };
        this.menuList.map(item => {
            item.children.map(el => {
                el.children.map(menu => {
                    menu.auths.map(auth => {
                        if (auth.checked) {
                            params.authIds.push(auth.id);
                            params.menuIds.push(menu.id);
                        }
                    });
                });
            });
        });
        params.menuIds = [...new Set(params.menuIds)];
        const res = await this.roleAuthService.roleSetAuth(params);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }
        this.message.success(res.message);
        this.returnToList();
    }

    returnToList() {
        this.returnBack.emit();
    }

    async getMenuList() {
        this.menuSer.getMenuLists().subscribe((resData) => {
            this.menuList = resData;
            this.menuList.map(item => {
                item.children.map(el => {
                    el.children.map(menu => {
                        menu.allChecked = false;
                        menu.indeterminate = false;
                        menu.auths.map(auth => {
                            auth.checked = false;
                            auth.label = auth.name;
                        });
                    });
                });
            });
            this.getAuthDetail();
        });
    }


    async getAuthDetail() {
        const res = await this.roleAuthService.roleMenuAuth(this.id);
        if (res.status !== 0) {
            this.message.error(res.message);
            return;
        }

        if (res.data.authIds && res.data.authIds.length) {
            res.data.authIds.map(chd => {
                this.menuList.map(item => {
                    item.children.map(el => {
                        el.children.map(menu => {
                            menu.choosedOption = [];
                            menu.auths.map(auth => {
                                if (chd === auth.id) {
                                    auth.checked = true;
                                }
                                if (auth.checked) {
                                    menu.choosedOption.push(auth);
                                }
                            });
                        });
                    });
                });
            });

            this.menuList.map(item => {
                item.children.map(el => {
                    el.children.map(menu => {
                        menu.allChecked = menu.auths.length !== 0 && menu.choosedOption.length === menu.auths.length;
                        menu.indeterminate = menu.choosedOption.length !== 0 && menu.choosedOption.length < menu.auths.length;
                    });
                });
            });
        }
    }

    ngOnInit() {
        this.getMenuList();
    }

}
