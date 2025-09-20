import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,InputTextModule, SelectModule, PasswordModule, CheckboxModule, ButtonComponent, RouterModule],
  template: `
    <div class="user-form max-w-2xl mx-auto">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Add New User</h1>
        <p class="text-gray-600 mt-1">Create a new user account</p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border">
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                pInputText
                type="text"
                formControlName="firstName"
                class="w-full"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                pInputText
                type="text"
                formControlName="lastName"
                class="w-full"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              pInputText
              type="email"
              formControlName="email"
              class="w-full"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <p-select
              formControlName="role"
              [options]="roleOptions"
              placeholder="Select role"
              optionLabel="label"
              optionValue="value"
              class="w-full"
            ></p-select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <p-select
              formControlName="status"
              [options]="statusOptions"
              placeholder="Select status"
              optionLabel="label"
              optionValue="value"
              class="w-full"
            ></p-select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Temporary Password *
            </label>
            <p-password
              formControlName="password"
              [toggleMask]="true"
              [feedback]="false"
              placeholder="Enter temporary password"
              class="w-full"
            ></p-password>
            <p class="mt-1 text-sm text-gray-500">
              User will be required to change this password on first login.
            </p>
          </div>

          <div class="flex items-center">
            <p-checkbox
              formControlName="sendInvite"
              [binary]="true"
              inputId="send-invite"
              class="mr-2"
            ></p-checkbox>
            <label for="send-invite" class="block text-sm text-gray-700">
              Send welcome email with login instructions
            </label>
          </div>

          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <app-button
              type="button"
              variant="secondary"
              routerLink="/admin/users"
            >
              Cancel
            </app-button>
            <app-button
              type="submit"
              variant="primary"
              [loading]="isLoading"
              [disabled]="userForm.invalid"
            >
              Create User
            </app-button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class UserFormComponent {
  userForm: FormGroup;
  isLoading = false;

  roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Administrator' }
  ];

  statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', Validators.required],
      status: ['active'],
      password: ['', [Validators.required, Validators.minLength(6)]],
      sendInvite: [true]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/users']);
      }, 1500);
    }
  }
}