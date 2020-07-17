

import { NgModule } from '@angular/core';
import { MapPipe } from './pipe/map.pipe';
import { HtmlPipe } from './pipe/html.pipe';
import { DisabledDirective } from './disabled.directive';
import { DownloadDirective } from './download.directive';
import { TbDragDirective } from './tb-drag.directive';
import { KeycodeDirective } from './keycode.directive';
import { TpOutItemPipe } from './pipe/tpOutItemPipe';
import { FxI18nPipe } from './pipe/fxI18n.pipe';
import { FxAutoFocusDirective } from './fx-auto-focus.directive';
@NgModule({
   exports: [
      MapPipe,
      HtmlPipe,
      FxI18nPipe,
      DisabledDirective,
      DownloadDirective,
      TbDragDirective,
      KeycodeDirective,
      TpOutItemPipe,
      FxAutoFocusDirective
   ],
   declarations: [
      MapPipe,
      HtmlPipe,
      FxI18nPipe,
      DisabledDirective,
      DownloadDirective,
      TbDragDirective,
      KeycodeDirective,
      TpOutItemPipe,
      FxAutoFocusDirective
   ]
})
export class DirectivesModule {
}
