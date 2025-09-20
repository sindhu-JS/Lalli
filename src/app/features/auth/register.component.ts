import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../shared/services/auth.service';
import { ToastService } from '../../shared/services/toast.service';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, PasswordModule, CheckboxModule, MessageModule, ButtonComponent],
  template: `
    <div class="register-form">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
        <p class="text-gray-600 mt-2">Join us and start your journey today</p>
      </div>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            pInputText
            type="text"
            id="name"
            formControlName="name"
            class="w-full"
            placeholder="Enter your full name"
          />
          @if (isFieldInvalid('name')) {
            <p-message
              severity="error"
              class="mt-1"
              [text]="getNameErrorMessage()"
            ></p-message>
          }
        </div>

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
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <p-password
            formControlName="password"
            placeholder="Create a password"
            [toggleMask]="true"
            [feedback]="true"
            styleClass="w-full"
            inputStyleClass="w-full"
          ></p-password>
          @if (isFieldInvalid('password')) {
            <p class="mt-1 text-sm text-red-600">
              @if (registerForm.get('password')?.errors?.['required']) {
                Password is required
              } @else if (registerForm.get('password')?.errors?.['minlength']) {
                Password must be at least 6 characters long
              }
            </p>
          }
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <p-password
            formControlName="confirmPassword"
            placeholder="Confirm your password"
            [toggleMask]="true"
            [feedback]="false"
            styleClass="w-full"
            inputStyleClass="w-full"
          ></p-password>
          @if (isFieldInvalid('confirmPassword')) {
            <p-message
              severity="error"
              class="mt-1"
              [text]="getConfirmPasswordErrorMessage()"
            ></p-message>
          }
        </div>

        <div class="flex items-start">
          <p-checkbox
            inputId="terms"
            formControlName="acceptTerms"
            [binary]="true"
            styleClass="mt-1"
          ></p-checkbox>
          <label for="terms" class="ml-2 block text-sm text-gray-700">
            I agree to the
            <a href="#" class="text-blue-600 hover:text-blue-500">Terms of Service</a>
            and
            <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
          </label>
        </div>
        @if (isFieldInvalid('acceptTerms')) {
          <p-message
            severity="error"
            class="mt-1"
            text="You must accept the terms and conditions"
          ></p-message>
        }

        @if (errorMessage) {
          <p-message
            severity="error"
            [text]="errorMessage"
          ></p-message>
        }

        <app-button
          type="submit"
          variant="primary"
          size="lg"
          [fullWidth]="true"
          [loading]="isLoading"
          [disabled]="registerForm.invalid"
        >
          Create Account
        </app-button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
          <a routerLink="/auth/login" class="text-blue-600 hover:text-blue-500 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const errors = confirmPassword.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
      }
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';

      const { name, email, password } = this.registerForm.value;

      this.authService.register({ name, email, password }).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastService.success('Account created successfully!', 'Welcome');
          // Registration successful, redirect to dashboard
          this.router.navigate(['/app/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'An error occurred during registration. Please try again.';
          this.toastService.error(this.errorMessage, 'Registration Failed');
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getNameErrorMessage(): string {
    const nameControl = this.registerForm.get('name');
    if (nameControl?.errors?.['required']) {
      return 'Full name is required';
    }
    if (nameControl?.errors?.['minlength']) {
      return 'Name must be at least 2 characters long';
    }
    return '';
  }

  getEmailErrorMessage(): string {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.errors?.['required']) {
      return 'Email is required';
    }
    if (emailControl?.errors?.['email']) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.errors?.['required']) {
      return 'Password is required';
    }
    if (passwordControl?.errors?.['minlength']) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    if (confirmPasswordControl?.errors?.['required']) {
      return 'Please confirm your password';
    }
    if (confirmPasswordControl?.errors?.['passwordMismatch']) {
      return 'Passwords do not match';
    }
    return '';
  }
}