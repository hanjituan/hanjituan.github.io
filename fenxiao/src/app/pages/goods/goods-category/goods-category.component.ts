import { filter } from 'rxjs/internal/operators';
import { Component, OnInit } from '@angular/core';
import { GoodsService } from '@app/core/common-services/goods.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

export interface TreeNodeInterface {
    status: number;
    key: number;
    name: string;
    age?: number;
    level?: number;
    expand?: boolean;
    address?: string;
    children?: TreeNodeInterface[];
    parent?: TreeNodeInterface;
    id?: number;
}

@Component({
    selector: 'app-goods-category',
    templateUrl: './goods-category.component.html',
    styleUrls: ['./goods-category.component.less']
})
export class GoodsCategoryComponent implements OnInit {
    nodes: any;
    validateForm: FormGroup;
    confirmModal: NzModalRef;
    listOfData: any;
    isVisible = false;
    editVisible = false;
    listOfMapData: TreeNodeInterface[] = [];
    mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
    modalTitle = '';
    currentCateObj: any;
    currentItem: any;
    currentIndex: any;
    constructor(
        private fb: FormBuilder,
        private goodsService: GoodsService,
        private message: NzMessageService,
        private modal: NzModalService,
    ) {
        this.listOfMapData = [];
        this.currentCateObj = {
            name: null,
            id: null
        };
    }

    editCatery(item, index) {
        item.status = 0;
        this.currentCateObj = {
            name: item.name,
            id: item.id
        };
        this.currentItem = item;
        this.currentIndex = index;
        this.editVisible = true;
    }

    async deleteCatery(item, index) {
        this.confirmModal = this.modal.confirm({
            nzTitle: `确定删除当前分类?`,
            nzContent: ``,
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.goodsService.deleteCategoryById(item.id).then((res: any) => {
                        if (res.code === 0) {
                            this.message.success(res.message);
                            this.listOfMapData.map((its, ind) => {
                                if (its.id === item.id) {
                                    this.listOfMapData.splice(index, 1);
                                }
                                if (its.id === item.parentId) {
                                    this.listOfMapData[ind].children.splice(index, 1);
                                }
                            });
                        } else {
                            this.message.error(res.message);
                        }
                        resolve();
                    });
                }).catch(() => console.log('Oops errors!'))
        });
    }

    showModal(val) {
        this.modalTitle = val;
        this.isVisible = true;
    }

    addCatery(item, index) {
        this.validateForm.patchValue({
            parentName: item.name,
        });
        this.showModal('edit');
        this.currentItem = item;
        this.currentIndex = index;
    }

    handleCancel(): void {
        this.isVisible = false;
        this.editVisible = false;
    }

    handleOk(): void {
        this.submitForm();
    }

    async submitForm() {
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        if (this.validateForm.invalid) {
            return;
        }

        const params = {
            level: this.modalTitle === 'add' ? 1 : this.currentItem.level + 1,
            name: this.validateForm.getRawValue().name,
            parentId: this.modalTitle === 'add' ? 0 : this.currentItem.id
        };

        const res = await this.goodsService.addCategory(params);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        this.message.success(res.message);

        if (this.modalTitle === 'add') {
            // this.validateForm.reset();
            this.init();
        } else {
            this.expandItem(this.currentItem, this.currentIndex, true);
        }
        this.validateForm.reset();
        this.isVisible = false;


        // if (this.modalTitle === 'add') {
        //     const params = {
        //         level: 1,
        //         name: this.validateForm.getRawValue().name,
        //         parentId: 0
        //     };
        //     const res = await this.goodsService.addCategory(params);
        //     if (res.code !== 0) {
        //         this.message.error(res.message);
        //         return;
        //     }
        //     this.message.success(res.message);
        //     this.validateForm.reset();
        //     this.init();
        // } else {
        //     const params = {
        //         level: this.currentItem.level + 1,
        //         name: this.validateForm.getRawValue().name,
        //         parentId: this.currentItem.id
        //     };
        //     const res = await this.goodsService.addCategory(params);
        //     if (res.code !== 0) {
        //         this.message.error(res.message);
        //         return;
        //     }
        //     this.message.success(res.message);
        //     this.expandItem(this.currentItem, this.currentIndex, true);
        // }
    }






    async handleEditOk() {
        const res = await this.goodsService.editCategory(this.currentCateObj);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        this.init();
        this.message.success(res.message);
        this.editVisible = false;
    }


    async expandItem(data, index, changeShow?) {
        if (!changeShow) {
            data.show = !data.show;
        }
        if (data.show) {
            const res = await this.goodsService.getCategoryListByParent({ parentId: data.id });
            res.value.map((item, key) => {
                item.status = 1;
                item.children = [];
                item.show = false;
            });
            this.listOfMapData[index].children = res.value;
        }
    }

    async expandThird(data, index, firstIndex) {
        data.show = !data.show;
        if (data.show) {
            const res = await this.goodsService.getCategoryListByParent({ parentId: data.id });
            res.value.map((item, key) => {
                item.status = 1;
                item.children = [];
                item.show = false;
            });
            this.listOfMapData[firstIndex].children[index].children = res.value;
        }
    }

    async init() {
        const res = await this.goodsService.getCategoryListByParent({ parentId: 0 });
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        res.value.map((item, index) => {
            item.status = 1;
            item.children = [];
            item.show = false;
        });
        this.listOfMapData = res.value;
    }

    initForm() {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            parentName: [null]
        });
    }

    ngOnInit(): void {
        this.init();
        this.initForm();
    }
}
