import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { map } from 'rxjs/operators';

export namespace GoodsServiceNs {

    export interface TestModel {
        email?: string;
        mobile?: string;
        areaCode: string;
        loginName: string;
        name: string;
        password: string;
        telephone: string;
    }

    export class GoodsServiceClass {
        private http: HttpUtilService;
        public userInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }
        // 获取商品列表(分页，不带条件)
        public getGoodList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Post<any>('/product/list', Object.assign({ q: 'all' }, params), config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        //inventorySaleOut/posList
        public getPosProList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Post<any>('/product/posList', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/product/merchantAdd 商户端创建商品
        public addGood(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Post<any>('product/merchantAdd', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/product/merchantUpdate 商户端更新商品 Put
        public upDateGood(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Put<any>('product/merchantUpdate/', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }


        // /product/product/{id}  启用或停用商品	PUT
        public enableGoods(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Post<any>('/product/enabled', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/product/{id}   	查询商品详细信息	GET
        public getGoodDetail(id: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Get<any>('/product/product/' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/delete/{id}   	删除商品	DELETE
        public deleteGood(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Post<any>('/product/delete', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/generateBarcodeNumber  生成条形码编号  GET
        public generateBarcode(): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Get<any>('/product/generateBarcodeNumber', null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /company/pinyin/getFirstChar  接口，获取拼音首字母
        public getGoodsNameByFirstLetter(name: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Get<any>('/pinyin/getFirstChar?name=' + name, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }


        // /product/productCategories  参数 q=all  	商品分类列表	GET
        public getGoodsKind(): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Get<any>('/product/productCategories/', Object.assign({ q: 'all' }), config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/productUomItems   q=all	获取所有计量单位	GET  /product/productBrands     q=all	获取所有商标	GET
        public getAllUnitsList(params: any, str: string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Get<any>('/product/' + str, Object.assign({ q: 'all' }, params), config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/productUomItem	创建计量单位	POST   /product/productBrand 	创建商标	POST
        public addUnit(params: any, str: string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Post<any>('/product/' + str, params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/productUomItem/{id}	删除计量单位	DELETE  /product/productBrand/{id}	删除商标	DELETE
        public deleteUnit(id: number, str: string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Delete<any>('/product/' + str + '/' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/productUomItem	修改计量单位	PUT  /product/productBrand	修改商标	PUT
        public editUnit(params: any, str: string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Put<any>('/product/' + str, params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/productCategories  参数 q=all  	商品分类列表	GET
        public getAllGoodsList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Get<any>('/product/productCategories', Object.assign({ q: 'all' }, params), config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // ************************* 商品分类接口 ****************************

        // /product/productCategories  参数 q=all  	商品分类列表	GET
        public getCategoryList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Get<any>('/product/productCategories', Object.assign({ q: 'all' }, params), config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/productCategories  参数 q=parent  	根据父类获取所有子类	GET
        public getCategoryListByParent(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Get<any>('/product/productCategoriesByParent', Object.assign({ q: 'parent' }, params), config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/productCategory/{id}   	根据id获取分类信息	GET
        public getCategoryListById(id): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Get<any>('/product/productCategories?id=' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/productCategory/{id}   	根据id删除分类信息	DELETE
        public deleteCategoryById(id): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Delete<any>('product/productCategory/' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
        // /product/productCategory     	创建分类	POST
        public addCategory(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Post<any>('/product/productCategory', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /product/productCategory     	修改分类	PUT
        public editCategory(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Product;
            return this.http.Put<any>('/product/productCategory', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
    }
}

@Injectable()

export class GoodsService extends GoodsServiceNs.GoodsServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
