import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from '../infra/http/http-util.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export namespace InventoryServiceNs {
    export class InventoryServiceClass {
        private http: HttpUtilService;
        constructor(private injector: Injector) {
            this.http = injector.get(HttpUtilService);
        }

        getInventoryList(params): Observable<HttpUtilNs.UfastResListT<any>> {
            return this.http.Post('', params);
        }

        // // /business/inventoryPurchaseIn / list // 列表接口
        getDataList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Post<any>('inventoryPurchaseIn/list', Object.assign(params), config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // business/inventoryPurchaseIn/getDtlsByBillId/123213  详情
        // getPurhcaseInfoWithDtlsByBillId/{billId}
        // 改用这个接口  /business/inventoryPurchaseIn/getPurhcaseInfoWithDtlsByBillId/{billId}
        getDetail(id: number | string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Get<any>('inventoryPurchaseIn/getPurhcaseInfoWithDtlsByBillId/' + id, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        getLogs(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Post<any>('operatelog/list', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        getInvCheckTaskList(params): Observable<HttpUtilNs.UfastHttpResT<HttpUtilNs.UfastResListT<any>>> {
            return this.http.Post('/business/invcheckTask/list', params);
        }

        getTaskDetail(id): Promise<HttpUtilNs.UfastHttpResT<any>> {
            return this.http.Get('/business/invcheckTask/checkList', { id }).toPromise();
        }

        getInvCheckOrderDetail(id, params): Observable<HttpUtilNs.UfastHttpResT<any>> {
            return this.http.Post(`/business/invcheck/getInvcheckInfoWithPageDtls?id=${id}`, params);
        }

        getOperateLog(billId) {
            return this.http.Post('/business/operatelog/list', { filters: { billId }, pageNum: 1, pageSize: 0 });
        }

        getCheckedProductlist(taskId, params): Promise<HttpUtilNs.UfastHttpResT<any>> {
            return this.http.Post(`/business/invcheckTask/checkedProductInfo?taskId=${taskId}`, params).toPromise();
        }


        /*************************************** 库存出库 **********************************/

        // POST /InvpurchaseOut/manageList 管理端库存出库表列表接口（含报损单据）
        inventoryOutList(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Post<any>('InvpurchaseOut/manageList', params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        // "GET /InvpurchaseOut/detail 库存出库表详情接口
        // "GET /Invreporloss/detail 库存报损表详情接口
        inventoryOutDetai(id: string | number, val: string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Get<any>(val + '/detail?billId=' + id, null, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

    }
}
@Injectable()
export class InventoryService extends InventoryServiceNs.InventoryServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
