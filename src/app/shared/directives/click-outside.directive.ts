import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.clickOutside.emit(event);
    }
  }

  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.clickOutside.emit(event);
    }
  }
}