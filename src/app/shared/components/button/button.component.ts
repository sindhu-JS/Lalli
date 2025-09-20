import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <p-button
      [type]="type"
      [disabled]="disabled || loading"
      [loading]="loading"
      [icon]="primeIcon"
      [iconPos]="iconRight ? 'right' : 'left'"
      [severity]="primeSeverity"
      [size]="primeSize"
      [text]="variant === 'ghost'"
      [outlined]="variant === 'secondary'"
      [class]="buttonClasses"
      (onClick)="handleClick($event)"
    >
      <ng-content></ng-content>
    </p-button>
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() icon?: string;
  @Input() iconRight: boolean = false;
  @Input() customClass?: string;

  @Output() clicked = new EventEmitter<Event>();

  get primeIcon(): string | undefined {
    if (!this.icon) return undefined;
    // Convert common icon names to PrimeIcons format
    const iconMap: { [key: string]: string } = {
      'fa-plus': 'pi pi-plus',
      'fa-edit': 'pi pi-pencil',
      'fa-delete': 'pi pi-trash',
      'fa-save': 'pi pi-save',
      'fa-search': 'pi pi-search',
      'fa-user': 'pi pi-user',
      'fa-home': 'pi pi-home',
      'fa-settings': 'pi pi-cog',
      'fa-check': 'pi pi-check',
      'fa-times': 'pi pi-times'
    };

    // If it's already a pi- icon, return as is
    if (this.icon.startsWith('pi pi-')) {
      return this.icon;
    }

    // If it's a mapped FontAwesome icon, return PrimeIcon equivalent
    if (iconMap[this.icon]) {
      return iconMap[this.icon];
    }

    // Default fallback
    return this.icon.startsWith('pi-') ? `pi ${this.icon}` : `pi pi-${this.icon}`;
  }

  get primeSeverity(): "success" | "info" | "warn" | "danger" | "help" | "secondary" | "contrast" | null {
    const severityMap = {
      primary: null, // Primary is default
      secondary: 'secondary',
      danger: 'danger',
      success: 'success',
      warning: 'warn',
      ghost: null // Will use text variant
    };
    return severityMap[this.variant];
  }

  get primeSize(): "small" | "large" | null {
    const sizeMap = {
      sm: 'small',
      md: null, // Medium is default
      lg: 'large'
    };
    return sizeMap[this.size];
  }

  get buttonClasses(): string {
    const classes = [];

    if (this.fullWidth) {
      classes.push('w-full');
    }

    if (this.customClass) {
      classes.push(this.customClass);
    }

    return classes.join(' ');
  }

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}