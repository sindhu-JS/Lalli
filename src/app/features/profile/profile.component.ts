import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../shared/services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { type User, type UserProfile, type UserPreferences, type NotificationSettings } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, TextareaModule, SelectModule, CheckboxModule, MessageModule, ButtonModule, ButtonComponent],
  template: `
    <div class="profile-page max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm border">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p class="text-gray-600 mt-1">Manage your account information and preferences</p>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Profile Photo Section -->
            <div class="lg:col-span-1">
              <div class="text-center">
                <div class="relative inline-block">
                  <img
                    [src]="avatarUrl()"
                    [alt]="currentUser()?.name"
                    class="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  <p-button
                    icon="pi pi-camera"
                    [rounded]="true"
                    class="absolute bottom-0 right-0"
                    size="small"
                    severity="info"
                  ></p-button>
                </div>
                <h2 class="mt-4 text-xl font-semibold text-gray-900">{{ currentUser()?.name }}</h2>
                <p class="text-gray-600">{{ currentUser()?.email }}</p>
                <div class="mt-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        [class]="getRoleBadgeClass()">
                    {{ getRoleLabel() }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Profile Form -->
            <div class="lg:col-span-2">
              <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
                <!-- Basic Information -->
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>

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
                      />
                      @if (isFieldInvalid('firstName')) {
                        <p-message severity="error" class="mt-1" text="First name is required"></p-message>
                      }
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
                      />
                      @if (isFieldInvalid('lastName')) {
                        <p-message severity="error" class="mt-1" text="Last name is required"></p-message>
                      }
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        pInputText
                        type="email"
                        formControlName="email"
                        class="w-full"
                      />
                      @if (isFieldInvalid('email')) {
                        <p-message severity="error" class="mt-1"
                          [text]="profileForm.get('email')?.errors?.['required'] ? 'Email is required' : 'Please enter a valid email address'"></p-message>
                      }
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        pInputText
                        type="tel"
                        formControlName="phone"
                        class="w-full"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        pInputText
                        type="text"
                        formControlName="company"
                        class="w-full"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <input
                        pInputText
                        type="text"
                        formControlName="department"
                        class="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      pTextarea
                      formControlName="bio"
                      rows="3"
                      class="w-full"
                      placeholder="Tell us a bit about yourself..."
                    ></textarea>
                  </div>
                </div>

                <!-- Preferences -->
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Preferences</h3>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Theme
                      </label>
                      <p-select
                        formControlName="theme"
                        [options]="themeOptions"
                        placeholder="Select theme"
                        optionLabel="label"
                        optionValue="value"
                        class="w-full"
                      ></p-select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Language
                      </label>
                      <p-select
                        formControlName="language"
                        [options]="languageOptions"
                        placeholder="Select language"
                        optionLabel="label"
                        optionValue="value"
                        class="w-full"
                      ></p-select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <p-select
                        formControlName="timezone"
                        [options]="timezoneOptions"
                        placeholder="Select timezone"
                        optionLabel="label"
                        optionValue="value"
                        class="w-full"
                      ></p-select>
                    </div>
                  </div>
                </div>

                <!-- Notification Preferences -->
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Notifications</h3>

                  <div class="space-y-3">
                    <label class="flex items-center">
                      <p-checkbox
                        formControlName="emailNotifications"
                        [binary]="true"
                        class="mr-2"
                      ></p-checkbox>
                      <span class="text-sm text-gray-700">Email notifications</span>
                    </label>

                    <label class="flex items-center">
                      <p-checkbox
                        formControlName="browserNotifications"
                        [binary]="true"
                        class="mr-2"
                      ></p-checkbox>
                      <span class="text-sm text-gray-700">Browser notifications</span>
                    </label>

                    <label class="flex items-center">
                      <p-checkbox
                        formControlName="mobileNotifications"
                        [binary]="true"
                        class="mr-2"
                      ></p-checkbox>
                      <span class="text-sm text-gray-700">Mobile notifications</span>
                    </label>

                    <label class="flex items-center">
                      <p-checkbox
                        formControlName="marketingEmails"
                        [binary]="true"
                        class="mr-2"
                      ></p-checkbox>
                      <span class="text-sm text-gray-700">Marketing emails and newsletters</span>
                    </label>
                  </div>
                </div>

                <!-- Form Actions -->
                <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <app-button
                    variant="secondary"
                    (clicked)="resetForm()"
                  >
                    Reset Changes
                  </app-button>
                  <app-button
                    type="submit"
                    variant="primary"
                    [loading]="isLoading"
                    [disabled]="profileForm.invalid || !profileForm.dirty"
                  >
                    Save Changes
                  </app-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      @if (successMessage) {
        <div class="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {{ successMessage }}
        </div>
      }

      @if (errorMessage) {
        <div class="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {{ errorMessage }}
        </div>
      }
    </div>
  `
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;
  profileForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' }
  ];

  languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' }
  ];

  timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'EST', label: 'Eastern Time' },
    { value: 'PST', label: 'Pacific Time' },
    { value: 'GMT', label: 'Greenwich Mean Time' }
  ];

  avatarUrl = computed(() => {
    const user = this.currentUser();
    return user?.email
      ? `https://www.gravatar.com/avatar/${this.hashEmail(user.email)}?d=identicon&s=128`
      : 'https://i.pravatar.cc/128';
  });

  constructor() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      department: [''],
      bio: [''],
      theme: ['light'],
      language: ['en'],
      timezone: ['UTC'],
      emailNotifications: [true],
      browserNotifications: [true],
      mobileNotifications: [false],
      marketingEmails: [false]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const user = this.currentUser() as User;
    if (user) {
      // Extract first and last name from full name
      const nameParts = user.name?.split(' ') || ['', ''];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      this.profileForm.patchValue({
        firstName,
        lastName,
        email: user.email,
        phone: user.profile?.phone || '',
        company: user.profile?.company || '',
        department: user.profile?.department || '',
        bio: user.profile?.bio || '',
        theme: user.profile?.preferences?.theme || 'light',
        language: user.profile?.preferences?.language || 'en',
        timezone: user.profile?.preferences?.timezone || 'UTC',
        emailNotifications: user.profile?.preferences?.notifications?.email ?? true,
        browserNotifications: user.profile?.preferences?.notifications?.browser ?? true,
        mobileNotifications: user.profile?.preferences?.notifications?.mobile ?? false,
        marketingEmails: user.profile?.preferences?.notifications?.marketing ?? false
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const formValue = this.profileForm.value;

      // Construct the updated user data
      const updatedUser: Partial<User> = {
        name: `${formValue.firstName} ${formValue.lastName}`.trim(),
        email: formValue.email,
        profile: {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          phone: formValue.phone,
          company: formValue.company,
          department: formValue.department,
          bio: formValue.bio,
          preferences: {
            theme: formValue.theme,
            language: formValue.language,
            timezone: formValue.timezone,
            notifications: {
              email: formValue.emailNotifications,
              browser: formValue.browserNotifications,
              mobile: formValue.mobileNotifications,
              marketing: formValue.marketingEmails
            }
          }
        }
      };

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = 'Profile updated successfully!';
        this.profileForm.markAsPristine();

        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }, 1500);
    }
  }

  resetForm(): void {
    this.loadUserProfile();
    this.successMessage = '';
    this.errorMessage = '';
  }

  getRoleBadgeClass(): string {
    const user = this.currentUser();
    switch (user?.role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getRoleLabel(): string {
    const user = this.currentUser();
    switch (user?.role) {
      case 'admin':
        return 'Administrator';
      case 'user':
        return 'User';
      default:
        return 'Unknown';
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private hashEmail(email: string): string {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }
}