import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  template: `
    <div class="admin-layout min-h-screen bg-gray-100">
      <!-- Admin Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div class="flex items-center space-x-4">
              <button
                routerLink="/admin/notifications"
                class="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors">
                <i class="pi pi-bell"></i>
              </button>
              <button
                routerLink="/admin/profile"
                class="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
                <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/32" alt="Admin">
                <span class="text-sm font-medium text-gray-700">{{ currentUser()?.name || 'Admin' }}</span>
              </button>
              <button
                (click)="logout()"
                class="p-2 text-gray-500 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                title="Logout">
                <i class="pi pi-sign-out"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="flex">
        <!-- Admin Sidebar -->
        <aside class="w-64 bg-white shadow-sm min-h-screen">
          <nav class="mt-8 px-4">
            <ul class="space-y-2">
              <li>
                <a routerLink="/admin/dashboard" routerLinkActive="bg-blue-50 text-blue-700"
                   class="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50">
                  <i class="pi pi-home mr-3"></i>
                  Dashboard
                </a>
              </li>
              <li>
                <a routerLink="/admin/users" routerLinkActive="bg-blue-50 text-blue-700"
                   class="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50">
                  <i class="pi pi-users mr-3"></i>
                  Users
                </a>
              </li>
              <li>
                <a routerLink="/admin/settings" routerLinkActive="bg-blue-50 text-blue-700"
                   class="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50">
                  <i class="pi pi-cog mr-3"></i>
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-8">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);

  get currentUser() {
    return this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
  }
}