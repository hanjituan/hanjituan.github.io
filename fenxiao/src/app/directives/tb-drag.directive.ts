import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTbDrag]'
})
export class TbDragDirective {
  @Input() elHeader: any;
  @Output() elWidthChange = new EventEmitter<any>();
  @Output() tbWidthChange = new EventEmitter<any>();
  startPoint: number;
  originEleWidth: number;
  endWidth: number;
  movedDistance: number;
  private last: MouseEvent;
  mouseDown: boolean;
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.startPoint = 0;
    this.originEleWidth = 0;
    this.endWidth = 0;
    this.movedDistance = 0;
    this.mouseDown = false;
   }

  @HostListener('mousedown', ['$event']) onMousedown($event: MouseEvent) {
    this.mouseDown = true;
    this.startPoint = $event.clientX;
    this.originEleWidth = this.el.nativeElement.offsetParent.offsetWidth;
    this.renderer.listen('document', 'mousemove', (event) => {
      if (!this.mouseDown) {
        return;
      }
      this.movedDistance = event.clientX - this.startPoint;
      this.endWidth = this.originEleWidth + this.movedDistance;
      if (this.endWidth < 50) {
        return;
      }
      this.elHeader.width = this.endWidth;
      this.tbWidthChange.emit();
    });

    this.renderer.listen('document', 'mouseup', (event) => {
      this.mouseDown = false;
    });
  }
}
