import { inject } from '@angular/core/testing';
import {Injectable, Injector} from '@angular/core';
import { HttpUtilService } from './../../core/infra/http/http-util.service';


class StorageTbServiceClass {
  private http: HttpUtilService;
  constructor(private injector: Injector) {
    this.http = injector.get(HttpUtilService);
  }

  public getTbConfig(name: string) {
    return this.http.Get('/tableConfig/queryByName', {name});
  }

  public setTbConfig(param: {name: string, configInfo: string, id?: string}) {
    return this.http.Post('/tableConfig/insert', param);
  }
}

@Injectable()
export class StorageTbService extends StorageTbServiceClass {
  constructor(injector: Injector) {
    super(injector);
  }
}
