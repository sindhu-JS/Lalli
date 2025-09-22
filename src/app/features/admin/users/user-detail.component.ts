import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div class="user-detail max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center space-x-4">
          <button
            routerLink="/admin/users"
            class="text-gray-500 hover:text-gray-700 dark:!text-gray-400 dark:hover:!text-gray-300"
          >
            <i class="pi pi-arrow-left"></i>
          </button>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:!text-gray-100">
              User Details
            </h1>
            <p class="text-gray-600 dark:!text-gray-400 mt-1">
              View and manage user information
            </p>
          </div>
        </div>
        <div class="flex space-x-3">
          <app-button routerLink="/admin/users/1/edit" variant="secondary">
            <i class="pi pi-pencil mr-2"></i>
            Edit User
          </app-button>
          <app-button variant="danger">
            <i class="pi pi-trash mr-2"></i>
            Delete User
          </app-button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- User Profile -->
        <div class="lg:col-span-2 space-y-6">
          <div
            class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6"
          >
            <h2
              class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-6"
            >
              User Information
            </h2>

            <div class="flex items-center space-x-6 mb-6">
              <img
                src="https://www.gravatar.com/avatar/example?d=identicon&s=80"
                alt="User Avatar"
                class="w-20 h-20 rounded-full"
              />
              <div>
                <h3
                  class="text-xl font-semibold text-gray-900 dark:!text-gray-100"
                >
                  John Doe
                </h3>
                <p class="text-gray-600 dark:!text-gray-400">
                  john.doe@example.com
                </p>
                <div class="flex items-center space-x-3 mt-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:!bg-purple-900 dark:!text-purple-200"
                  >
                    Administrator
                  </span>
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:!bg-green-900 dark:!text-green-200"
                  >
                    Active
                  </span>
                </div>
              </div>
            </div>

            <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dt
                  class="text-sm font-medium text-gray-500 dark:!text-gray-400"
                >
                  User ID
                </dt>
                <dd class="text-sm text-gray-900 dark:!text-gray-100 mt-1">
                  #USR-001
                </dd>
              </div>
              <div>
                <dt
                  class="text-sm font-medium text-gray-500 dark:!text-gray-400"
                >
                  Phone
                </dt>
                <dd class="text-sm text-gray-900 dark:!text-gray-100 mt-1">
                  +1 (555) 123-4567
                </dd>
              </div>
              <div>
                <dt
                  class="text-sm font-medium text-gray-500 dark:!text-gray-400"
                >
                  Department
                </dt>
                <dd class="text-sm text-gray-900 dark:!text-gray-100 mt-1">
                  Information Technology
                </dd>
              </div>
              <div>
                <dt
                  class="text-sm font-medium text-gray-500 dark:!text-gray-400"
                >
                  Location
                </dt>
                <dd class="text-sm text-gray-900 dark:!text-gray-100 mt-1">
                  New York, NY
                </dd>
              </div>
              <div>
                <dt
                  class="text-sm font-medium text-gray-500 dark:!text-gray-400"
                >
                  Joined Date
                </dt>
                <dd class="text-sm text-gray-900 dark:!text-gray-100 mt-1">
                  June 1, 2023
                </dd>
              </div>
              <div>
                <dt
                  class="text-sm font-medium text-gray-500 dark:!text-gray-400"
                >
                  Last Login
                </dt>
                <dd class="text-sm text-gray-900 dark:!text-gray-100 mt-1">
                  January 15, 2024
                </dd>
              </div>
            </dl>
          </div>

          <!-- Recent Activity -->
          <div
            class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6"
          >
            <h2
              class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-4"
            >
              Recent Activity
            </h2>
            <div class="flow-root">
              <ul class="-my-5 divide-y divide-gray-200 dark:!divide-gray-700">
                <li class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <div
                        class="w-8 h-8 bg-blue-100 dark:!bg-blue-900 rounded-full flex items-center justify-center"
                      >
                        <i
                          class="pi pi-sign-in text-blue-600 dark:!text-blue-300 text-sm"
                        ></i>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-sm font-medium text-gray-900 dark:!text-gray-100"
                      >
                        Logged in
                      </p>
                      <p class="text-sm text-gray-500 dark:!text-gray-400">
                        January 15, 2024 at 10:30 AM
                      </p>
                    </div>
                  </div>
                </li>
                <li class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <div
                        class="w-8 h-8 bg-green-100 dark:!bg-green-900 rounded-full flex items-center justify-center"
                      >
                        <i
                          class="pi pi-pencil text-green-600 dark:!text-green-300 text-sm"
                        ></i>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-sm font-medium text-gray-900 dark:!text-gray-100"
                      >
                        Profile updated
                      </p>
                      <p class="text-sm text-gray-500 dark:!text-gray-400">
                        January 14, 2024 at 3:45 PM
                      </p>
                    </div>
                  </div>
                </li>
                <li class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <div
                        class="w-8 h-8 bg-purple-100 dark:!bg-purple-900 rounded-full flex items-center justify-center"
                      >
                        <i
                          class="pi pi-key text-purple-600 dark:!text-purple-300 text-sm"
                        ></i>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-sm font-medium text-gray-900 dark:!text-gray-100"
                      >
                        Password changed
                      </p>
                      <p class="text-sm text-gray-500 dark:!text-gray-400">
                        January 12, 2024 at 11:20 AM
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div
            class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6"
          >
            <h3
              class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-4"
            >
              Quick Actions
            </h3>
            <div>
              <div class="mb-2">
                <app-button variant="secondary" [fullWidth]="true">
                  <i class="pi pi-key mr-2"></i>
                  Reset Password
                </app-button>
              </div>
              <div class="mb-2">
                <app-button variant="secondary" [fullWidth]="true">
                  <i class="pi pi-envelope mr-2"></i>
                  Send Message
                </app-button>
              </div>
              <div>
                <app-button variant="warning" [fullWidth]="true">
                  <i class="pi pi-pause mr-2"></i>
                  Suspend Account
                </app-button>
              </div>
            </div>
          </div>

          <!-- Permissions -->
          <div
            class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6"
          >
            <h3
              class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-4"
            >
              Permissions
            </h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700 dark:!text-gray-300"
                  >User Management</span
                >
                <i class="pi pi-check text-green-500"></i>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700 dark:!text-gray-300"
                  >System Settings</span
                >
                <i class="pi pi-check text-green-500"></i>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700 dark:!text-gray-300"
                  >Reports Access</span
                >
                <i class="pi pi-check text-green-500"></i>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700 dark:!text-gray-300"
                  >Data Export</span
                >
                <i class="pi pi-times text-red-500"></i>
              </div>
            </div>
          </div>

          <!-- Login Sessions -->
          <div
            class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6"
          >
            <h3
              class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-4"
            >
              Active Sessions
            </h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="text-sm font-medium text-gray-900 dark:!text-gray-100"
                  >
                    Chrome on Windows
                  </p>
                  <p class="text-xs text-gray-500 dark:!text-gray-400">
                    192.168.1.100 • Current
                  </p>
                </div>
                <button
                  class="text-red-600 hover:text-red-800 dark:!text-red-400 dark:hover:!text-red-300 text-sm"
                >
                  End
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="text-sm font-medium text-gray-900 dark:!text-gray-100"
                  >
                    Safari on iPhone
                  </p>
                  <p class="text-xs text-gray-500 dark:!text-gray-400">
                    10.0.0.50 • 2 hours ago
                  </p>
                </div>
                <button
                  class="text-red-600 hover:text-red-800 dark:!text-red-400 dark:hover:!text-red-300 text-sm"
                >
                  End
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UserDetailComponent {}
