import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    TextareaModule,
    SelectModule,
    CheckboxModule,
    ButtonModule,
    ButtonComponent,
  ],
  template: `
    <div class="settings max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:!text-gray-100">
          System Settings
        </h1>
        <p class="text-gray-600 dark:!text-gray-400 mt-1">
          Configure system-wide settings and preferences
        </p>
      </div>

      <div class="space-y-8">
        <!-- General Settings -->
        <div
          class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700"
        >
          <div class="p-6 border-b border-gray-200 dark:!border-gray-700">
            <h2 class="text-lg font-medium text-gray-900 dark:!text-gray-100">
              General Settings
            </h2>
          </div>
          <form
            [formGroup]="generalForm"
            (ngSubmit)="onGeneralSubmit()"
            class="p-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  Application Name
                </label>
                <input
                  pInputText
                  type="text"
                  formControlName="appName"
                  class="w-full"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  Default Language
                </label>
                <p-select
                  formControlName="defaultLanguage"
                  [options]="languageOptions"
                  placeholder="Select language"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full"
                ></p-select>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  Default Timezone
                </label>
                <p-select
                  formControlName="defaultTimezone"
                  [options]="timezoneOptions"
                  placeholder="Select timezone"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full"
                ></p-select>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  Date Format
                </label>
                <p-select
                  formControlName="dateFormat"
                  [options]="dateFormatOptions"
                  placeholder="Select date format"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full"
                ></p-select>
              </div>
            </div>

            <div class="mt-6">
              <label
                class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
              >
                System Description
              </label>
              <textarea
                pTextarea
                formControlName="description"
                rows="3"
                class="w-full"
                placeholder="Enter system description..."
              ></textarea>
            </div>

            <div class="mt-6 flex justify-end">
              <app-button
                type="submit"
                variant="primary"
                [loading]="generalLoading"
                [disabled]="generalForm.invalid"
              >
                Save General Settings
              </app-button>
            </div>
          </form>
        </div>

        <!-- Security Settings -->
        <div
          class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700"
        >
          <div class="p-6 border-b border-gray-200 dark:!border-gray-700">
            <h2 class="text-lg font-medium text-gray-900 dark:!text-gray-100">
              Security Settings
            </h2>
          </div>
          <form
            [formGroup]="securityForm"
            (ngSubmit)="onSecuritySubmit()"
            class="p-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  Session Timeout (minutes)
                </label>
                <p-inputnumber
                  formControlName="sessionTimeout"
                  [min]="5"
                  [max]="480"
                  suffix=" min"
                  class="w-full"
                ></p-inputnumber>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  Password Min Length
                </label>
                <p-inputnumber
                  formControlName="passwordMinLength"
                  [min]="6"
                  [max]="20"
                  class="w-full"
                ></p-inputnumber>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  Max Login Attempts
                </label>
                <p-inputnumber
                  formControlName="maxLoginAttempts"
                  [min]="3"
                  [max]="10"
                  class="w-full"
                ></p-inputnumber>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  Account Lockout Duration (minutes)
                </label>
                <p-inputnumber
                  formControlName="lockoutDuration"
                  [min]="5"
                  [max]="1440"
                  suffix=" min"
                  class="w-full"
                ></p-inputnumber>
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <div class="flex items-center">
                <p-checkbox
                  formControlName="require2FA"
                  [binary]="true"
                  inputId="require-2fa"
                  class="mr-2"
                ></p-checkbox>
                <label
                  for="require-2fa"
                  class="block text-sm text-gray-700 dark:!text-gray-300"
                >
                  Require two-factor authentication for all users
                </label>
              </div>

              <div class="flex items-center">
                <p-checkbox
                  formControlName="forceHttps"
                  [binary]="true"
                  inputId="force-https"
                  class="mr-2"
                ></p-checkbox>
                <label
                  for="force-https"
                  class="block text-sm text-gray-700 dark:!text-gray-300"
                >
                  Force HTTPS connections
                </label>
              </div>

              <div class="flex items-center">
                <p-checkbox
                  formControlName="passwordComplexity"
                  [binary]="true"
                  inputId="password-complexity"
                  class="mr-2"
                ></p-checkbox>
                <label
                  for="password-complexity"
                  class="block text-sm text-gray-700 dark:!text-gray-300"
                >
                  Enforce password complexity requirements
                </label>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <app-button
                type="submit"
                variant="primary"
                [loading]="securityLoading"
                [disabled]="securityForm.invalid"
              >
                Save Security Settings
              </app-button>
            </div>
          </form>
        </div>

        <!-- Email Settings -->
        <div
          class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700"
        >
          <div class="p-6 border-b border-gray-200 dark:!border-gray-700">
            <h2 class="text-lg font-medium text-gray-900 dark:!text-gray-100">
              Email Settings
            </h2>
          </div>
          <form
            [formGroup]="emailForm"
            (ngSubmit)="onEmailSubmit()"
            class="p-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  SMTP Server
                </label>
                <input
                  pInputText
                  type="text"
                  formControlName="smtpHost"
                  class="w-full"
                  placeholder="smtp.example.com"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  SMTP Port
                </label>
                <p-inputnumber
                  formControlName="smtpPort"
                  [min]="1"
                  [max]="65535"
                  placeholder="587"
                  class="w-full"
                ></p-inputnumber>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  Username
                </label>
                <input
                  pInputText
                  type="text"
                  formControlName="smtpUsername"
                  class="w-full"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  Password
                </label>
                <p-password
                  formControlName="smtpPassword"
                  [toggleMask]="true"
                  [feedback]="false"
                  class="w-full"
                ></p-password>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  From Email
                </label>
                <input
                  pInputText
                  type="email"
                  formControlName="fromEmail"
                  class="w-full"
                  placeholder="noreply@example.com"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
                >
                  From Name
                </label>
                <input
                  pInputText
                  type="text"
                  formControlName="fromName"
                  class="w-full"
                  placeholder="Your App Name"
                />
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <div class="flex items-center">
                <p-checkbox
                  formControlName="useTLS"
                  [binary]="true"
                  inputId="use-tls"
                  class="mr-2"
                ></p-checkbox>
                <label
                  for="use-tls"
                  class="block text-sm text-gray-700 dark:!text-gray-300"
                >
                  Use TLS encryption
                </label>
              </div>

              <div class="flex items-center">
                <p-checkbox
                  formControlName="enableNotifications"
                  [binary]="true"
                  inputId="email-notifications"
                  class="mr-2"
                ></p-checkbox>
                <label
                  for="email-notifications"
                  class="block text-sm text-gray-700 dark:!text-gray-300"
                >
                  Enable email notifications
                </label>
              </div>
            </div>

            <div class="mt-6 flex justify-between">
              <app-button
                type="button"
                variant="secondary"
                (clicked)="testEmail()"
                [loading]="testEmailLoading"
              >
                Test Email Configuration
              </app-button>
              <app-button
                type="submit"
                variant="primary"
                [loading]="emailLoading"
                [disabled]="emailForm.invalid"
              >
                Save Email Settings
              </app-button>
            </div>
          </form>
        </div>

        <!-- System Maintenance -->
        <div
          class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700"
        >
          <div class="p-6 border-b border-gray-200 dark:!border-gray-700">
            <h2 class="text-lg font-medium text-gray-900 dark:!text-gray-100">
              System Maintenance
            </h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                class="bg-yellow-50 dark:!bg-yellow-900 border border-yellow-200 dark:!border-yellow-700 rounded-lg p-4"
              >
                <h3
                  class="text-sm font-medium text-yellow-800 dark:!text-yellow-200 mb-2"
                >
                  Database Maintenance
                </h3>
                <p class="text-sm text-yellow-700 dark:!text-yellow-300 mb-4">
                  Clean up old logs and optimize database performance.
                </p>
                <app-button
                  variant="warning"
                  size="sm"
                  (clicked)="runDatabaseMaintenance()"
                  [loading]="maintenanceLoading"
                >
                  Run Maintenance
                </app-button>
              </div>

              <div
                class="bg-blue-50 dark:!bg-blue-900 border border-blue-200 dark:!border-blue-700 rounded-lg p-4"
              >
                <h3
                  class="text-sm font-medium text-blue-800 dark:!text-blue-200 mb-2"
                >
                  Clear Cache
                </h3>
                <p class="text-sm text-blue-700 dark:!text-blue-300 mb-4">
                  Clear application cache to improve performance.
                </p>
                <app-button
                  variant="secondary"
                  size="sm"
                  (clicked)="clearCache()"
                  [loading]="cacheLoading"
                >
                  Clear Cache
                </app-button>
              </div>

              <div
                class="bg-green-50 dark:!bg-green-900 border border-green-200 dark:!border-green-700 rounded-lg p-4"
              >
                <h3
                  class="text-sm font-medium text-green-800 dark:!text-green-200 mb-2"
                >
                  Export Data
                </h3>
                <p class="text-sm text-green-700 dark:!text-green-300 mb-4">
                  Export system data for backup purposes.
                </p>
                <app-button
                  variant="success"
                  size="sm"
                  (clicked)="exportData()"
                  [loading]="exportLoading"
                >
                  Export Data
                </app-button>
              </div>

              <div
                class="bg-red-50 dark:!bg-red-900 border border-red-200 dark:!border-red-700 rounded-lg p-4"
              >
                <h3
                  class="text-sm font-medium text-red-800 dark:!text-red-200 mb-2"
                >
                  System Reset
                </h3>
                <p class="text-sm text-red-700 dark:!text-red-300 mb-4">
                  Reset system to default settings (dangerous).
                </p>
                <app-button
                  variant="danger"
                  size="sm"
                  (clicked)="resetSystem()"
                >
                  Reset System
                </app-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SettingsComponent {
  private fb = inject(FormBuilder);

  generalForm: FormGroup;
  securityForm: FormGroup;
  emailForm: FormGroup;

  generalLoading = false;
  securityLoading = false;
  emailLoading = false;
  testEmailLoading = false;
  maintenanceLoading = false;
  cacheLoading = false;
  exportLoading = false;

  languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
  ];

  timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'EST', label: 'Eastern Time' },
    { value: 'PST', label: 'Pacific Time' },
    { value: 'GMT', label: 'Greenwich Mean Time' },
  ];

  dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  ];

  constructor(private toastService: ToastService) {
    this.generalForm = this.fb.group({
      appName: ['Lalli App', Validators.required],
      defaultLanguage: ['en'],
      defaultTimezone: ['UTC'],
      dateFormat: ['MM/DD/YYYY'],
      description: ['Enterprise application platform'],
    });

    this.securityForm = this.fb.group({
      sessionTimeout: [30, [Validators.required, Validators.min(5)]],
      passwordMinLength: [8, [Validators.required, Validators.min(6)]],
      maxLoginAttempts: [5, [Validators.required, Validators.min(3)]],
      lockoutDuration: [15, [Validators.required, Validators.min(5)]],
      require2FA: [false],
      forceHttps: [true],
      passwordComplexity: [true],
    });

    this.emailForm = this.fb.group({
      smtpHost: ['', Validators.required],
      smtpPort: [587, [Validators.required, Validators.min(1)]],
      smtpUsername: ['', Validators.required],
      smtpPassword: [''],
      fromEmail: ['', [Validators.required, Validators.email]],
      fromName: ['', Validators.required],
      useTLS: [true],
      enableNotifications: [true],
    });
  }

  onGeneralSubmit(): void {
    if (this.generalForm.valid) {
      this.generalLoading = true;
      setTimeout(() => {
        this.generalLoading = false;
        // Show success message
      }, 1500);
    }
  }

  onSecuritySubmit(): void {
    if (this.securityForm.valid) {
      this.securityLoading = true;
      setTimeout(() => {
        this.securityLoading = false;
        // Show success message
      }, 1500);
    }
  }

  onEmailSubmit(): void {
    if (this.emailForm.valid) {
      this.emailLoading = true;
      setTimeout(() => {
        this.emailLoading = false;
        // Show success message
      }, 1500);
    }
  }

  testEmail(): void {
    this.testEmailLoading = true;
    setTimeout(() => {
      this.testEmailLoading = false;
      this.toastService.success('Test email sent successfully!');
    }, 2000);
  }

  async runDatabaseMaintenance(): Promise<void> {
    const confirmed = await this.toastService.confirm(
      'This operation may take several minutes. Continue?',
      'Database Maintenance',
      'Continue',
      'Cancel',
      'pi pi-cog',
      'p-button-warning'
    );

    if (confirmed) {
      this.maintenanceLoading = true;
      setTimeout(() => {
        this.maintenanceLoading = false;
        this.toastService.success(
          'Database maintenance completed successfully!'
        );
      }, 3000);
    }
  }

  clearCache(): void {
    this.cacheLoading = true;
    setTimeout(() => {
      this.cacheLoading = false;
      this.toastService.success('Cache cleared successfully!');
    }, 1000);
  }

  exportData(): void {
    this.exportLoading = true;
    setTimeout(() => {
      this.exportLoading = false;
      this.toastService.success('Data export completed! Check your downloads folder.');
    }, 2000);
  }

  async resetSystem(): Promise<void> {
    const confirmed = await this.toastService.confirm(
      'This will reset all system settings to defaults. This action cannot be undone. Are you sure?',
      'Reset System',
      'Reset',
      'Cancel',
      'pi pi-exclamation-triangle',
      'p-button-danger'
    );

    if (confirmed) {
      this.toastService.warning(
        'System reset cancelled for safety. Contact system administrator.'
      );
    }
  }
}
