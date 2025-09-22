import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
  actionText?: string;
  avatar?: string;
  source: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    CardModule,
    SelectModule,
  ],
  template: `
    <div class="notifications-page">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:!text-gray-100">
              Notifications
            </h1>
            <p class="text-gray-600 dark:!text-gray-400 mt-2">
              Stay updated with your latest activities and alerts
            </p>
          </div>
          <div class="flex space-x-3">
            <p-button
              label="Mark All Read"
              icon="pi pi-check"
              severity="secondary"
              [outlined]="true"
              (onClick)="markAllAsRead()"
              [disabled]="unreadCount === 0"
            ></p-button>
            <p-button
              label="Clear All"
              icon="pi pi-trash"
              severity="secondary"
              [outlined]="true"
              (onClick)="clearAll()"
              [disabled]="notifications.length === 0"
            ></p-button>
          </div>
        </div>
      </div>

      <!-- Stats Bar -->
      <div
        class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6 mb-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">
              {{ notifications.length }}
            </div>
            <div class="text-sm text-gray-600 dark:!text-gray-400">Total</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-red-600">{{ unreadCount }}</div>
            <div class="text-sm text-gray-600 dark:!text-gray-400">Unread</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ readCount }}</div>
            <div class="text-sm text-gray-600 dark:!text-gray-400">Read</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-600">
              {{ todayCount }}
            </div>
            <div class="text-sm text-gray-600 dark:!text-gray-400">Today</div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div
        class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6 mb-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-2"
              >Filter by Type</label
            >
            <p-select
              [(ngModel)]="selectedType"
              [options]="typeOptions"
              placeholder="All Types"
              (onChange)="filterNotifications()"
              class="w-full"
            ></p-select>
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-2"
              >Filter by Status</label
            >
            <p-select
              [(ngModel)]="selectedStatus"
              [options]="statusOptions"
              placeholder="All Status"
              (onChange)="filterNotifications()"
              class="w-full"
            ></p-select>
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-2"
              >Filter by Source</label
            >
            <p-select
              [(ngModel)]="selectedSource"
              [options]="sourceOptions"
              placeholder="All Sources"
              (onChange)="filterNotifications()"
              class="w-full"
            ></p-select>
          </div>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="space-y-4">
        @for (notification of filteredNotifications; track notification.id) {
        <div
          class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 transition-all duration-200 hover:shadow-md"
          [class]="getNotificationClasses(notification)"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <!-- Notification Content -->
              <div class="flex items-start space-x-4 flex-1">
                <!-- Avatar or Icon -->
                <div class="flex-shrink-0">
                  @if (notification.avatar) {
                  <img
                    [src]="notification.avatar"
                    [alt]="notification.source"
                    class="w-10 h-10 rounded-full"
                  />
                  } @else {
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center"
                    [class]="getTypeIconBgClass(notification.type)"
                  >
                    <i
                      [class]="
                        getTypeIcon(notification.type) + ' text-white text-sm'
                      "
                    ></i>
                  </div>
                  }
                </div>

                <!-- Notification Details -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-2">
                    <h3
                      class="text-sm font-medium text-gray-900 dark:!text-gray-100 truncate"
                    >
                      {{ notification.title }}
                    </h3>
                    <div class="flex items-center space-x-2">
                      @if (!notification.read) {
                      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      }
                      <span class="text-xs text-gray-500 dark:!text-gray-400">{{
                        getTimeAgo(notification.timestamp)
                      }}</span>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 dark:!text-gray-400 mb-3">
                    {{ notification.message }}
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        [class]="getTypeBadgeClass(notification.type)"
                      >
                        {{ notification.type | titlecase }}
                      </span>
                      <span class="text-xs text-gray-500 dark:!text-gray-400">{{
                        notification.source
                      }}</span>
                    </div>
                    @if (notification.actionUrl && notification.actionText) {
                    <button
                      [routerLink]="notification.actionUrl"
                      class="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {{ notification.actionText }}
                    </button>
                    }
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center space-x-2 ml-4">
                @if (!notification.read) {
                <button
                  (click)="markAsRead(notification)"
                  class="p-2 text-gray-400 hover:text-blue-600 dark:hover:!text-blue-400 rounded-md hover:bg-blue-50 dark:hover:!bg-blue-900"
                  title="Mark as read"
                >
                  <i class="pi pi-check text-sm"></i>
                </button>
                }
                <button
                  (click)="deleteNotification(notification.id)"
                  class="p-2 text-gray-400 hover:text-red-600 dark:hover:!text-red-400 rounded-md hover:bg-red-50 dark:hover:!bg-red-900"
                  title="Delete"
                >
                  <i class="pi pi-trash text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        }
      </div>

      <!-- Empty State -->
      @if (filteredNotifications.length === 0) {
      <div class="text-center py-12">
        <i class="pi pi-bell text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-2">
          No notifications found
        </h3>
        <p class="text-gray-600 dark:!text-gray-400 mb-6">
          @if (hasActiveFilters()) { Try adjusting your filters to see more
          notifications. } @else { You're all caught up! New notifications will
          appear here. }
        </p>
        @if (hasActiveFilters()) {
        <p-button
          label="Clear Filters"
          severity="secondary"
          [outlined]="true"
          (onClick)="clearFilters()"
        ></p-button>
        }
      </div>
      }
    </div>
  `,
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];

  selectedType = '';
  selectedStatus = '';
  selectedSource = '';

  typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'info', label: 'Info' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
  ];

  statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'read', label: 'Read' },
    { value: 'unread', label: 'Unread' },
  ];

  sourceOptions = [
    { value: '', label: 'All Sources' },
    { value: 'System', label: 'System' },
    { value: 'Projects', label: 'Projects' },
    { value: 'Team', label: 'Team' },
    { value: 'Security', label: 'Security' },
  ];

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  get readCount(): number {
    return this.notifications.filter((n) => n.read).length;
  }

  get todayCount(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.notifications.filter((n) => n.timestamp >= today).length;
  }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    // Mock notification data
    this.notifications = [
      {
        id: 1,
        title: 'Project Update',
        message:
          'The "Web Redesign" project has been updated with new requirements.',
        type: 'info',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        actionUrl: '/app/projects',
        actionText: 'View Project',
        source: 'Projects',
      },
      {
        id: 2,
        title: 'New Team Member',
        message: 'Sarah Johnson has joined your team as a UI/UX Designer.',
        type: 'success',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        actionUrl: '/app/team',
        actionText: 'View Team',
        avatar: 'https://i.pravatar.cc/40?img=1',
        source: 'Team',
      },
      {
        id: 3,
        title: 'Security Alert',
        message:
          'Multiple failed login attempts detected from unknown location.',
        type: 'warning',
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        actionUrl: '/app/profile',
        actionText: 'Review Security',
        source: 'Security',
      },
      {
        id: 4,
        title: 'System Maintenance',
        message:
          'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM.',
        type: 'info',
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        source: 'System',
      },
      {
        id: 5,
        title: 'Task Deadline',
        message:
          'The task "API Integration" is due tomorrow. Please update the status.',
        type: 'warning',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
        actionUrl: '/app/projects',
        actionText: 'Update Task',
        source: 'Projects',
      },
      {
        id: 6,
        title: 'Payment Processed',
        message:
          'Your monthly subscription payment has been processed successfully.',
        type: 'success',
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        source: 'System',
      },
      {
        id: 7,
        title: 'Server Error',
        message:
          'Application server experienced temporary downtime. All services are now restored.',
        type: 'error',
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        source: 'System',
      },
    ];

    this.filteredNotifications = [...this.notifications];
  }

  filterNotifications(): void {
    this.filteredNotifications = this.notifications.filter((notification) => {
      const matchesType =
        !this.selectedType || notification.type === this.selectedType;
      const matchesStatus =
        !this.selectedStatus ||
        (this.selectedStatus === 'read' && notification.read) ||
        (this.selectedStatus === 'unread' && !notification.read);
      const matchesSource =
        !this.selectedSource || notification.source === this.selectedSource;

      return matchesType && matchesStatus && matchesSource;
    });
  }

  markAsRead(notification: Notification): void {
    notification.read = true;
    this.filterNotifications();
  }

  markAllAsRead(): void {
    this.notifications.forEach((notification) => {
      notification.read = true;
    });
    this.filterNotifications();
  }

  deleteNotification(id: number): void {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.filterNotifications();
  }

  clearAll(): void {
    this.notifications = [];
    this.filteredNotifications = [];
  }

  clearFilters(): void {
    this.selectedType = '';
    this.selectedStatus = '';
    this.selectedSource = '';
    this.filterNotifications();
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedType || this.selectedStatus || this.selectedSource);
  }

  getNotificationClasses(notification: Notification): string {
    const baseClasses = '';
    return notification.read
      ? baseClasses
      : baseClasses + ' border-l-4 border-l-blue-500';
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'pi pi-check-circle';
      case 'warning':
        return 'pi pi-exclamation-triangle';
      case 'error':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-info-circle';
    }
  }

  getTypeIconBgClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  }

  getTypeBadgeClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return timestamp.toLocaleDateString();
  }
}
