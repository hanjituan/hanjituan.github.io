import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';

import { LoginModalComponent, LoginModalService } from './login-modal/login-modal';
import { PositionPickerComponent } from './position-picker/position-picker.component';
import { ShowMessageService } from './show-message/show-message';
import { PositionPickerService } from './position-picker/position-picker.service';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { ImportModalService } from './import-modal/import-modal.service';
import { MultipleSelectionModalComponent } from './multiple-selection-modal/multiple-selection-modal.component';
import { MulSelModalService } from './multiple-selection-modal/mul-sel-modal.service';
import { ThreeLinkComponent } from './three-link/three-link.component';
import { ResetPasswordModalComponent, ResetPasswordModalService } from './reset-password-modal/reset-password-modal.component';
@NgModule({
    imports: [
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        DirectivesModule
    ],
    declarations: [
        LoginModalComponent,
        PositionPickerComponent,
        ImportModalComponent,
        MultipleSelectionModalComponent,
        ThreeLinkComponent,
        ResetPasswordModalComponent
    ],
    providers: [
        LoginModalService,
        ShowMessageService,
        { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 2000 } },
        PositionPickerService,
        ImportModalService,
        MulSelModalService,
        ResetPasswordModalService
    ],
    entryComponents: [
        LoginModalComponent,
        PositionPickerComponent,
        ImportModalComponent,
        MultipleSelectionModalComponent,
        ResetPasswordModalComponent
    ],
    exports: [
        ThreeLinkComponent
    ]
})
export class WidgetModule {
}
