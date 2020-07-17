import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { map } from 'rxjs/operators';



export namespace SaleServiceNs {

    export interface TestModel {
        email?: string;
        mobile?: string;
        areaCode: string;
        loginName: string;
        name: string;
        password: string;
        telephone: string;
    }

    export class SaleServiceClass {
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

        public getSaleList(params: any): Promise<any> {
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


        // *************************************** 进货入库 ***************************************
        // /business/inventorySaleOut / detail 获取详情接口
        public checkDetail(id: number | string, str: string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Get<any>(str + '/detail?billId=' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /business/inventorySaleOut/saleOutLogList  获取日志接

        public getLog(billId: number | string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Post('/business/operatelog/list', { filters: { billId }, pageNum: 1, pageSize: 0 })
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // *************************************** 库存查询 ***************************************
        // /business/inventory/list 库存列表接口
        public getInventoryList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Post<any>('inventory/list', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /business/inventory/export 库存列表导出接口
        public inventoryListExport(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Post<any>('inventory/export', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /business/inventory/listdtl 库存列表明细接口
        public inventoryListDetail(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Post<any>('inventory/listdtl', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public getProUomList(productId): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Get<any>('productUom/productUomListForInvt', { productId }, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
    }
}

@Injectable()

export class SaleService extends SaleServiceNs.SaleServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
