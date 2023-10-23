import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import * as Pikaday from 'pikaday';


@Directive({
  selector: '[appDateInput]'
})
export class DateInputDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // @HostListener('focus') onFocus() {
  //   this.renderer.setProperty(this.el.nativeElement, 'type', 'date');
  //   this.renderer.setStyle(this.el.nativeElement, 'color', '#6f8b90');
  // }

  // @HostListener('blur') onBlur() {
  //   this.renderer.setProperty(this.el.nativeElement, 'type', 'text');
  // }

}
