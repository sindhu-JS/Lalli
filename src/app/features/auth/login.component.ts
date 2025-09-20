import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../shared/services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, PasswordModule, CheckboxModule, MessageModule, ButtonComponent],
  template: `
    <div class="login-form">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:!text-gray-100">Sign In</h2>
        <p class="text-gray-600 dark:!text-gray-400 mt-2">Welcome back! Please sign in to your account.</p>

        <!-- Demo Credentials -->
        <div class="mt-4 p-4 bg-blue-50 dark:!bg-blue-900/20 border border-blue-200 dark:!border-blue-800 rounded-lg">
          <p class="text-sm font-medium text-blue-800 dark:!text-blue-200 mb-2">Demo Credentials (click to auto-fill):</p>
          <div class="text-sm text-blue-700 dark:!text-blue-300 space-y-2">
            <button
              type="button"
              (click)="fillCredentials('admin@lalli.com', 'admin123$')"
              class="block w-full text-left px-3 py-2 bg-blue-100 dark:!bg-blue-800/50 hover:bg-blue-200 dark:hover:!bg-blue-700/50 rounded-md transition-colors cursor-pointer text-blue-700 dark:!text-blue-200"
            >
              <strong>Admin:</strong> admin@lalli.com / admin123$
            </button>
            <button
              type="button"
              (click)="fillCredentials('user@lalli.com', 'user123$')"
              class="block w-full text-left px-3 py-2 bg-blue-100 dark:!bg-blue-800/50 hover:bg-blue-200 dark:hover:!bg-blue-700/50 rounded-md transition-colors cursor-pointer text-blue-700 dark:!text-blue-200"
            >
              <strong>User:</strong> user@lalli.com / user123$
            </button>
          </div>
        </div>
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-2">
            Email Address
          </label>
          <input
            pInputText
            type="email"
            id="email"
            formControlName="email"
            class="w-full"
            placeholder="Enter your email"
          />
          @if (isFieldInvalid('email')) {
            <p-message
              severity="error"
              class="mt-1"
              [text]="getEmailErrorMessage()"
            ></p-message>
          }
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-2">
            Password
          </label>
          <p-password
            formControlName="password"
            placeholder="Enter your password"
            [toggleMask]="true"
            [feedback]="false"
            styleClass="w-full"
            inputStyleClass="w-full"
          ></p-password>
          @if (isFieldInvalid('password')) {
            <p-message
              severity="error"
              class="mt-1"
              text="Password is required"
            ></p-message>
          }
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <p-checkbox
              inputId="remember-me"
              formControlName="rememberMe"
              [binary]="true"
            ></p-checkbox>
            <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:!text-gray-300">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              routerLink="/auth/forgot-password"
              class="text-blue-600 hover:text-blue-500 dark:!text-blue-400 dark:hover:!text-blue-300"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        @if (errorMessage) {
          <p-message
            severity="error"
            [text]="errorMessage"
          ></p-message>
        }

        <app-button
          type="submit"
          [disabled]="loginForm.invalid"
          [loading]="isLoading"
          [fullWidth]="true"
          variant="primary"
          size="lg"
          (clicked)="onSubmit()"
        >
          Sign In
        </app-button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 dark:!text-gray-400">
          Don't have an account?
          <a routerLink="/auth/register" class="text-blue-600 hover:text-blue-500 dark:!text-blue-400 dark:hover:!text-blue-300 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  fillCredentials(email: string, password: string): void {
    this.loginForm.patchValue({
      email: email,
      password: password
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastService.success('Login successful!', 'Welcome back');

          // Check for stored redirect URL or route based on user role
          let redirectUrl = localStorage.getItem('redirectUrl');
          localStorage.removeItem('redirectUrl');

          if (!redirectUrl) {
            // Route based on user role
            switch (response.user.role) {
              case 'admin':
                redirectUrl = '/admin/dashboard';
                break;
              case 'user':
                redirectUrl = '/app/dashboard';
                break;
              default:
                redirectUrl = '/app/dashboard';
            }
          }

          this.router.navigate([redirectUrl]);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'An error occurred during login. Please try again.';
          this.toastService.error(this.errorMessage, 'Login Failed');
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.errors?.['required']) {
      return 'Email is required';
    }
    if (emailControl?.errors?.['email']) {
      return 'Please enter a valid email address';
    }
    return '';
  }
}