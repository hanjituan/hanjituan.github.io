import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../infra/http/http-util.service';
import { map } from 'rxjs/operators';

export namespace StockServiceNs {

    export interface TestModel {
        email?: string;
        mobile?: string;
        areaCode: string;
        loginName: string;
        name: string;
        password: string;
        telephone: string;
    }

    export class StockServiceClass {
        private http: HttpUtilService;
        public userInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }
        public getList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('reportStaticXdesMch/saleManCompanyStatisList', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
    }
}

@Injectable()

export class StockService extends StockServiceNs.StockServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
