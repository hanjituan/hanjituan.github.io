import { Pipe, PipeTransform } from '@angular/core';
import { fxI18n } from '@assets/i18n';
@Pipe({
  name: 'fxI18n'
})
export class FxI18nPipe implements PipeTransform {
  constructor() {}
  transform(value: string, arg?: string): string {
    return fxI18n[arg];
  }
}
