import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonComponent],
  template: `
    <p-dialog
      [(visible)]="isOpen"
      [header]="title"
      [modal]="true"
      [closable]="showCloseButton"
      [dismissableMask]="closeOnOverlayClick"
      [styleClass]="dialogClass"
      [contentStyleClass]="contentClass"
      (onHide)="onHide()"
    >
      <!-- Body -->
      <ng-content></ng-content>

      <!-- Footer -->
      <ng-template pTemplate="footer" *ngIf="showFooter">
        <div class="flex justify-end gap-3">
          <app-button
            *ngIf="showCancelButton"
            variant="secondary"
            (clicked)="cancel()"
          >
            {{ cancelText }}
          </app-button>
          <app-button
            *ngIf="showConfirmButton"
            [variant]="confirmVariant"
            [loading]="confirmLoading"
            (clicked)="confirm()"
          >
            {{ confirmText }}
          </app-button>
        </div>
      </ng-template>
    </p-dialog>
  `,
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title?: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() showCloseButton: boolean = true;
  @Input() closeOnOverlayClick: boolean = true;
  @Input() showFooter: boolean = false;
  @Input() showCancelButton: boolean = true;
  @Input() showConfirmButton: boolean = true;
  @Input() cancelText: string = 'Cancel';
  @Input() confirmText: string = 'Confirm';
  @Input() confirmVariant: 'primary' | 'danger' | 'success' = 'primary';
  @Input() confirmLoading: boolean = false;

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  get dialogClass(): string {
    const sizeMap = {
      sm: 'w-full max-w-sm',
      md: 'w-full max-w-md',
      lg: 'w-full max-w-lg',
      xl: 'w-full max-w-2xl',
    };
    return `${sizeMap[this.size]} mx-auto`;
  }

  get contentClass(): string {
    return 'p-0'; // Remove default padding to have full control
  }

  onHide(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.cancelled.emit();
    this.close();
  }

  private close(): void {
    this.isOpen = false;
    this.closed.emit();
  }
}
