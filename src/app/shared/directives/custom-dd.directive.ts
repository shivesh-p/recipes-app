import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive(
  {
    selector: "[appCustomDd]",
    exportAs: "appDropDown"
  })
export class CustomDdDirective {
  //@HostBinding('class.show')  isShowDD: boolean = false;
  isShowDD: boolean = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  @HostListener('click') mouseClick() {
    this.isShowDD = !this.isShowDD;
    let dv = this.elementRef.nativeElement.querySelector('.dropdown-menu');
    if (this.isShowDD) {
      this.renderer.addClass(dv, 'show');
    }
    else {
      this.renderer.removeClass(dv, 'show');
    }
  }
}
