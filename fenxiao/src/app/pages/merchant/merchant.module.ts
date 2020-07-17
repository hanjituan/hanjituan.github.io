import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectivesModule } from '../../directives/directives.module';
import { MerchantComponent } from './merchant.component';
import { MerchantRoutes } from './merchant.routing';
import { WidgetModule } from './../../compontents/widget/widget.module';
import { EditMerchantComponent } from './editMerchant/editMerchant.component';
import { MerchantTplComponent } from './merchantTpl/merchantTpl.component';
import { EditMerchantTplRightsComponent } from './editMerchantTplRights/editMerchantTplRights.component';
import { PaySettingComponent } from './pay-setting/pay-setting.component';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        DirectivesModule,
        WidgetModule,
        MerchantRoutes
    ],
    declarations: [
        MerchantComponent,
        EditMerchantComponent,
        MerchantTplComponent,
        EditMerchantTplRightsComponent,
        PaySettingComponent
    ]
})
export class MerchantModule { }
