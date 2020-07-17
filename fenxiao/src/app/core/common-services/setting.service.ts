import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from '../infra/http/http-util.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export namespace SettingServiceNs {

    export class SettingServiceClass {
        private http: HttpUtilService;
        constructor(private injector: Injector) {
            this.http = injector.get(HttpUtilService);
        }

        // /company/companySetting / listAll
        // 获取店铺下所有配置信息
        // / company / companySetting / preserve
        // 保存单个配置

        public getAllConfig(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Post<any>('companySetting/listAll', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }

        public saveSingleConfig(params: any): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Post<any>('companySetting/preserve', params, config)
                .pipe(map((resData: any) => {
                    return resData;
                })).toPromise();
        }
    }
}

@Injectable()
export class SettingService extends SettingServiceNs.SettingServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
