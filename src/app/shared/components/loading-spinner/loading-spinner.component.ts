import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  template: `
    <div class="flex items-center justify-center" [class]="containerClass">
      <p-progressSpinner
        [style]="spinnerStyle"
        [strokeWidth]="strokeWidth"
        [fill]="'transparent'"
        [animationDuration]="'.5s'"
      ></p-progressSpinner>
      @if (text) {
        <span class="ml-3 text-gray-600" [class]="textClass">{{ text }}</span>
      }
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() size: number = 24;
  @Input() color: string = 'blue';
  @Input() text?: string;
  @Input() containerClass?: string;
  @Input() textClass?: string;

  get strokeWidth(): string {
    const width = Math.max(2, Math.floor(this.size / 12));
    return width.toString();
  }

  get spinnerStyle(): any {
    const colorMap = {
      blue: '#3b82f6',
      green: '#10b981',
      red: '#ef4444',
      yellow: '#f59e0b',
      purple: '#8b5cf6',
      gray: '#6b7280',
      white: '#ffffff'
    };

    const strokeColor = colorMap[this.color as keyof typeof colorMap] || colorMap.blue;

    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      '--p-progressspinner-color-1': strokeColor,
      '--p-progressspinner-color-2': strokeColor,
      '--p-progressspinner-color-3': strokeColor,
      '--p-progressspinner-color-4': strokeColor
    };
  }
}