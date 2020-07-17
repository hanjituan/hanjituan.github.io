import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { IntegralService } from '@app/core/common-services/member/integral.service';
import { ignoreElements } from 'rxjs/operators';

@Component({
    selector: 'app-integral',
    templateUrl: './integral.component.html',
    styleUrls: ['./integral.component.less']
})
export class IntegralComponent implements OnInit, AfterViewInit {
    isLoadingOne: boolean;
    interRuleObj: any;
    currentId: any;
    constructor(
        private message: NzMessageService,
        private inteSer: IntegralService,
    ) {
        this.interRuleObj = {
            integrationRuleState: false,
            integrationExchangeState: false,
            isLimit: 1,
        };
        this.isLoadingOne = false;
    }

    async saveForm() {
        console.log(this.interRuleObj);

        if (this.interRuleObj.integrationRuleState) {
            if (!this.interRuleObj.bankMoney) {
                this.message.warning('请填写当会员通过直销银行支付多少元');
                return;
            }

            if (!this.interRuleObj.bankIntegral) {
                this.message.warning('请填写当会员通过直销银行支付元,自动积分数');
                return;
            }

            if (!this.interRuleObj.memberMoney) {
                this.message.warning('请填写当会员通过扫码付支付多少元');
                return;
            }

            if (!this.interRuleObj.memberIntegral) {
                this.message.warning('请填写当会员通过扫码付支付多少元,自动积分数');
                return;
            }

            if (!this.interRuleObj.singleIntegralMax && !this.interRuleObj.unlimitSingle) {
                this.message.warning('单次积分限制不能为空');
                return;
            }

            if (!this.interRuleObj.allIntegralMax && !this.interRuleObj.unlimitAll) {
                this.message.warning('累积积分限制不能为空');
                return;
            }
        }

        if (this.interRuleObj.integrationExchangeState) {
            if (!this.interRuleObj.isLimit && !this.interRuleObj.integralLimit) {
                this.message.warning('请填写当兑换积分上限值');
                return;
            }

            if (!this.interRuleObj.exchangeIntegral) {
                this.message.warning('请填写设置积分兑换比例的积分');
                return;
            }

            if (!this.interRuleObj.exchangeMoney) {
                this.message.warning('请填写设置积分兑换比例的金钱');
                return;
            }
        }

        this.isLoadingOne = true;
        const params: any = {
            integrationRuleState: this.interRuleObj.integrationRuleState,
            ruleAddVOList: [
                {
                    getIntegration: this.interRuleObj.bankIntegral,
                    payReaches: this.interRuleObj.bankMoney,
                    payType: 1
                },
                {
                    getIntegration: this.interRuleObj.memberIntegral,
                    payReaches: this.interRuleObj.memberMoney,
                    payType: 2
                }
            ],

            singleIntegrationMax: this.interRuleObj.unlimitSingle ? -1 : this.interRuleObj.singleIntegralMax,
            totalIntegrationMax: this.interRuleObj.unlimitAll ? -1 : this.interRuleObj.allIntegralMax,


            integrationExchangeState: this.interRuleObj.integrationExchangeState,
            singleExchangeMax: this.interRuleObj.isLimit === 1 ? -1 : this.interRuleObj.integralLimit,
            exchangeAmount: this.interRuleObj.exchangeMoney,
            exchangeReaches: this.interRuleObj.exchangeIntegral,
        };
        if (this.currentId) {
            params.id = this.currentId;
        }

        const res = await this.inteSer.integralSave(params);
        if (res.code !== 0) {
            this.message.error(res.message);
            return;
        }
        this.message.success(res.message);
        this.init();
        this.isLoadingOne = false;
    }

    clickSwitch(str) {
        this.interRuleObj[str] = !this.interRuleObj[str];
    }

    changeLabel(value) {
        this.interRuleObj.isLimit = value;
    }

    async init() {
        const res = await this.inteSer.integralDetail(null);
        if (res.code !== 0) {
            return;
        }
        if (res.data) {
            this.interRuleObj.integrationRuleState = res.data.integrationRuleState;
            res.data.ruleListItemVOS.map(item => {
                if (item.payType === 1) {
                    this.interRuleObj.bankMoney = item.payReaches;
                    this.interRuleObj.bankIntegral = item.getIntegration;
                }
                if (item.payType === 2) {
                    this.interRuleObj.memberMoney = item.payReaches;
                    this.interRuleObj.memberIntegral = item.getIntegration;
                }
            });

            if (res.data.singleIntegrationMax === -1) {
                this.interRuleObj.unlimitSingle = true;
            } else {
                this.interRuleObj.unlimitSingle = false;
                this.interRuleObj.singleIntegralMax = res.data.singleIntegrationMax;
            }

            if (res.data.totalIntegrationMax === -1) {
                this.interRuleObj.unlimitAll = true;
            } else {
                this.interRuleObj.unlimitAll = false;
                this.interRuleObj.allIntegralMax = res.data.totalIntegrationMax;
            }


            if (res.data.singleExchangeMax === -1) {
                this.interRuleObj.isLimit = 1;
            } else {
                this.interRuleObj.isLimit = 0;
                this.interRuleObj.integralLimit = res.data.singleExchangeMax;
            }
            this.interRuleObj.integrationExchangeState = res.data.integrationExchangeState;
            this.interRuleObj.exchangeMoney = res.data.exchangeAmount;
            this.interRuleObj.exchangeIntegral = res.data.exchangeReaches;
            this.currentId = res.data.id;
        }
    }

    ngOnInit() { }

    ngAfterViewInit() {
        this.init();

    }

}
