import { MerchantService } from './../../../core/common-services/merchant.service';
import { Component, OnInit } from '@angular/core';
import { MercAppData } from './../../../core/models/merchant-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowMessageService } from '@app/compontents/widget/show-message/show-message';
import { Location } from '@angular/common';
@Component({
    selector: 'app-editMerchantTplRights',
    templateUrl: './editMerchantTplRights.component.html',
    styleUrls: ['./editMerchantTplRights.component.less']
})
export class EditMerchantTplRightsComponent implements OnInit {
    isDetail: boolean;
    rightListData: any[];
    id: string;
    constructor(private merchantSer: MerchantService,
                private activeRouter: ActivatedRoute,
                private message: ShowMessageService,
                private location: Location) {
        this.rightListData = JSON.parse(JSON.stringify(MercAppData.mercPrivilege));
        this.activeRouter.queryParams.subscribe(queryParams => {
            console.info(queryParams);
            if (queryParams['id']) {
                this.id = queryParams['id'];
            }
            this.isDetail = queryParams['isDetail'] === 'true';
            this.getRightData();
        });
    }

    getRightData() {
        this.merchantSer.getRightByTplId(this.id).subscribe((res) => {
            const rights = res.data || [];
            this.rightListData.forEach((item) => {
                this.setInitData(item, rights);
                this.setParentCheck(item);
            });
        });
    }
    setInitData(item, rightsList: number[]) {
        function iteration(obj) {
            if (!obj.children) {
                return;
            }
            if (obj.children.length > 0) {
                obj.children.forEach((child) => {
                    iteration(child);
                });
                return;
            }
            obj.value = rightsList.indexOf(obj.Id.toString()) !== -1;
        }
        iteration(item);
    }
    selectedData(curData, parentData?) {
        const res = curData.value;
        curData.value = res;
        console.info(res);
        if (curData.children) {
            this.selectedChildren(curData.children, res);
        }
        this.rightListData.forEach((item) => {
            this.setParentCheck(item);
        });
    }

    selectedChildren(child: any[], value) {
        child.forEach((item) => {
            item.value = value;
            if (!item.children) {
                return;
            }
            if (item.children.length === 0) {
                return;
            }
            this.selectedChildren(item.children, value);
        });
    }

    setParentCheck(parent) {
        parent.children.forEach(child => {
            if (!child.children) {
                return;
            }
            if (child.children.length === 0) {
                return;
            }
            this.setParentCheck(child);
        });
        parent.value = (parent.children as Array<any>).every((child) => {
            return !!child.value;
        });
        if (parent.value) {
            parent.indeterminate = false;
            return;
        }
        parent.indeterminate = (parent.children as Array<any>).some((child) => {
            return !!child.value;
        });
    }

    getCheckedRight(item): number[] {
        const rightsList = [];
        function iteration(obj) {
            if (!obj.children) {
                return;
            }
            if (obj.children.length > 0) {
                obj.children.forEach((child) => {
                    iteration(child);
                });
                return;
            }
            if (!obj.value) {
                return;
            }
            rightsList.push(obj.Id.toString());
        }
        iteration(item);
        return rightsList;
    }
    save() {
        const rightsList = [];
        this.rightListData.forEach((item) => {
            rightsList.push(...this.getCheckedRight(item));
        });
        this.merchantSer.setRights({
            templateId: this.id,
            moduleIdList: rightsList
        }).subscribe(res => {
            //TODO:
            this.message.showToastMessage('操作成功', 'success');
            this.backTo();
        });
    }

    backTo() {
        this.location.back();
    }
    ngOnInit() {
    }

}
