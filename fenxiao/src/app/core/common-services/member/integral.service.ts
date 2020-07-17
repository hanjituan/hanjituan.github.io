import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../infra/http/http-util.service';
import { map } from 'rxjs/operators';

export namespace IntegralServiceNs {


    export class IntegralServiceClass {
        private http: HttpUtilService;
        public userInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        // POST / MemberIntegrationConfig / save会员积分设置表保存接口
        // GET/MemberIntegrationConfig/detail会员积分设置表详情接口

        public integralSave(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('MemberIntegrationConfig/save', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public integralDetail(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Get<any>('MemberIntegrationConfig/detail', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

    }
}

@Injectable()

export class IntegralService extends IntegralServiceNs.IntegralServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
