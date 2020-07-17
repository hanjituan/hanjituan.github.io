import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { map } from 'rxjs/operators';
export namespace ReportServiceNs {
    export interface IncomeAndExpendModel {
        aliPayAmount: number;
        billType: number;
        billTypeName: string;
        cashAmount: number;
        otherPayAmount: number;
        wechatMicroPayAmount: number;
        wechatPayAmount: number;
    }

    export interface SaleReportModel {
        barcode: string;
        productName: string;
        seqNo: number;
        specification: string;
        salePrice: number;
        averageSalePrice: number;
        totalSaleAmount: number;
        totalSaleCostAmount: number;
        totalSaleProfit: number;
        totalSaleProfitRate: number;
        totalSaleQty: number;
        totalSaleReturnAmount: number;
        totalSaleReturnQty: number;
        uomName: string;
    }
    export class ReportServiceClass {
        private http: HttpUtilService;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        getIncomeAndExpendList(params): Observable<HttpUtilNs.UfastHttpResT<{ itemList: IncomeAndExpendModel[] }>> {
            return this.http.Post('/business/report/incomeAndExpendStatistics', params);
        }


        // /business/report/incomeAndExpendStatistics 账户收支统计
        getReportList(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Post<any>(`report/incomeAndExpendStatistics`, params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // getSaleReportList(params): Observable<HttpUtilNs.UfastHttpResT<any>> {
        //     return this.http.Post('/business/report/saleReportByProduct', params);
        // }

        getSaleReportList(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Post<any>(`report/saleReportByProduct`, params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
    }
}
@Injectable()
export class ReportService extends ReportServiceNs.ReportServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
