import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

const enum KEY_CODE_ENUM {
  LEFT_ARROW = 37,
  RIGHT_ARROW = 39,
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  ENTER = 13,
  SPACE = 32,
  CTRL = 17,
  DEL = 46,
  ESC = 27
}

@Directive({
  selector: '[appKeycode]'
})
export class KeycodeDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }
   @HostListener('keydown', ['$event', '$event.keyCode'])
    onKeyDown($event: KeyboardEvent, keycode) {
      if (keycode === KEY_CODE_ENUM.ENTER) {
        console.info(this.el.nativeElement);
      }
      if (keycode === KEY_CODE_ENUM.DOWN_ARROW) {
        this.goNextTR();
      }
      if (keycode === KEY_CODE_ENUM.UP_ARROW) {
        this.goPrevTR();
      }
      if (keycode === KEY_CODE_ENUM.LEFT_ARROW) {
        this.leftAction();
      }
      if (keycode === KEY_CODE_ENUM.RIGHT_ARROW) {
        this.rightAction();
      }
      $event.preventDefault();
    }

    leftAction() {
      const trNode = this.el.nativeElement.closest('tr');
      const tdNode = this.el.nativeElement.closest('td');
      const prevTd = tdNode.previousSibling || null;
      const inputEl = this.findPrevInput(trNode, this.el.nativeElement);
      if (!prevTd) {
        return;
      }
      this.focusOnInput(inputEl);
    }
    rightAction() {
      const trNode = this.el.nativeElement.closest('tr');
      const tdNode = this.el.nativeElement.closest('td');
      const nextTd = tdNode.nextSibling || null;
      if (!nextTd) {
        return;
      }
      const inputEl = this.findNextInput(trNode, this.el.nativeElement);
      if (!inputEl) {
        return;
      }
      this.focusOnInput(inputEl);
    }
    goNextTR() {
      const trNode = this.el.nativeElement.closest('tr');
      const tdNode = this.el.nativeElement.closest('td');
      const nextRow = this.getNextRow(trNode);
      if (!nextRow) {
        return;
      }
      const nodeList = trNode.querySelectorAll('td') || [];
      const index = Array.prototype.indexOf.call(nodeList, tdNode);
      const inputEl = this.findVerticalInput(nextRow, index);
      this.focusOnInput(inputEl);
    }
    goPrevTR() {
      const trNode = this.el.nativeElement.closest('tr');
      const tdNode = this.el.nativeElement.closest('td');
      const prevRow = this.getPrevRow(trNode);
      if (!prevRow) {
        return;
      }
      const nodeList = trNode.querySelectorAll('td') || [];
      const index = Array.prototype.indexOf.call(nodeList, tdNode);
      const inputEl = this.findVerticalInput(prevRow, index);
      this.focusOnInput(inputEl);
    }
    getNextRow(trNode: Element): any {
      return trNode.nextSibling || null;
    }
    getPrevRow(trNode: Element): any {
      return trNode.previousSibling  || null;
    }
    findVerticalInput(trNode: Element, nextIndex?: number) {
      const inputContainer = trNode.querySelectorAll('td')[nextIndex];
      if (!inputContainer) {
        return;
      }
      const inputEl = inputContainer.querySelector('input');
      return inputEl;
    }
    findNextInput(trNode: Element, inputNode?: Element) {
      const nodeList = trNode.querySelectorAll('input:not([type="checkbox"])') || [];
      if (!inputNode) {
        return;
      }
      const el = inputNode.nodeName.toLowerCase() === 'input' ? inputNode : inputNode.querySelector('input');
      const index = Array.prototype.indexOf.call(nodeList, el);
      if (nodeList.length === 0 || index === nodeList.length - 1) {
        return null;
      }
      return nodeList[index + 1];
    }
    findPrevInput(trNode: Element, inputNode?: Element, nextIndex?: number) {
      const nodeList = trNode.querySelectorAll('input:not([type="checkbox"])') || [];
      if (!inputNode) {
        return;
      }
      const el = inputNode.nodeName.toLowerCase() === 'input' ? inputNode : inputNode.querySelector('input');
      const index = Array.prototype.indexOf.call(nodeList, el);
      if (nodeList.length === 0 || index === 0) {
        return null;
      }
      return nodeList[index - 1];
    }
    focusOnInput(inputEl: any) {
      inputEl.focus();
      inputEl.select();
    }
}
