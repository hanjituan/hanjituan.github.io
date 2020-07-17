import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../infra/http/http-util.service';
import { map } from 'rxjs/operators';

export namespace EmployeeServiceNs {

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

    export class EmployeeServiceClass {
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

        public getEmployeeList(params: any): Promise<AuthAnyResModel> { // 获取员工列表
            const config: HttpUtilNs.UfastHttpConfig = {};
            Object.assign(config.headers = {}, this.getUserInfo());
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('user/list', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public addEmployee(addEmpParams: AddParamsModel): Promise<AuthAnyResModel> {// 新增员工
            const config: HttpUtilNs.UfastHttpConfig = {};
            Object.assign(config.headers = {}, this.getUserInfo());
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('user/add', addEmpParams, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public editEmployee(addEmpParams: AddParamsModel): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            Object.assign(config.headers = {}, this.getUserInfo());
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('user/update', addEmpParams, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public resetPsd(params): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            Object.assign(config.headers = {}, this.getUserInfo());
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('user/updatePassword', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public setEmployeeLock(useParams: UseParamsModel, url: string): Promise<AuthAnyResModel> { // 停用/启用
            const config: HttpUtilNs.UfastHttpConfig = {};
            Object.assign(config.headers = {}, this.getUserInfo());
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>(url, useParams, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }
    }
}

@Injectable()

export class EmployeeService extends EmployeeServiceNs.EmployeeServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }

}
