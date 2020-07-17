import { PaySettingComponent } from './pay-setting/pay-setting.component';
import { Routes, RouterModule } from '@angular/router';
import { MerchantComponent } from './merchant.component';
import { EditMerchantComponent } from './editMerchant/editMerchant.component';
import { MerchantTplComponent } from './merchantTpl/merchantTpl.component';
import { EditMerchantTplRightsComponent } from './editMerchantTplRights/editMerchantTplRights.component';
const routes: Routes = [
    { path: 'merchantDetail', component: MerchantComponent },
    { path: 'edit', component: EditMerchantComponent },
    { path: 'paySet', component: PaySettingComponent },
    { path: 'merchantTpl', component: MerchantTplComponent },
    { path: 'tplRight', component: EditMerchantTplRightsComponent }
];

export const MerchantRoutes = RouterModule.forChild(routes);
