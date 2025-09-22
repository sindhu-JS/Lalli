import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: true,
})
export class AutoFocusDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Use setTimeout to ensure the element is rendered
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 0);
  }
}
