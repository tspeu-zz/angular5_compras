import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appItemselect]'
})
export class ItemselectDirective {

  @HostBinding('class.itemOrange') private mostrar = false;

  @HostListener('mouseover') onmouseover() {
    this.mostrar = true;
  }

  @HostListener('mouseout') onmouseout() {
    this.mostrar = false;
  }
  constructor() { }

}
