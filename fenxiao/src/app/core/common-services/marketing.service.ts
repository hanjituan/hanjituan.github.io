import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { map } from 'rxjs/operators';


export namespace MarketingServiceNs {


    export class MarketingServiceClass {
        private http: HttpUtilService;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        // *************************************** 折扣 ***************************************

        // POST /marketing/discountspecial/list 全部列表
        public getDataList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Post<any>('discountspecial/list', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // POST /marketing/discountspecial/add 新增折扣特价活动
        public addMarketing(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Post<any>('discountspecial/add', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // GET /marketing/discountspecial/detail 查看活动详情
        public getDetail(id: number | string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Get<any>('discountspecial/detail?id=' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // POST /marketing/discountspecial/addProduct 新增折扣特价活动商品
        public addMarketingProduct(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Post<any>('discountspecial/addProduct', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
        // POST /marketing/discountspecial/modify 修改折扣特价活动
        public editMarketingActive(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Post<any>('discountspecial/modify', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // 活动删除 用这个 POST /marketing/discountspecial/delActivity 删除折扣特价活动
        public deleteMarketing(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Post<any>('discountspecial/delActivities',  params , config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // POST /marketing/discountspecial/delProduct 删除折扣特价活动商品
        public deleteMarketingProduct(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Post<any>('discountspecial/delProduct', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // GET /marketing/discountspecial/disable/{id} 禁用用折扣特价活动
        public disableMarketing(id: number | string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Get<any>('discountspecial/disable/' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // GET /marketing/discountspecial/enable/{id} 启用折扣特价活动
        public enableMarketing(id: number | string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Get<any>('discountspecial/enable/' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // POST /marketing/discountspecial/getMinProductDiscountPrice 查找商品最低折扣特价
        public getMarketinglower(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Post<any>('discountspecial/getMinProductDiscountPrice', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // POST /marketing/discountspecial/modify 修改折扣特价活动
        public editMarketing(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Post<any>('discountspecial/modify', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // POST /marketing/discountspecial/modifyProductDiscountPrice 修改折扣特价活动商品折扣价
        public editDiscountMarketing(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Post<any>('discountspecial/modifyProductDiscountPrice', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // POST /marketing/discountspecial/validList 仅有效且启用列表
        public enableDiscountMarketingList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Marketing;
            return this.http.Post<any>('discountspecial/modifyProductDiscountPrice', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
    }
}

@Injectable()

export class MarketingService extends MarketingServiceNs.MarketingServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
