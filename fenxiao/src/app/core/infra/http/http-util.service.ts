import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { gatewayKey, environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { ShowMessageService } from '@app/compontents/widget/show-message/show-message';
import { NzMessageService } from 'ng-zorro-antd';

export namespace HttpUtilNs {
    export interface UfastResListT<T> {
        endRow: number;
        firstPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        isFirstPage: boolean;
        isLastPage: boolean;
        lastPage: number;
        nextPage: number;
        pageNum: number;
        pageSize: number;
        pages: number;
        prePage: number;
        size: number;
        startRow: number;
        total: number;
        orderBy?: string;
        navigatePages: number;
        navigatepageNums: number[];
        list: T[];
    }
    export interface UfastHttpRes {
        message: string;
        status: number;
        data?: any;
    }
    export interface UfastFilterBody {
        filters: { [key: string]: any };
        pageSize: number;
        pageNum: number;
    }
    export interface UfastHttpResT<T> {
        status: number;
        message: string;
        data: T;
    }
    export interface UfastHttpResListT<T> {
        status: number;
        message: string;
        data: {
            list: T[],
            total: number
        };
    }
    export const GatewayKey = gatewayKey;

    export interface UfastHttpConfig {
        showLoading?: boolean;
        gateway?: string;
        headers?: any;
        hideError?: boolean;
        params?: { [param: string]: string } | undefined;
    }

    export class HttpUtilServiceClass {
        private http: HttpClient;
        private showMessage: ShowMessageService;
        private nzMessage: NzMessageService;
        private loadingCounter = 0;
        constructor(private injector: Injector) {
            this.nzMessage = this.injector.get(NzMessageService);
            this.http = this.injector.get(HttpClient);
            this.showMessage = this.injector.get(ShowMessageService);
        }

        public getFullUrl(baseUrlName: string, path: string): string {

            return environment.baseUrl[baseUrlName] + path;
        }

        private setOptions(params?: any, headers?: HttpHeaders,
            observe: 'body' | 'event' = 'body',
            reportProgress: boolean = false) {
            const options: any = {
                headers: headers,
                params: new HttpParams({
                    fromObject: params
                }),
                observe: observe,
                reportProgress: reportProgress
            };
            return options;
        }



        public Get<T>(path: string, params?: { [param: string]: string | number } | undefined, config?: UfastHttpConfig | undefined)
            : Observable<any> {
            let baseUrlName = GatewayKey.Bs;
            let headers = null;
            const showLoading = config ? config.showLoading !== false : true;
            if (!!config) {
                if (!!config.gateway) {
                    baseUrlName = config.gateway;
                }
                if (!!config.headers) {
                    headers = config.headers;
                }
            }
            if (showLoading) {
                this.loadingCounter++;
            }
            if (this.loadingCounter > 0) {
                this.showMessage.showLoading();
            }
            return new Observable(observer => {
                let isError = false;
                this.http.get<T>(this.getFullUrl(baseUrlName, path),
                    this.setOptions(params, headers)).pipe(map((data: any) => {
                        if (showLoading) {
                            this.loadingCounter--;
                        }
                        if (this.loadingCounter <= 0) {
                            this.showMessage.closeLoading();
                            this.loadingCounter = 0;
                        }
                        if (data.status !== 0) {
                            this.nzMessage.error(data.message, {
                                nzDuration: 3000
                            });
                            isError = true;
                        } else {
                            isError = false;
                        }
                        return <T>data;
                    })).subscribe((data) => {
                        if (isError) {
                            observer.error(data);
                            observer.complete();
                            return;
                        }
                        observer.next(data);
                        observer.complete();
                    }, (err) => {
                        this.nzMessage.error(err.message, {
                            nzDuration: 3000
                        });
                    });
            });
        }

        public Post<T>(path: string, body?: any, config?: UfastHttpConfig | undefined): Observable<any> {
            let baseUrlName = GatewayKey.Bs;
            let headers = null;
            let params = null;
            const showLoading = config ? config.showLoading !== false : true;
            if (!!config) {
                if (!!config.gateway) {
                    baseUrlName = config.gateway;
                }
                if (!!config.headers) {
                    headers = config.headers;
                }
                if (!!config.params) {
                    params = config.params;
                }
            }
            if (showLoading) {
                this.loadingCounter++;
            }
            if (this.loadingCounter > 0) {
                this.showMessage.showLoading();
            }
            return new Observable(observer => {
                let isError = false;
                this.http.post<T>(this.getFullUrl(baseUrlName, path), body,
                    this.setOptions(params, headers)).pipe(map((data: any) => {
                        if (showLoading) {
                            this.loadingCounter--;
                        }
                        if (this.loadingCounter <= 0) {
                            this.showMessage.closeLoading();
                            this.loadingCounter = 0;
                        }
                        if (data.status !== 0 && (!config || (config && !config.hideError))) {
                            isError = true;
                            this.nzMessage.error(data.message, {
                                nzDuration: 3000
                            });
                        } else {
                            isError = false;
                        }
                        return <T>data;
                    })).subscribe((data) => {
                        if (isError) {
                            observer.error(data);
                            observer.complete();
                            return;
                        }
                        observer.next(data);
                        observer.complete();
                    }, (err) => {
                        this.nzMessage.error(err.message, {
                            nzDuration: 3000
                        });
                    });
            });
        }

        public Put<T>(path: string, body?: any, config?: UfastHttpConfig | undefined): Observable<any> {
            let baseUrlName = GatewayKey.Bs;
            let headers = null;
            let params = null;
            if (!!config) {
                if (!!config.gateway) {
                    baseUrlName = config.gateway;
                }
                if (!!config.headers) {
                    headers = config.headers;
                }
                if (!!config.params) {
                    params = config.params;
                }
            }
            return this.http.put<T>(this.getFullUrl(baseUrlName, path), body, this.setOptions(params, headers));
        }

        public Delete<T>(path: string, params?: { [param: string]: string } | undefined,
            config?: UfastHttpConfig | undefined): Observable<any> {
            let baseUrlName = GatewayKey.Bs;
            let headers = null;
            if (!!config) {
                if (!!config.gateway) {
                    baseUrlName = config.gateway;
                }
                if (!!config.headers) {
                    headers = config.headers;
                }
            }
            return this.http.delete<T>(this.getFullUrl(baseUrlName, path), this.setOptions(params, headers));
        }

        public Head<T>(path: string, params?: { [param: string]: string } | undefined,
            config?: UfastHttpConfig | undefined): Observable<any> {
            let baseUrlName = GatewayKey.Bs;
            let headers = null;
            if (!!config) {
                if (!!config.gateway) {
                    baseUrlName = config.gateway;
                }
                if (!!config.headers) {
                    headers = config.headers;
                }
            }
            return this.http.head<T>(this.getFullUrl(baseUrlName, path), this.setOptions(params, headers));
        }

        public Options<T>(path: string, params?: { [param: string]: string } | undefined,
            config?: UfastHttpConfig | undefined): Observable<any> {
            let baseUrlName = GatewayKey.Bs;
            let headers = null;
            if (!!config) {
                if (!!config.gateway) {
                    baseUrlName = config.gateway;
                }
                if (!!config.headers) {
                    headers = config.headers;
                }
            }
            return this.http.options<T>(this.getFullUrl(baseUrlName, path), this.setOptions(params, headers));
        }
    }
}
@Injectable()
export class HttpUtilService extends HttpUtilNs.HttpUtilServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
