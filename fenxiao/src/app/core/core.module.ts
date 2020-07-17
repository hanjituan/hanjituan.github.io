import { SettingService } from './common-services/setting.service';
import { GoodsService } from './common-services/goods.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpUtilService } from './infra/http/http-util.service';
import { DefaultInterceptor, UfastCodeInterceptor } from './infra/interceptors/default.interceptor';
import { MenuService } from './common-services/menu.service';
import { UserService } from './common-services/user.service';
import { UfastValidatorsService } from './infra/validators/validators.service';
import { UfastValidatorsRuleService } from './infra/validators/validatorsRule.service';
import { InventoryService } from './common-services/inventory.service';
import { DatabaseService } from './common-services/database.service';
import { ReceiptService } from './common-services/receipt.service';
import { SaleService } from './common-services/sale.service';
import { ReportService } from './common-services/report.service';
import { WorkboardService } from './common-services/workboard.service';
import { MarketingService } from './common-services/marketing.service';
import { MerchantService } from './common-services/merchant.service';
import { RoleAuthService } from './common-services/sysSetting/roleAuth.service';
import { MarketService } from './common-services/partner/market.service';
import { EmployeeService } from './common-services/sysSetting/employee.service';
import { OrganizService } from './common-services/sysSetting/organiz.service';
import { SimpleReuseStrategy } from './common-services/simpleReuseStrategy';
import { OpsService } from './common-services/ops.service';
import { StockService } from './common-services/dataAnalysis/stock.service';
import { PosService } from './common-services/partner/posSetting.service';
import { MemberService } from './common-services/member/member.service';
import { IntegralService } from './common-services/member/integral.service';
import { ActivenessService } from './common-services/dataAnalysis/activeness.service';
import { ExchangeMerchantService } from './common-services/member/exchangeMerchant.service';
import { LoginServices } from './common-services/login/login.service';
const RouterReuse = { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy };
const httpInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UfastCodeInterceptor, multi: true }
];
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        MenuService,
        UserService,
        GoodsService,
        MerchantService,
        SaleService,
        DatabaseService,
        HttpUtilService,
        httpInterceptorProvider,
        RouterReuse,
        UfastValidatorsRuleService,
        UfastValidatorsService,
        InventoryService,
        SettingService,
        ReceiptService,
        ReportService,
        WorkboardService,
        MarketingService,
        MerchantService,
        RoleAuthService,
        MarketService,
        EmployeeService,
        OrganizService,
        OpsService,
        StockService,
        PosService,
        MemberService,
        IntegralService,
        ActivenessService,
        ExchangeMerchantService,
        LoginServices
    ],
    exports: []
})
export class CoreModule { }
