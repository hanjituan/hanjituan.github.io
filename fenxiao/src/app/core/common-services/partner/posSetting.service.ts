import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../infra/http/http-util.service';
import { map } from 'rxjs/operators';

export namespace PosServiceNs {


    export class PosServiceClass {
        private http: HttpUtilService;
        public userInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        public posSave(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('serviceFee/save', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public posCheck(id: number | string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Get<any>('serviceFee/listByMarketId?marketId=' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }


    }
}

@Injectable()

export class PosService extends PosServiceNs.PosServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
