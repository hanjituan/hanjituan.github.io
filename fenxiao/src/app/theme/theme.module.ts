import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SideMenuComponent } from './layouts/side-menu/side-menu.component';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';
@NgModule({
   imports: [
      CommonModule,
      NgZorroAntdModule,
      NzMenuModule
   ],
   declarations: [
      SideMenuComponent,
      BreadcrumbComponent
   ],
   exports: [
      SideMenuComponent,
      BreadcrumbComponent
   ]
})
export class ThemeModule { }
