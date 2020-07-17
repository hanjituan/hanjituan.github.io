
import { Injectable, Injector } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
export namespace UserServiceNs {

    export interface AuthUpdateInfoReqModel {
        email?: string;
        mobile?: string;
        areaCode: string;
        loginName: string;
        name: string;
        password: string;
        telephone: string;
    }

    export interface AuthLoginReqModel {
        authId?: string;
        loginName?: string;
        password: string;
        code?: string;
        loginNameOrMobile: string;
    }

    export interface AuthRegistRequestModel {
        orgName: string;
        provinceId: string;
        cityId: string;
        countyId: string;
        areaName: string;
        address: string;
        loginName: string;
        password: string;
        smsValidCode: string;
    }

    export interface UserInfoModel {
        locked: number;      // 0：启用，1：锁定
        loginName: string;
        name: string;
        roleIds: string[];
        email?: string;
        mobile?: string;
        telephone?: string;
        nickname?: string;   // 昵称
        sex: number;         // 0:女，1：男
        deptId: string;
        areaCode?: string;
        spaceId?: string;
        deptName?: string;
        lastLoginTime?: number;
        roleNames?: string;
        roleVOs?: any[];
        type?: number;
        status?: number;
        userId?: string;
        oilDepotId?: string;
        oilDepotName?: string;
        isOilDepotApprover?: number;  // 0:否，1：是
    }

    interface AddRoleModel {
        deptId: string;
        deptName: string;
        id: string;
        name: string;
        remark: string;
        seqNo: number;
        spaceId: string;
        type: number;
    }

    interface AddMenuModel {
        authIds: Array<number>;
        channel: number;
        menuIds: Array<number>;
        roleId: string;
    }

    export interface AuthAnyResModel extends HttpUtilNs.UfastHttpRes {
        value: any;
    }

    export interface UfastHttpAnyResModel extends HttpUtilNs.UfastHttpRes {
        data: any;
    }

    export interface AuthInfoResModel extends HttpUtilNs.UfastHttpRes {
        value: {
            authId: string;
            verifyCode?: string;
            verifyImgUrl: string;
        };
    }
    export interface AuthLoginInfoValueModel {
        loginName: string;
        password: string;
        deptName: string;      // 所属机构
        email: string;
        name: string;
        roleNames: string;     // 角色
        mobile: string;        // 手机号
        telephone: string;     // 电话
        userId: string;
        rolesVOs: any[];
        status: number;
        type: number;

        [otherKey: string]: any;
    }
    export interface AuthLoginInfoResModel extends HttpUtilNs.UfastHttpRes {
        value: AuthLoginInfoValueModel;
    }
    export class UserServiceClass {
        private http: HttpUtilService;
        public userInfo: any;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
            this.userInfo = {
                username: null
            };
        }

