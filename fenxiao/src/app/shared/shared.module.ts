import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { DirectivesModule } from './../directives/directives.module';
import { LodopPrintService } from './services/lodop-print.service';
import { UfastUtilService } from './services/ufast-util.service';
import { UfastTableComponent } from './component/ufast-table/ufast-table.component';
import { UfastTableNavComponent } from './component/ufast-table-nav/ufast-table-nav.component';
import { UfastSelectComponent } from './component/ufast-select/ufast-select.component';
import { ActionGroupComponent } from './component/table-action/action-group.component';
import { ActionComponent } from './component/table-action/action/action.component';
import { RightSideBoxComponent } from './component/right-side-box/right-side-box.component';
import { RightSideTableBoxComponent } from './component/right-side-table-box/right-side-table-box.component';
import { StorageTbService } from './services/storageTb.service';
import { RangeDataComponent } from './component/range-data/range-data.component';
import { OssService } from './services/oss.service';
import { ImageUploadComponent } from './component/image-upload/image-upload.component';
import { ImageCroppieComponent } from './component/image-croppie/image-croppie.component';
import { OrgCascaderComponent } from './component/org-cascader/org-cascader.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FormsModule,
    DirectivesModule,
    OverlayModule,
    NzIconModule,
  ],
  declarations: [
    UfastTableComponent,
    UfastTableNavComponent,
    UfastSelectComponent,
    ActionGroupComponent,
    ActionComponent,
    RightSideBoxComponent,
    RightSideTableBoxComponent,
    RangeDataComponent,
    ImageUploadComponent,
    ImageCroppieComponent,
    OrgCascaderComponent
  ],
  providers: [
    LodopPrintService,
    UfastUtilService,
    StorageTbService,
    OssService
  ],
  exports: [
    UfastTableComponent,
    UfastTableNavComponent,
    UfastSelectComponent,
    ActionGroupComponent,
    ActionComponent,
    RightSideBoxComponent,
    RightSideTableBoxComponent,
    RangeDataComponent,
    ImageUploadComponent,
    ImageCroppieComponent,
    OrgCascaderComponent,
  ]
})
export class SharedModule { }
