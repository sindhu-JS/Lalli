import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export interface ToastOptions {
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  /**
   * Show a success toast message
   */
  success(message: string, title?: string, options?: ToastOptions): void {
    this.messageService.add({
      severity: 'success',
      summary: title || 'Success',
      detail: message,
      key: options?.key,
      life: options?.life || 5000,
      sticky: options?.sticky || false,
      closable: options?.closable !== false,
      data: options?.data
    });
  }

  /**
   * Show an error toast message
   */
  error(message: string, title?: string, options?: ToastOptions): void {
    this.messageService.add({
      severity: 'error',
      summary: title || 'Error',
      detail: message,
      key: options?.key,
      life: options?.life || 7000,
      sticky: options?.sticky || false,
      closable: options?.closable !== false,
      data: options?.data
    });
  }

  /**
   * Show an info toast message
   */
  info(message: string, title?: string, options?: ToastOptions): void {
    this.messageService.add({
      severity: 'info',
      summary: title || 'Info',
      detail: message,
      key: options?.key,
      life: options?.life || 5000,
      sticky: options?.sticky || false,
      closable: options?.closable !== false,
      data: options?.data
    });
  }

  /**
   * Show a warning toast message
   */
  warning(message: string, title?: string, options?: ToastOptions): void {
    this.messageService.add({
      severity: 'warn',
      summary: title || 'Warning',
      detail: message,
      key: options?.key,
      life: options?.life || 6000,
      sticky: options?.sticky || false,
      closable: options?.closable !== false,
      data: options?.data
    });
  }

  /**
   * Show a custom toast message
   */
  show(severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast', message: string, title?: string, options?: ToastOptions): void {
    this.messageService.add({
      severity,
      summary: title,
      detail: message,
      key: options?.key,
      life: options?.life || 5000,
      sticky: options?.sticky || false,
      closable: options?.closable !== false,
      data: options?.data
    });
  }

  /**
   * Clear all toast messages
   */
  clear(key?: string): void {
    this.messageService.clear(key);
  }

  /**
   * Show a confirmation toast with custom actions
   */
  confirm(message: string, title: string = 'Confirm', acceptLabel: string = 'Yes', rejectLabel: string = 'No', options?: ToastOptions): Promise<boolean> {
    return new Promise((resolve) => {
      this.messageService.add({
        severity: 'warn',
        summary: title,
        detail: message,
        sticky: true,
        key: options?.key || 'confirm',
        data: {
          accept: () => resolve(true),
          reject: () => resolve(false),
          acceptLabel,
          rejectLabel
        }
      });
    });
  }
}