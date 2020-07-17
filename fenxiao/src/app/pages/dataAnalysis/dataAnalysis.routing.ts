import { Routes, RouterModule } from '@angular/router';
import { StockMerchantComponent } from './stockMerchant/stockMerchant.component';
import { IncrementMerchantComponent } from './incrementMerchant/incrementMerchant.component';
import { ActivenessDataComponent } from './activenessData/activenessData.component';
const routes: Routes = [
  { path: 'stockMerchant', component: StockMerchantComponent },
  { path: 'incrementMerchant', component: IncrementMerchantComponent },
  { path: 'activenessData', component: ActivenessDataComponent}
];

export const DataAnalysisRoutes = RouterModule.forChild(routes);
