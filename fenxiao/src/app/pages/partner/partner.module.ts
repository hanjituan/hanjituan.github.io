import { CoreModule } from '../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerRoutingModule } from './partner.routing';
import { SaleOrderComponent } from './saleOrder/saleOrder.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SaleDetailComponent } from './sale-detail/sale-detail.component';
import { DirectivesModule } from '../../directives/directives.module';
import { WidgetModule } from '@app/compontents/widget/widget.module';
import { PartnerDetailComponent } from './partner-detail/partner-detail.component';
import { AddComponent } from './partner-detail/add/add.component';
import { MerchantComponent } from './partner-detail/merchant/merchant.component';
import { InfoSettingComponent } from './partner-detail/info-setting/info-setting.component';
import { PosSettingComponent } from './partner-detail/pos-setting/pos-setting.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        PartnerRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        DirectivesModule,
        WidgetModule,
    ],
    declarations: [
        SaleOrderComponent,
        PartnerDetailComponent,
        SaleDetailComponent,
        AddComponent,
        MerchantComponent,
        InfoSettingComponent,
        PosSettingComponent,
    ],
    exports: []
})

export class PartnerModule { }
