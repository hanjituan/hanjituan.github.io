import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../infra/http/http-util.service';
import { map } from 'rxjs/operators';

export namespace MarketServiceNs {

    export interface TestModel {
        email?: string;
        mobile?: string;
        areaCode: string;
        loginName: string;
        name: string;
        password: string;
        telephone: string;
    }

    export class MarketServiceClass {
        private http: HttpUtilService;
        public userInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }


        public marAdd(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('market/add', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public marDetail(id: number): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Get<any>(`market/item?id=${id}`, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public marLock(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('market/lock', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public marketList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('market/list', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public marUpdate(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('market/update', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }


        public settleMerchantList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>('settledInCompany/list', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public settleMerchantDel(id: number): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Get<any>(`settledInCompany/del?orgId=${id}`, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public settleMerchantAsync(ids: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>(`CompanyTdbcInfo/synchro`, ids, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public marketInfoDetail(id: number): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Get<any>(`CompanyTdbcInfo/item?orgId=${id}`, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public settleMerchantSave(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>(`CompanyTdbcInfo/save`, params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public allMerchantList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>(`company/list`, params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public addSettledMerchant(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Bs;
            return this.http.Post<any>(`settledInCompany/settled`, params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
    }
}

@Injectable()

export class MarketService extends MarketServiceNs.MarketServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
