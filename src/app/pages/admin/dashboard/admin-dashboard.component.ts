import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-dashboard">
      <!-- Admin Dashboard Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:!text-gray-100">Admin Dashboard</h1>
        <p class="text-gray-600 dark:!text-gray-400 mt-2">Overview of system metrics and administrative controls</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        @for (stat of stats; track stat.id) {
          <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div [class]="getStatIconClass(stat.type)">
                  <i [class]="stat.icon + ' text-xl'"></i>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500 dark:!text-gray-400">{{ stat.label }}</p>
                <p class="text-2xl font-bold text-gray-900 dark:!text-gray-100">{{ stat.value }}</p>
                @if (stat.change) {
                  <p [class]="getChangeClass(stat.change)" class="text-sm">
                    <i [class]="getChangeIcon(stat.change)"></i>
                    {{ Math.abs(stat.change) }}% from last month
                  </p>
                }
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Admin Actions Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Quick Actions -->
        <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:!border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:!text-gray-100">Quick Actions</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 gap-4">
              @for (action of quickActions; track action.id) {
                <button
                  [routerLink]="action.route"
                  class="relative group bg-gray-50 dark:!bg-gray-700 p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg hover:bg-gray-100 dark:hover:!bg-gray-600"
                >
                  <div>
                    <span [class]="getActionIconClass(action.type)">
                      <i [class]="action.icon"></i>
                    </span>
                  </div>
                  <div class="mt-3">
                    <h3 class="text-sm font-medium text-gray-900 dark:!text-gray-100">{{ action.title }}</h3>
                    <p class="mt-1 text-xs text-gray-500 dark:!text-gray-400">{{ action.description }}</p>
                  </div>
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:!border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:!text-gray-100">Recent Admin Activity</h3>
          </div>
          <div class="p-6">
            <div class="flow-root">
              <ul class="-my-5 divide-y divide-gray-200 dark:!divide-gray-700">
                @for (activity of recentActivity; track activity.id) {
                  <li class="py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <div [class]="getActivityIconClass(activity.type)">
                          <i [class]="getActivityIcon(activity.type)"></i>
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 dark:!text-gray-100 truncate">
                          {{ activity.title }}
                        </p>
                        <p class="text-sm text-gray-500 dark:!text-gray-400 truncate">
                          by {{ activity.user }} • {{ activity.time }}
                        </p>
                      </div>
                    </div>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- System Health -->
      <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700">
        <div class="p-6 border-b border-gray-200 dark:!border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:!text-gray-100">System Health</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (health of systemHealth; track health.id) {
              <div class="text-center">
                <div class="relative">
                  <svg class="w-16 h-16 mx-auto" viewBox="0 0 36 36">
                    <path
                      class="text-gray-200 dark:!text-gray-600"
                      stroke="currentColor"
                      stroke-width="3"
                      fill="none"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      [class]="getHealthColor(health.status)"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      fill="none"
                      [attr.stroke-dasharray]="health.percentage + ', 100'"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-sm font-semibold text-gray-900 dark:!text-gray-100">{{ health.percentage }}%</span>
                  </div>
                </div>
                <h4 class="mt-2 text-sm font-medium text-gray-900 dark:!text-gray-100">{{ health.name }}</h4>
                <p [class]="getStatusTextClass(health.status)" class="text-xs font-medium">
                  {{ health.status.toUpperCase() }}
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  stats = [
    { id: 1, label: 'Total Users', value: '2,543', icon: 'pi pi-users', type: 'users', change: 12 },
    { id: 2, label: 'Active Sessions', value: '145', icon: 'pi pi-circle', type: 'sessions', change: -3 },
    { id: 3, label: 'System Errors', value: '7', icon: 'pi pi-exclamation-triangle', type: 'errors', change: -45 },
    { id: 4, label: 'Server Uptime', value: '99.9%', icon: 'pi pi-server', type: 'uptime', change: 0.1 }
  ];

  quickActions = [
    { id: 1, title: 'Manage Users', description: 'Add, edit, or remove users', icon: 'pi pi-user-edit', type: 'users', route: '/admin/users' },
    { id: 2, title: 'System Settings', description: 'Configure system parameters', icon: 'pi pi-cog', type: 'settings', route: '/admin/settings' },
    { id: 3, title: 'View Logs', description: 'Check system and error logs', icon: 'pi pi-file', type: 'logs', route: '/admin/logs' },
    { id: 4, title: 'Security', description: 'Security settings and audit', icon: 'pi pi-shield', type: 'security', route: '/admin/security' }
  ];

  recentActivity = [
    { id: 1, type: 'user', title: 'New user registration', user: 'System', time: '2 minutes ago' },
    { id: 2, type: 'settings', title: 'System configuration updated', user: 'Admin', time: '15 minutes ago' },
    { id: 3, type: 'security', title: 'Failed login attempt blocked', user: 'Security System', time: '32 minutes ago' },
    { id: 4, type: 'maintenance', title: 'Database maintenance completed', user: 'System', time: '1 hour ago' }
  ];

  systemHealth = [
    { id: 1, name: 'CPU Usage', percentage: 65, status: 'good' },
    { id: 2, name: 'Memory', percentage: 78, status: 'warning' },
    { id: 3, name: 'Storage', percentage: 45, status: 'good' }
  ];

  Math = Math;

  ngOnInit(): void {
    // Load admin dashboard data
  }

  getStatIconClass(type: string): string {
    const baseClasses = 'w-8 h-8 rounded-md flex items-center justify-center';
    switch (type) {
      case 'users':
        return `${baseClasses} bg-blue-100 text-blue-600`;
      case 'sessions':
        return `${baseClasses} bg-green-100 text-green-600`;
      case 'errors':
        return `${baseClasses} bg-red-100 text-red-600`;
      case 'uptime':
        return `${baseClasses} bg-purple-100 text-purple-600`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-600`;
    }
  }

  getChangeClass(change: number): string {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  }

  getChangeIcon(change: number): string {
    return change >= 0 ? 'pi pi-arrow-up mr-1' : 'pi pi-arrow-down mr-1';
  }

  getActionIconClass(type: string): string {
    const baseClasses = 'rounded-lg inline-flex p-3 group-hover:scale-110 transition-transform';
    switch (type) {
      case 'users':
        return `${baseClasses} bg-blue-50 text-blue-700`;
      case 'settings':
        return `${baseClasses} bg-green-50 text-green-700`;
      case 'logs':
        return `${baseClasses} bg-orange-50 text-orange-700`;
      case 'security':
        return `${baseClasses} bg-red-50 text-red-700`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-700`;
    }
  }

  getActivityIconClass(type: string): string {
    const baseClasses = 'w-8 h-8 rounded-full flex items-center justify-center text-sm';
    switch (type) {
      case 'user':
        return `${baseClasses} bg-blue-100 text-blue-600`;
      case 'settings':
        return `${baseClasses} bg-green-100 text-green-600`;
      case 'security':
        return `${baseClasses} bg-red-100 text-red-600`;
      case 'maintenance':
        return `${baseClasses} bg-purple-100 text-purple-600`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-600`;
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'user':
        return 'pi pi-user';
      case 'settings':
        return 'pi pi-cog';
      case 'security':
        return 'pi pi-shield';
      case 'maintenance':
        return 'pi pi-wrench';
      default:
        return 'pi pi-info-circle';
    }
  }

  getHealthColor(status: string): string {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  getStatusTextClass(status: string): string {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }
}