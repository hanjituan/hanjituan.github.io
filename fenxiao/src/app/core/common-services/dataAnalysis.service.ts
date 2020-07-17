import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { Observable } from 'rxjs';
export namespace DataAnalysisServiceNs {
    export class DataAnalysisServiceClass {
        private http: HttpUtilService;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        getBusinessActivityList() {
        }
    }
}
@Injectable()
export class DataAnalysisService extends DataAnalysisServiceNs.DataAnalysisServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
