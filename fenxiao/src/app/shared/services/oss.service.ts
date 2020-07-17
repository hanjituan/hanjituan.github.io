
import { Injectable, Injector } from '@angular/core';
import { HttpUtilService, HttpUtilNs } from './../../core/infra/http/http-util.service';
export namespace OssServiceNs {
  export interface OSSTokenRes {
    ossAccessKeyId: string;
    hostName: string;
    callBackBody: string;
    policy: string;
    signature: string;
    fileName: string;
    expires: number;
  }

  export class OssServiceClass {
    private http: HttpUtilService;

    constructor(private injector: Injector) {
      this.http = injector.get(HttpUtilService);
    }

    public getOssPolicy(fileName: string, type: number): Promise<any> {
      return new Promise((resolve, reject) => {
        const config: HttpUtilNs.UfastHttpConfig = {};
        const param = {
          suffix: fileName.split('.').pop(),
          folder: type + ''
        };
        this.http.Get<any>('oss/getPolicy', param, config).subscribe((res: HttpUtilNs.UfastHttpResT<OSSTokenRes>) => {
          resolve(res.data);
        }, (error) => {
          reject();
        });
      });
    }
  }
}

@Injectable()
export class OssService extends OssServiceNs.OssServiceClass {
  constructor(injector: Injector) {
    super(injector);
  }
}
