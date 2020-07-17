import { Routes, RouterModule } from '@angular/router';
import { GoodsInfoComponent } from './goods-info/goods-info.component';
import { GoodsCategoryComponent } from './goods-category/goods-category.component';
import { DispatchOrderComponent } from './dispatch-order/dispatch-order.component';

const routes: Routes = [
    { path: 'goodsList', component: GoodsInfoComponent },
    { path: 'goodsClass', component: GoodsCategoryComponent },
    { path: 'dispatchOrder', component: DispatchOrderComponent },
];

export const GoodsRoutes = RouterModule.forChild(routes);
