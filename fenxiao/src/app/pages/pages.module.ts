

import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages.routing';
import { LoginComponent } from './login/login.component';
import { ThemeModule } from './../theme/theme.module';
import { MainComponent } from './main/main.component';
import { WorkboardComponent } from './workboard/workboard.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { DirectivesModule } from './../directives/directives.module';
import { RegistComponent } from './regist/regist.component';
import { WidgetModule } from '../compontents/widget/widget.module';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        CoreModule,
        ThemeModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        NzIconModule,
        DirectivesModule,
        WidgetModule,
        NgxEchartsModule,

    ],
    declarations: [
        LoginComponent,
        MainComponent,
        WorkboardComponent,
        RegistComponent,
    ],
    exports: [PagesRoutingModule]
})
export class PagesModule { }
