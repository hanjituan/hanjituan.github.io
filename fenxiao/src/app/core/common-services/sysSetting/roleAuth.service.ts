import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../infra/http/http-util.service';
import { map } from 'rxjs/operators';


export namespace RoleAuthServiceNs {

    export class RoleAuthServiceClass {
        private http: HttpUtilService;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        // Post
        roleAdd(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            return this.http.Post<any>(`role/add`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        roleList(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            return this.http.Post<any>(`role/list`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        roleDel(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            return this.http.Post<any>(`role/deleteBatch`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        roleUpdate(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            return this.http.Post<any>(`role/update`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        roleSetAuth(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            return this.http.Post<any>(`role/setRoleMenuAuths`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        // get
        roleMenuAuth(id): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            return this.http.Get<any>(`role/getMenuAuths?roleId=${id}`, null, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

        roleItem(params): Promise<any> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            return this.http.Get<any>(`role/item`, params, config).pipe(map((resData: any) => {
                return resData;
            })).toPromise();
        }

    }


}

@Injectable()

export class RoleAuthService extends RoleAuthServiceNs.RoleAuthServiceClass {

    constructor(injector: Injector) {
        super(injector);
    }

}
