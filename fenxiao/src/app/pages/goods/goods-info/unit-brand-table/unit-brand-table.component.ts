import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '@app/core/common-services/goods.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-unit-brand-table',
    templateUrl: './unit-brand-table.component.html',
    styleUrls: ['./unit-brand-table.component.less']
})
export class UnitBrandTableComponent implements OnInit {
    @Input() productObj: any;
    @Input() modalTitle: any;
    listOfData: any;
    tableHeadTitle: any;
    constructor(
        private goodsService: GoodsService,
        private message: NzMessageService,
    ) {

    }

    async deleteBrand(item, index) {
        if (item.id) {
            const res = await this.goodsService.deleteUnit(item.id, this.productObj.other);
            if (res.code === 0) {
                this.deleteFn(index);
            } else {
                this.message.error(res.message);
            }
        } else {
            this.deleteFn(index);
        }
    }

    deleteFn(index) {
        const arr = this.listOfData;
        arr.splice(index, 1);
        this.listOfData = JSON.parse(JSON.stringify(arr));
    }

    addUnit() {
        const tempArr = this.listOfData || [];
        tempArr.push({
            name: '',
            status: 1
        });
        this.listOfData = JSON.parse(JSON.stringify(tempArr));
    }

    editBrand(val, index?) {
        val.status = 1;
    }

    saveSingle(item, val?) {
        if (!item.name) {
            this.message.error('必填项需填写');
            return;
        }

        if (item.id) {
            // edit
            this.goodsService.editUnit({ id: item.id, name: item.name }, this.productObj.other).then(res => {
                if (res.code === 0) {
                    item.status = 0;
                    this.getAllUnitslist(this.productObj.list);
                } else {
                    this.message.error(res.message);
                }
            }).catch(err => {
                this.message.error(err.message || err);
            });
        } else {
            // add
            this.goodsService.addUnit(item.name, this.productObj.other).then(res => {
                if (res.code === 0) {
                    item.status = 0;
                    this.getAllUnitslist(this.productObj.list);
                } else {
                    this.message.error(res.message);
                }
            }).catch(err => {
                this.message.error(err.message || err);
            });
        }
    }

    cancelSingle(item, index) {
        if (item.name && item.id) {
            item.status = 0;
        } else {
            this.deleteBrand(item, index);
        }
    }

    async getAllUnitslist(str) {
        const res = await this.goodsService.getAllUnitsList(null, str);
        if (res.code !== 0) {
            this.message.error(res.message);
        } else {
            this.listOfData = res.value;
        }
    }

    ngOnInit() {
        this.getAllUnitslist(this.productObj && this.productObj.list || null);
        this.tableHeadTitle = this.modalTitle.substr(2);
    }

}
