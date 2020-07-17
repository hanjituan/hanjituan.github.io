import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsRoutes } from './goods.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GoodsInfoComponent } from './goods-info/goods-info.component';
import { GoodsCategoryComponent } from './goods-category/goods-category.component';
import { DispatchOrderComponent } from './dispatch-order/dispatch-order.component';
import { SharedModule } from '../../shared/shared.module';
import { WidgetModule } from '@app/compontents/widget/widget.module';
import { GoodsInfoAddComponent } from './goods-info/goods-info-add/goods-info-add.component';
import { UnitBrandTableComponent } from './goods-info/unit-brand-table/unit-brand-table.component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        GoodsRoutes,
        NgZorroAntdModule,
        NzIconModule,
        SharedModule,
        WidgetModule,
        ReactiveFormsModule,
        FormsModule,
        DirectivesModule
    ],

    declarations: [
        GoodsInfoComponent,
        GoodsCategoryComponent,
        DispatchOrderComponent,
        GoodsInfoAddComponent,
        UnitBrandTableComponent,
    ]
})
export class GoodsModule { }
