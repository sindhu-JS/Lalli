import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <!-- Welcome Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              Welcome back, {{ currentUser()?.name }}!
            </h1>
            <p class="text-gray-600 mt-1">
              Here's what's happening with your account today.
            </p>
          </div>
          <div class="hidden md:block">
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <p class="text-sm text-gray-500">Member since</p>
                <p class="text-sm font-medium text-gray-900">{{ memberSince() }}</p>
              </div>
              <img
                [src]="avatarUrl()"
                [alt]="currentUser()?.name"
                class="w-12 h-12 rounded-full border-2 border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <i class="pi pi-chart-line text-blue-600"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Projects</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.projects }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <i class="pi pi-check-circle text-green-600"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Completed</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.completed }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <i class="pi pi-clock text-yellow-600"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">In Progress</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.inProgress }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <i class="pi pi-users text-purple-600"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Team Members</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.teamMembers }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div class="p-6">
            <div class="flow-root">
              <ul class="-my-5 divide-y divide-gray-200">
                @for (activity of recentActivities; track activity.id) {
                  <li class="py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <div [class]="getActivityIconClass(activity.type)">
                          <i [class]="getActivityIcon(activity.type)"></i>
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">
                          {{ activity.title }}
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                          {{ activity.description }}
                        </p>
                      </div>
                      <div class="flex-shrink-0 text-sm text-gray-500">
                        {{ activity.time }}
                      </div>
                    </div>
                  </li>
                }
              </ul>
            </div>
            <div class="mt-6">
              <a
                href="#"
                class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View all activity
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 gap-4">
              <button
                routerLink="/app/projects"
                class="relative group bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg hover:bg-gray-100"
              >
                <div>
                  <span class="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 group-hover:bg-blue-100">
                    <i class="pi pi-plus"></i>
                  </span>
                </div>
                <div class="mt-4">
                  <h3 class="text-lg font-medium">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    New Project
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Create a new project to get started
                  </p>
                </div>
              </button>

              <button
                routerLink="/app/team"
                class="relative group bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg hover:bg-gray-100"
              >
                <div>
                  <span class="rounded-lg inline-flex p-3 bg-green-50 text-green-700 group-hover:bg-green-100">
                    <i class="pi pi-user-plus"></i>
                  </span>
                </div>
                <div class="mt-4">
                  <h3 class="text-lg font-medium">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    Invite Team
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Invite colleagues to collaborate
                  </p>
                </div>
              </button>

              <button
                routerLink="/app/profile"
                class="relative group bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg hover:bg-gray-100"
              >
                <div>
                  <span class="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 group-hover:bg-purple-100">
                    <i class="pi pi-cog"></i>
                  </span>
                </div>
                <div class="mt-4">
                  <h3 class="text-lg font-medium">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    Settings
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Manage your account settings
                  </p>
                </div>
              </button>

              <button
                class="relative group bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg hover:bg-gray-100"
              >
                <div>
                  <span class="rounded-lg inline-flex p-3 bg-orange-50 text-orange-700 group-hover:bg-orange-100">
                    <i class="pi pi-question-circle"></i>
                  </span>
                </div>
                <div class="mt-4">
                  <h3 class="text-lg font-medium">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    Help Center
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Get help and support
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;

  stats = {
    projects: 12,
    completed: 8,
    inProgress: 4,
    teamMembers: 6
  };

  recentActivities = [
    {
      id: 1,
      type: 'project',
      title: 'New project created',
      description: 'Website Redesign project has been created',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'task',
      title: 'Task completed',
      description: 'Homepage wireframes have been completed',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'team',
      title: 'New team member',
      description: 'Sarah Johnson joined the team',
      time: '1 day ago'
    },
    {
      id: 4,
      type: 'update',
      title: 'Project updated',
      description: 'Mobile App project status changed to In Progress',
      time: '2 days ago'
    }
  ];

  memberSince = computed(() => {
    return 'Jan 2024'; // This should come from user data
  });

  avatarUrl = computed(() => {
    const user = this.currentUser();
    return user?.email
      ? `https://www.gravatar.com/avatar/${this.hashEmail(user.email)}?d=identicon&s=48`
      : 'https://i.pravatar.cc/48';
  });

  ngOnInit(): void {
    // Load dashboard data
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Simulate API calls to load dashboard data
    // In a real app, you would call services here
  }

  private hashEmail(email: string): string {
    // Simple hash function for Gravatar (in real app, use crypto.subtle.digest or similar)
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  getActivityIconClass(type: string): string {
    const baseClasses = 'w-8 h-8 rounded-full flex items-center justify-center text-sm';
    switch (type) {
      case 'project':
        return `${baseClasses} bg-blue-100 text-blue-600`;
      case 'task':
        return `${baseClasses} bg-green-100 text-green-600`;
      case 'team':
        return `${baseClasses} bg-purple-100 text-purple-600`;
      case 'update':
        return `${baseClasses} bg-orange-100 text-orange-600`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-600`;
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'project':
        return 'pi pi-folder';
      case 'task':
        return 'pi pi-check';
      case 'team':
        return 'pi pi-user';
      case 'update':
        return 'pi pi-pencil';
      default:
        return 'pi pi-info-circle';
    }
  }
}