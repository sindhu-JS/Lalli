import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <div class="mx-auto h-24 w-24 text-gray-400">
            <i class="pi pi-search text-8xl"></i>
          </div>
          <h2 class="mt-6 text-6xl font-bold text-gray-900">404</h2>
          <p class="mt-2 text-xl text-gray-600">Page Not Found</p>
          <p class="mt-2 text-sm text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div class="mt-8 space-y-6">
          <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <i class="pi pi-info-circle text-blue-400"></i>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-blue-800">
                  What can you do?
                </h3>
                <div class="mt-2 text-sm text-blue-700">
                  <ul class="list-disc list-inside space-y-1">
                    <li>Check the URL for any typos</li>
                    <li>Go back to the previous page</li>
                    <li>Visit our homepage</li>
                    <li>Contact support if you think this is an error</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <app-button routerLink="/home" variant="primary" [fullWidth]="true">
              <i class="pi pi-home mr-2"></i>
              Go Home
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
              Still need help?
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
export class NotFoundComponent {
  goBack(): void {
    window.history.back();
  }
}
