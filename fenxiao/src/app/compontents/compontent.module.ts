import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { WidgetModule } from './widget/widget.module';


@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
        DirectivesModule,
        OverlayModule,
        WidgetModule
    ],
    declarations: [
    ],
    exports: [
    ],
})
export class CommonComponentModule { }
