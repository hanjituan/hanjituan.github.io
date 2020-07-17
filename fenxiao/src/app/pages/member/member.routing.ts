import { MemberComponent } from './member/member.component';
import { IntegralComponent } from './integral/integral.component';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeMerchantComponent } from './exchange-merchant/exchange-merchant.component';

const routes: Routes = [
  { path: 'plMember', component: MemberComponent },
  { path: 'integralRule', component: IntegralComponent },
  { path: 'exchangeMerchant', component: ExchangeMerchantComponent },
];

export const MemberRoutes = RouterModule.forChild(routes);
