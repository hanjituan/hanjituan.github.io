import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { map } from 'rxjs/operators';



export namespace DatabaseServiceNs {

    export interface PsdParamsModel {
        newPassword: string;
        oldPassword: string;
    }

    export interface VerifyCodeModel {
        tel: string;
        verifyCode: string;
    }

    export interface CompanyParamsModel {
        address: string;
        areaName: string;
        cityId: number;
        countyId: number;
        id: number;
        name: string;
        provinceId: number;
        edition?: string;
        registTime?: string;
    }

    export interface AddParamsModel {
        name: string;
        mobile: string | number;
        loginName: string;
        password: number;
        status: number;
        roleIds: Array<string>;
    }

    interface ListParamsModel {
        pageSize: number;
        pageNum: number;
        filters: any;
    }

    interface UseParamsModel {
        lock?: number;
        userIds: Array<string>;
    }

    export interface AuthAnyResModel extends HttpUtilNs.UfastHttpRes {
        status: number;
        value: any;
    }

    export class DatabaseServiceClass {
        private http: HttpUtilService;
        public userInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        /*********************************** 我的店铺***********************************/
        public getCompanyDetail(): Promise<AuthAnyResModel> { // 获取店铺详情
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Get<AuthAnyResModel>('/company/myShop', null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public changePassword(psdParams: PsdParamsModel): Promise<AuthAnyResModel> {// 修改密码
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('/auth/password', psdParams, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public checkVerifyCode(params: VerifyCodeModel): Promise<AuthAnyResModel> { // 检验手机验证码
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Post<AuthAnyResModel>('/company/updateMobile', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public updateCompany(companyParams: CompanyParamsModel): Promise<AuthAnyResModel> { // 更新店铺信息
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Post<AuthAnyResModel>('/company/update', companyParams, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public checkPassword(params: { userId: string; password: string; }): Promise<AuthAnyResModel> { // 获取店铺详情
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get<AuthAnyResModel>('/account/checkPassword?', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public getPhoneInMyShop(phone: number): Promise<AuthAnyResModel> { // 通过手机获取验证码
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Get<AuthAnyResModel>('/verifyCode/updateInfoCode?' + 'phone=' + phone, null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        /*********************************** 供应商信息 ***********************************/

        public getSupplierList(params: any): Promise<AuthAnyResModel> {// 供应商列表
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Post<AuthAnyResModel>('/supplier/list', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public deleteSupplier(params: any): Promise<AuthAnyResModel> {  // 删除供应商信息
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Post<AuthAnyResModel>('/supplier/delete', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public updateState(params: any): Promise<AuthAnyResModel> { // 供应商状态修改
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Post<AuthAnyResModel>('/supplier/updateState', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public addSupplier(params: any): Promise<AuthAnyResModel> {  // 新增供应商
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Post<AuthAnyResModel>('/supplier/insert', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public editSupplier(params: any): Promise<AuthAnyResModel> {// 编辑供应商
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Post<AuthAnyResModel>('/supplier/update', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }


        /*********************************** 员工信息 ***********************************/

        public getEmployeeList(listParams: ListParamsModel): Promise<AuthAnyResModel> { // 获取员工列表
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('user/list', listParams, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public addEmployee(addEmpParams: AddParamsModel): Promise<AuthAnyResModel> {// 新增员工
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('user/add', addEmpParams, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public editEmployee(addEmpParams: AddParamsModel): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('user/update', addEmpParams, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public resetPsd(params): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('user/updatePassword', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public setEmployeeLock(useParams: UseParamsModel, url: string): Promise<AuthAnyResModel> { // 停用/启用
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': String(JSON.parse(localStorage.getItem('userInfo')).orgId)
            };
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>(url, useParams, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }
    }
}

@Injectable()

export class DatabaseService extends DatabaseServiceNs.DatabaseServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }

}