        public getAuthInfo(): Promise<AuthInfoResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get<AuthInfoResModel>('/auth/authInfo', null, config)
                .pipe(retry(2), map((data: AuthInfoResModel) => {
                    data.value.verifyImgUrl = this.http.getFullUrl('ius', '/auth/kaptcha') + `?authid=${data.value.authId}`;
                    return data;
                })).toPromise();
        }

        public postLogin(loginData: AuthLoginReqModel): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('user/login', loginData, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    if (resData.status === 0) {
                        this.userInfo.username = loginData.loginName;
                    }
                    return resData;
                })).toPromise();
        }

        // /user/logout
        public logout(): Observable<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': JSON.parse(localStorage.getItem('userInfo')).orgId
            };
            return this.http.Post('user/logout', null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    if (resData.status === 0) {
                        this.userInfo.username = '';
                    }
                    return resData;
                }));
        }

        public modifyPassword(oldPassword: string, newPassword: string): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('/auth/password', {
                newPassword,
                oldPassword
            }, config);
        }

        public getLogin(): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get<AuthLoginInfoResModel>('/profile/getLogin', null, config)
                .pipe(map((data: HttpUtilNs.UfastHttpResT<UserInfoModel>) => {
                    this.userInfo.username = data.data.loginName;
                    return data;
                }));
        }

        public updatePersonInfo(data: AuthUpdateInfoReqModel): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('/profile/update', data, config);
        }

        public addUser(userInfo: UserInfoModel): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post('/profile', userInfo, config);
        }

        public updateUserInfo(userInfo: UserInfoModel): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post('/profile/updateUserInfo', userInfo, config);
        }

        public resetPassword(userIdList: string[]): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post('/account/resetPassword', userIdList, config);
        }

        public removeUsers(userIdList: string[]): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post('/profile/remove', userIdList, config);
        }

        public getUserDetail(userId: string): Observable<HttpUtilNs.UfastHttpResT<UserInfoModel>> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get('/profile/detail', { userId }, config);
        }

        public getUserList(filter: { filters: any, pageNum: number, pageSize: number }): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post('/profile/list', filter, config);
        }

        public getAllUserList(filter: { filters: any, pageNum: number, pageSize: number }): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post('/profile/listAll', filter, config);
        }

        public lockUsers(lock: number, userIds: string[]): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            const body = {
                lock,
                userIds
            };
            return this.http.Post('/profile/updateLock', body, config);
        }

        public regist(registParams: AuthRegistRequestModel): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Post<AuthAnyResModel>('/company/register', registParams, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    if (resData.status === 0) {
                        this.userInfo.username = registParams.loginName;
                    }
                    return resData;
                })).toPromise();
        }

        public getPhoneCode(phone: number): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Get<AuthAnyResModel>('/verifyCode/getCode?' + 'phone=' + phone, null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public checkMobile(phone: number): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get<AuthAnyResModel>('/profile/checkMobile?' + 'mobile=' + phone, null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public checkLoginName(phone: number): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get<AuthAnyResModel>('/account/checkLoginName?' + 'loginName=' + phone, null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        // 获取店铺详情
        public getCompanyDetai(): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Get<AuthAnyResModel>('/company/myShop', null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        // 获取手机验证码
        public getPhoneLoginCode(phone: string): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Company;
            return this.http.Get<AuthAnyResModel>('/verifyCode/getLoginCode?' + 'phone=' + phone, null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        // ius/auth/mobileLogin   短信登录接口
        public loginByPhone(params: any): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('/auth/mobileLogin', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        // 查询当前用户所在工作空间的所有角色信息
        public getUserInfo(params): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            config.headers = {
                'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId),
                'x-org-id': JSON.parse(localStorage.getItem('userInfo')).orgId
            };
            return this.http.Post<AuthAnyResModel>('role/list', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        // 新增角色
        public addRole(params: AddRoleModel): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('/scepter/role', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        // 编辑角色
        public editRole(params: AddRoleModel): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('/scepter/editRole', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        // 删除角色信息
        public deleteRoles(params: Array<string>): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('/scepter/deleteRoles', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        // 根据角色ID获取菜单和权限集合
        public getMenuByRoleId(roleId: string): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get<AuthAnyResModel>('/scepter/getMenusAuths?roleId=' + roleId, null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        // 新增菜单和权限
        public addMenuAndLimit(params: AddMenuModel): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post<AuthAnyResModel>('/scepter/addMenusAuths', params, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        // 获取所有权限和菜单信息
        public getAllMenuAndLimit(): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get<AuthAnyResModel>('/menu/shown', null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public test(): Promise<AuthAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            // config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get<AuthAnyResModel>('/verify/verifyInfo', null, config)
                .pipe(map((resData: AuthAnyResModel) => {
                    return resData;
                })).toPromise();
        }

        public updatePassword(param: {password: string; userId: number}): Promise<HttpUtilNs.UfastHttpRes> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Post('/user/updatePassword', param, config).toPromise();
        }
    }
}

@Injectable()

export class UserService extends UserServiceNs.UserServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
