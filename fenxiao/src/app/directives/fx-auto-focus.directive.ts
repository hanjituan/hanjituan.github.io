import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFxAutoFocus]'
})
export class FxAutoFocusDirective {
  constructor(private el: ElementRef) {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 100);
  }
}
