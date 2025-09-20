import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  template: `
    <div class="main-layout min-h-screen bg-gray-50">
      <!-- Main Header -->
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  class="h-8 w-auto"
                  src="assets/images/logo/9.png"
                  alt="Logo"
                />
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a
                    routerLink="/app/dashboard"
                    routerLinkActive="text-blue-600"
                    class="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-600"
                  >
                    Dashboard
                  </a>
                  <a
                    routerLink="/app/projects"
                    routerLinkActive="text-blue-600"
                    class="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-600"
                  >
                    Projects
                  </a>
                  <a
                    routerLink="/app/team"
                    routerLinkActive="text-blue-600"
                    class="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-600"
                  >
                    Team
                  </a>
                </div>
              </div>
            </div>

            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <button
                  routerLink="/app/notifications"
                  class="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <i class="pi pi-bell"></i>
                </button>
                <div class="ml-3 relative">
                  <div class="flex items-center space-x-2">
                    <button
                      routerLink="/app/profile"
                      class="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                    >
                      <img
                        class="h-8 w-8 rounded-full"
                        src="https://i.pravatar.cc/32"
                        alt="User"
                      />
                      <span class="text-sm font-medium text-gray-700"
                        >{{ currentUser()?.name || 'User' }}</span
                      >
                    </button>
                    <button
                      (click)="logout()"
                      class="p-2 text-gray-500 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                      title="Logout"
                    >
                      <i class="pi pi-sign-out"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden">
              <button
                class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <i class="pi pi-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <router-outlet></router-outlet>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 mt-auto">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <p class="text-sm text-gray-500">
                © 2024 Your Company. All rights reserved.
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <a href="#" class="text-sm text-gray-500 hover:text-gray-900"
                >Privacy</a
              >
              <a href="#" class="text-sm text-gray-500 hover:text-gray-900"
                >Terms</a
              >
              <a href="#" class="text-sm text-gray-500 hover:text-gray-900"
                >Support</a
              >
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class MainLayoutComponent {
  private authService = inject(AuthService);

  get currentUser() {
    return this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
  }
}
