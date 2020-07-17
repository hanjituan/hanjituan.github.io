import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { map } from 'rxjs/operators';


export namespace WorkboardServiceNs {

    export class WorkboardServiceClass {
        private http: HttpUtilService;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        // /business/homePage/businessOverviewAndProdentRanking  POST
        getDatabase(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Post<any>(`homePage/businessOverviewAndProdentRanking`, params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        // /business/homePage/businessAnalysis  GET
        getAnalysisData(num: number | string): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Business;
            return this.http.Get<any>(`homePage/businessAnalysis?dateType=` + num, null, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

    }


}

@Injectable()

export class WorkboardService extends WorkboardServiceNs.WorkboardServiceClass {

    constructor(injector: Injector) {
        super(injector);
    }

}
