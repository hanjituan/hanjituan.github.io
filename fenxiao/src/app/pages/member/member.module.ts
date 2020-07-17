import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member/member.component';
import { MemberRoutes } from './member.routing';
import { IntegralComponent } from './integral/integral.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectivesModule } from '@app/directives/directives.module';
import { WidgetModule } from '@app/compontents/widget/widget.module';
import { IntegralDetailComponent } from './member/integral-detail/integral-detail.component';
import { ExchangeMerchantComponent } from './exchange-merchant/exchange-merchant.component';
import { ExchangeDetailComponent } from './exchange-merchant/exchange-detail/exchange-detail.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        DirectivesModule,
        WidgetModule,
        MemberRoutes,
    ],
    declarations: [
        MemberComponent,
        IntegralComponent,
        IntegralDetailComponent,
        ExchangeMerchantComponent,
        ExchangeDetailComponent
    ]
})
export class MemberModule { }
