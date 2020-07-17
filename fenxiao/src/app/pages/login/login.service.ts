import {Injectable, Injector} from '@angular/core';

export namespace LoginServiceNs {
  export class LoginServiceClass {
    constructor(private injector: Injector) {
    }
  }
}
@Injectable()
export class LoginService extends LoginServiceNs.LoginServiceClass {
  constructor(injector: Injector) {
    super(injector);
  }
}