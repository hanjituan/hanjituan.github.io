import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../infra/http/http-util.service';
import { map } from 'rxjs/operators';

export namespace MemberServiceNs {


    export class MemberServiceClass {
        private http: HttpUtilService;
        public userInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }


        //     POST/Member/list会员用户信息表列表接口
        // GET / Member / detailById通过会员id查询会员信息接口
        // POST / Member / stateChange状态变更
        // POST/MemberIntegrationLog/list  会员积分变动信息列表接口
        //     POST/MemberIntegrationLog/adminAdd管理端增加积分
        // POST / MemberIntegrationLog / adminReduce管理端减少积分

        public memberList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('Member/list', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public memberChangeState(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('Member/stateChange', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public getMemberDetail(id: number | string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Get<any>('Member/detailById?id=' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public integralChange(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('MemberIntegrationLog/list', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public integralAdd(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('MemberIntegrationLog/adminAdd', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public integralReduce(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('MemberIntegrationLog/adminReduce', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
    }
}

@Injectable()

export class MemberService extends MemberServiceNs.MemberServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
