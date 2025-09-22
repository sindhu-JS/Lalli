import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <div class="mx-auto h-24 w-24 text-red-500">
            <i class="pi pi-ban text-8xl"></i>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            You don't have permission to access this resource.
          </p>
        </div>

        <div class="mt-8 space-y-6">
          <div class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <i class="pi pi-exclamation-triangle text-red-400"></i>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  Authorization Required
                </h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>
                    This page requires special permissions that your account
                    doesn't have. Please contact your administrator if you
                    believe this is an error.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <app-button
              routerLink="/app/dashboard"
              variant="primary"
              [fullWidth]="true"
            >
              <i class="pi pi-home mr-2"></i>
              Go to Dashboard
            </app-button>

            <app-button
              variant="secondary"
              [fullWidth]="true"
              (clicked)="goBack()"
            >
              <i class="pi pi-arrow-left mr-2"></i>
              Go Back
            </app-button>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-500">
              Need help?
              <a
                routerLink="/contact"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UnauthorizedComponent {
  goBack(): void {
    window.history.back();
  }
}
