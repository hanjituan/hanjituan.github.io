
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService, MenuServiceNs } from './../../../core/common-services/menu.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent implements OnDestroy, OnInit {
    menuList: MenuServiceNs.MenuModal[];
    private subHandler: any;
    constructor(private menuService: MenuService) { }
    public trackById(item: any, index: number) {
        return item.id;
    }
    ngOnInit() {
        this.subHandler = this.menuService.menuNavChange.subscribe((list: MenuServiceNs.MenuModal[]) => {
            this.menuList = list;
        });
    }

    ngOnDestroy() {
        this.subHandler.unsubscribe();
    }

}
