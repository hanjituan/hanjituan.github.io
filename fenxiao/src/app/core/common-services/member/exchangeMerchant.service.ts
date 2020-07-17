import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../infra/http/http-util.service';
import { map } from 'rxjs/operators';

export namespace ExchangeMerchantServiceNs {


    export class ExchangeMerchantServiceClass {
        private http: HttpUtilService;
        public userInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        // POST/memberExchMch/adds添加商户
        // POST/memberExchMch/list兑换商户列表接口
        // POST/memberExchMch/settle结算积分
        // POST/memberExchMch/stateChange状态变更
        // POST/MemberIntegrationLog/exchList商户兑换明细列表
        // POST/MemberIntegrationLog/exchListExport商户兑换明细列表导出
        // POST/memberMchSettleDtl/export导出
        // POST/memberMchSettleDtl/list积分兑换明细列表接口

        public addMecharnt(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('memberExchMch/adds', params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        public exchangeMecharntList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('memberExchMch/list', params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        public settleIntegral(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('memberExchMch/settle', params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        public stateChange(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('memberExchMch/stateChange', params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        public getExchList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('MemberIntegrationLog/exchList', params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        public integralExchangeList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('memberMchSettleDtl/list', params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }


    }
}

@Injectable()

export class ExchangeMerchantService extends ExchangeMerchantServiceNs.ExchangeMerchantServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
