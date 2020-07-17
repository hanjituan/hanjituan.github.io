import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectivesModule } from '../../directives/directives.module';
import { WidgetModule } from './../../compontents/widget/widget.module';
import { OpsRoutes } from './ops.routing';
import { ReleaseVersionComponent } from './release-version/release-version.component';
import { AddVersionComponent } from './add-version/add-version.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    DirectivesModule,
    WidgetModule,
    OpsRoutes
  ],
  declarations: [
    ReleaseVersionComponent,
    AddVersionComponent
  ]
})
export class OpsModule { }
