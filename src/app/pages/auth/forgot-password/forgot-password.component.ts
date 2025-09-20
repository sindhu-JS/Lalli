import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, MessageModule, ButtonComponent],
  template: `
    <div class="forgot-password-form">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Forgot Password</h2>
        <p class="text-gray-600 mt-2">Enter your email address and we'll send you a link to reset your password.</p>
      </div>

      @if (!emailSent) {
        <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              pInputText
              type="email"
              id="email"
              formControlName="email"
              class="w-full"
              placeholder="Enter your email address"
            />
            @if (isFieldInvalid('email')) {
              <p-message severity="error" class="mt-1"
                [text]="forgotPasswordForm.get('email')?.errors?.['required'] ? 'Email is required' : 'Please enter a valid email address'"></p-message>
            }
          </div>

          @if (errorMessage) {
            <p-message severity="error" [text]="errorMessage"></p-message>
          }

          <app-button
            type="submit"
            variant="primary"
            size="lg"
            [fullWidth]="true"
            [loading]="isLoading"
            [disabled]="forgotPasswordForm.invalid"
          >
            Send Reset Link
          </app-button>
        </form>
      } @else {
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="pi pi-envelope text-green-600 text-2xl"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
          <p class="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{{ submittedEmail }}</strong>
          </p>
          <p class="text-sm text-gray-500 mb-6">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <app-button
            variant="secondary"
            (clicked)="resetForm()"
          >
            Try Again
          </app-button>
        </div>
      }

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Remember your password?
          <a routerLink="/auth/login" class="text-blue-600 hover:text-blue-500 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  forgotPasswordForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  emailSent = false;
  submittedEmail = '';

  constructor() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';

      const email = this.forgotPasswordForm.get('email')?.value;

      this.authService.forgotPassword(email).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.emailSent = true;
          this.submittedEmail = email;
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'An error occurred. Please try again.';
        }
      });
    }
  }

  resetForm(): void {
    this.emailSent = false;
    this.submittedEmail = '';
    this.errorMessage = '';
    this.forgotPasswordForm.reset();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgotPasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}