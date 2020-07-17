import {Injectable, Injector} from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { Observable } from 'rxjs';
import { VersionsModel } from './../models/ops-model';
export namespace OpsServiceNs {
  export class OpsServiceClass {
    private http: HttpUtilService;
    constructor(private injector: Injector) {
        this.http = this.injector.get(HttpUtilService);
    }

    getVersionList(param): Observable<HttpUtilNs.UfastHttpResListT<VersionsModel>> {
        return this.http.Post('/SysAppPackage/list', param);
    }

    addVersion(param): Observable<HttpUtilNs.UfastHttpRes> {
        return this.http.Post('/SysAppPackage/insert', param);
    }

    deleteVersion(id): Observable<HttpUtilNs.UfastHttpRes> {
        return this.http.Get('/SysAppPackage/delete', { id });
    }
  }
}
@Injectable()
export class OpsService extends OpsServiceNs.OpsServiceClass {
  constructor(injector: Injector) {
    super(injector);
  }
}
