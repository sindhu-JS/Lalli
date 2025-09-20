import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-form">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Sign In</h2>
        <p class="text-gray-600 mt-2">Welcome back! Please sign in to your account.</p>
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            formControlName="email"
            class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            [class.border-red-500]="isFieldInvalid('email')"
          />
          @if (isFieldInvalid('email')) {
            <p class="mt-1 text-sm text-red-600">
              @if (loginForm.get('email')?.errors?.['required']) {
                Email is required
              } @else if (loginForm.get('email')?.errors?.['email']) {
                Please enter a valid email address
              }
            </p>
          }
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div class="relative">
            <input
              [type]="showPassword ? 'text' : 'password'"
              id="password"
              formControlName="password"
              class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              placeholder="Enter your password"
              [class.border-red-500]="isFieldInvalid('password')"
            />
            <button
              type="button"
              (click)="togglePasswordVisibility()"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <i [class]="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="text-gray-400"></i>
            </button>
          </div>
          @if (isFieldInvalid('password')) {
            <p class="mt-1 text-sm text-red-600">
              Password is required
            </p>
          }
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              routerLink="/auth/forgot-password"
              class="text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        @if (errorMessage) {
          <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {{ errorMessage }}
          </div>
        }

        <button
          type="submit"
          [disabled]="isLoading || loginForm.invalid"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          @if (isLoading) {
            <i class="pi pi-spin pi-spinner mr-2"></i>
            Signing In...
          } @else {
            Sign In
          }
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <a routerLink="/auth/register" class="text-blue-600 hover:text-blue-500 font-medium">
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

  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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

          // Check for stored redirect URL
          const redirectUrl = localStorage.getItem('redirectUrl') || '/app/dashboard';
          localStorage.removeItem('redirectUrl');

          this.router.navigate([redirectUrl]);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'An error occurred during login. Please try again.';
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}