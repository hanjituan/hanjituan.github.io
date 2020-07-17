import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SaleService } from '@app/core/common-services/sale.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-sale-detail',
    templateUrl: './sale-detail.component.html',
    styleUrls: ['./sale-detail.component.less']
})
export class SaleDetailComponent implements OnInit {
    @Output() returnBack = new EventEmitter<any>();
    @Input() itemObj: any;
    oprateLogList: any[];
    detailInfo: any;
    settleObj: any;

    constructor(private saleSer: SaleService, private message: NzMessageService, ) {
        this.oprateLogList = [];
        this.detailInfo = {};
    }


    returnToList() {
        this.returnBack.emit();
    }

    async getDetail() {
        let str;
        this.itemObj.billType === 1001 ? str = 'inventorySaleOut' : str = 'invsaleReturned';
        const res = await this.saleSer.checkDetail(this.itemObj.billId, str);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        this.transformData(res);
    }

    transformData(res) {
        if (res.value && res.value.settleBillDetails && res.value.settleBillDetails.length) {
            res.value.settleBillDetails.map((item, index) => {
                if (index === 0) {
                    item.totalValue = (res.value.totalValue).toFixed(2);
                    item.totalSettleDiscountValue = (res.value.totalSettleDiscountValue).toFixed(2);
                    item.totalSettleValue = (res.value.totalSettleValue).toFixed(2);
                }
                item.amount ? item.amount = (item.amount).toFixed(2) : item.amount = item.amount;
            });
        }
        res.value.totalValue ? res.value.totalValue = (res.value.totalValue).toFixed(2) : res.value.totalValue = res.value.totalValue;
        if (res.value && res.value.details && res.value.details.length) {
            res.value.details.map(item => {
                item.price ? item.price = (item.price).toFixed(2) : item.price = item.price;
                item.settlePrice ? item.settlePrice = (item.settlePrice).toFixed(2) : item.settlePrice = item.settlePrice;
                item.qty ? item.qty = (item.qty).toFixed(2) : item.qty = item.qty;
                item.totalSettleValue ? item.totalSettleValue = (item.totalSettleValue).toFixed(2) :
                    item.totalSettleValue = item.totalSettleValue;
            });
        }
        this.detailInfo = res.value;
    }

    async getLogList() {
        const res = await this.saleSer.getLog(this.itemObj.billId);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        this.oprateLogList = res.value;
    }
    ngOnInit() {
        this.settleObj = {
            title1: this.itemObj.billType === 1001 ? '应收' : '应付',
            title2: this.itemObj.billType === 1001 ? '收款账户' : '付款账户',
            title3: this.itemObj.billType === 1001 ? '收款金额' : '付款金额',
        };
        this.getDetail();
        this.getLogList();
    }

}
