import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectivesModule } from '../../directives/directives.module';
import { WidgetModule } from './../../compontents/widget/widget.module';
import { DataAnalysisRoutes } from './dataAnalysis.routing';
import { ActivenessDataComponent } from './activenessData/activenessData.component';
import { IncrementMerchantComponent } from './incrementMerchant/incrementMerchant.component';
import { StockMerchantComponent } from './stockMerchant/stockMerchant.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    DirectivesModule,
    WidgetModule,
    DataAnalysisRoutes
  ],
  declarations: [
    ActivenessDataComponent,
    IncrementMerchantComponent,
    StockMerchantComponent
  ]
})
export class DataAnalysisModule { }
