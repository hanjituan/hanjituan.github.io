import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../infra/http/http-util.service';
import { map } from 'rxjs/operators';

export namespace ActivenessServiceNs {

    // /reportStaticXdesBill/merchantBillActivityList 商户活跃度统计
    export class ActivenessServiceClass {
        private http: HttpUtilService;
        public userInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        public getActiveList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('reportStaticXdesBill/merchantBillActivityList', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
    }
}

@Injectable()

export class ActivenessService extends ActivenessServiceNs.ActivenessServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
