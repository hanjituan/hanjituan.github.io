import { Injectable, Injector } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { HttpUtilService, HttpUtilNs } from './../infra/http/http-util.service';
import { filter, map } from 'rxjs/internal/operators';
export namespace MenuServiceNs {
    export interface MenuModal {
        id: string | number;
        name: string;
        icon?: string;
        url?: string;
        children?: MenuModal[];
        leaf?: number | string;
    }
    export class MenuServiceClass {
        menuList: any;
        menuNavChange: BehaviorSubject<MenuModal[]>;
        presentMenu: MenuModal[];
        private hasUrlFound = false;
        private router: Router;
        private http: HttpUtilService;
        constructor(private injector: Injector) {
            this.router = this.injector.get(Router);
            this.http = injector.get(HttpUtilService);
            this.menuNavChange = new BehaviorSubject(this.menuList);
            this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
                this.presentMenu = [];
                this.hasUrlFound = false;
                this.checkMenu(event.urlAfterRedirects, this.menuList, 0);
                if (this.presentMenu.length > 0) {
                    this.menuNavChange.next(this.presentMenu);
                }
            });
            this.menuList = [];
        }

        public getMenuAuthorized(): Observable<HttpUtilNs.UfastHttpResT<MenuModal[]>> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get('/menu/authorized', null, config).pipe(map((menuData: HttpUtilNs.UfastHttpResT<MenuModal[]>) => {
                return menuData;
            }));
        }

        public getMenuList(): Observable<MenuModal[]> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get('/menu/listMenuBySite', { site: '0' }, config).
                pipe(map((menuData: HttpUtilNs.UfastHttpResT<MenuModal[]>) => {
                    // this.menuList = menuData.value || [];
                    return this.menuList;
                }));
        }


        public getMenuLists(): Observable<MenuModal[]> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.headers = { 'x-user-id': String(JSON.parse(localStorage.getItem('userInfo')).userId) };
            config.gateway = HttpUtilNs.GatewayKey.Ius;
            return this.http.Get('menu/myMenuAuthTree', null, config).
                pipe(map((menuData: HttpUtilNs.UfastHttpResT<MenuModal[]>) => {
                    this.menuList = menuData.data || [];
                    return this.menuList;
                }));
        }

        private checkMenu(url: string, menu: MenuModal[], levelIndex: number) {
            if (this.hasUrlFound) {
                return;
            }
            for (let index = 0, len = menu.length; index < len; index++) {
                const menuItem = menu[index];
                if (this.hasUrlFound) {
                    return;
                }
                if (url === menuItem.url) {
                    this.hasUrlFound = true;
                }
                // 当url为空的时候，下面这个判断为true, 对于一些伪路由，只有标签名没有url
                if (url.startsWith(menuItem.url)) {
                    this.presentMenu[levelIndex] = menuItem;
                    this.checkMenu(url, menuItem.children, levelIndex + 1);
                    if (!!menuItem.url) {
                        break;
                    }
                }
            }
        }
    }
}
@Injectable()
export class MenuService extends MenuServiceNs.MenuServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}
