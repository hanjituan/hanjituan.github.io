import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../infra/http/http-util.service';
import { map } from 'rxjs/operators';

export namespace OrganizServiceNs {

    export interface AddParamsModel {
        name: string;
        mobile: string | number;
        loginName: string;
        password: number;
        status: number;
        roleIds: Array<string>;
    }

    interface UseParamsModel {
        lock?: number;
        userIds: Array<string>;
    }

    export interface AuthAnyResModel extends HttpUtilNs.UfastHttpRes {
        status: number;
        value: any;
    }

    export class OrganizServiceClass {
        private http: HttpUtilService;
        public userBaseInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
            this.userBaseInfo = null;
        }

        public getUserInfo() {
            return this.userBaseInfo = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
        }

        deptAdd(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            Object.assign(config.headers = {}, this.getUserInfo());
            return this.http.Post<any>(`department/add`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        deptDel(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            Object.assign(config.headers = {}, this.getUserInfo());
            return this.http.Post<any>(`department/delete`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        deptChildrenList(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            Object.assign(config.headers = {}, this.getUserInfo());
            return this.http.Get<any>(`department/listChildren`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        deptUpdate(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            Object.assign(config.headers = {}, this.getUserInfo());
            return this.http.Post<any>(`department/update`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        roleItem(params): Promise<any> { // 详情
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            Object.assign(config.headers = {}, this.getUserInfo());
            return this.http.Get<any>(`department/item`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }
    }
}

@Injectable()

export class OrganizService extends OrganizServiceNs.OrganizServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }

}
