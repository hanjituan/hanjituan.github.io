import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { Observable } from 'rxjs';
import { MerchantModel, MerchantTplModel, TdbcModel } from './../models/merchant-model';

export namespace MerchantServiceNs {
    export interface MerchantChangeModel {
        companyAccountType: number;
        expireDate: Date;
        isLimitUserNumber: boolean;
        moduleTemplateId: string;
        orgId: string;
        userNumber: number;
    }

    export class MerchantServiceClass {
        private http: HttpUtilService;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        getMerchantList(param): Observable<HttpUtilNs.UfastHttpResListT<MerchantModel>> {
            return this.http.Post('company/list', param);
        }

        getMerchantLists(param): Observable<HttpUtilNs.UfastHttpResListT<MerchantModel>> {
            return this.http.Post('company/listByUserDeptCode', param);
        }

        getMerchantInfo(orgId): Observable<HttpUtilNs.UfastHttpResT<MerchantModel>> {
            return this.http.Get('/company/item', {orgId});
        }

        getMerchantExtra(orgId): Observable<HttpUtilNs.UfastHttpResT<MerchantModel>> {
            return this.http.Get('/company/queryMerchantInfoForChange', {orgId});
        }
        changeMerchantInfo(param: MerchantChangeModel): Promise<HttpUtilNs.UfastHttpRes> {
            return this.http.Post('/company/changeMerchantInfo', param).toPromise();
        }

        editMerchantInfo(param): Observable<HttpUtilNs.UfastHttpRes> {
            return this.http.Post('/company/editMerchantInfo', param);
        }

        lockMerchant(param: {isLock: boolean; orgId: string}): Observable<HttpUtilNs.UfastHttpRes> {
            return this.http.Post('/company/lock', param);
        }

        removeMerchant(orgId): Observable<HttpUtilNs.UfastHttpRes> {
            return this.http.Post(`/company/remove?orgId=${orgId}`);
        }

        getRightsTplList(): Observable <HttpUtilNs.UfastHttpResT<MerchantTplModel[]>> {
            return this.http.Get('/sysModuleTemplate/list');
        }

        getTplRights(templateid): Observable <HttpUtilNs.UfastHttpResT<any>> {
            return this.http.Get('/sysModuleTemplate/moduleListByTemplateId', { templateid });
        }

        updateTplInfo(params: {id: string; remark: string; templateName: string}): Promise<HttpUtilNs.UfastHttpRes> {
            return this.http.Post('/sysModuleTemplate/update', params).toPromise();
        }

        deleteTpl(id): Observable<HttpUtilNs.UfastHttpRes> {
            return this.http.Post(`/sysModuleTemplate/remove?id=${id}`);
        }

        getRightByTplId(templateid): Observable<HttpUtilNs.UfastHttpResT<number[]>> {
            return this.http.Get('/sysModuleTemplate/moduleListByTemplateId', { templateid  });
        }

        setRights(param: {moduleIdList: string[], templateId: string}): Observable<HttpUtilNs.UfastHttpRes> {
            return this.http.Post('/sysModuleTemplate/saveModuleList', param);
        }

        getTdbcConfig(orgId): Observable<HttpUtilNs.UfastHttpResT<TdbcModel>> {
            return this.http.Get('/mchPayConfig/queryTdbcMerchantConfig', { orgId  });
        }

        saveTdbcConfig(param: TdbcModel): Observable<HttpUtilNs.UfastHttpRes> {
            return this.http.Post('/mchPayConfig/saveTdbcMerchantConfig', param);
        }
    }
}
@Injectable()
export class MerchantService extends MerchantServiceNs.MerchantServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
