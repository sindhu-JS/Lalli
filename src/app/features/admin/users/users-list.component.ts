import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdAt: string;
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, InputTextModule, SelectModule, ButtonModule, TooltipModule, ButtonComponent],
  template: `
    <div class="users-list">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
          <p class="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <app-button
          routerLink="/admin/users/new"
          variant="primary"
        >
          <i class="pi pi-plus mr-2"></i>
          Add User
        </app-button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border mb-6">
        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                pInputText
                type="text"
                [(ngModel)]="searchQuery"
                placeholder="Search users..."
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <p-select
                [(ngModel)]="selectedRole"
                [options]="roleOptions"
                placeholder="All Roles"
                optionLabel="label"
                optionValue="value"
                [showClear]="true"
                class="w-full"
              ></p-select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <p-select
                [(ngModel)]="selectedStatus"
                [options]="statusOptions"
                placeholder="All Status"
                optionLabel="label"
                optionValue="value"
                [showClear]="true"
                class="w-full"
              ></p-select>
            </div>
            <div class="flex items-end">
              <app-button
                variant="secondary"
                [fullWidth]="true"
                (clicked)="clearFilters()"
              >
                Clear Filters
              </app-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              @for (user of filteredUsers(); track user.id) {
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img
                        [src]="getAvatarUrl(user.email)"
                        [alt]="user.name"
                        class="h-10 w-10 rounded-full"
                      />
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      [class]="getRoleBadgeClass(user.role)"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    >
                      {{ user.role === 'admin' ? 'Administrator' : 'User' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      [class]="getStatusBadgeClass(user.status)"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    >
                      {{ getStatusLabel(user.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.lastLogin) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <p-button
                        [routerLink]="['/admin/users', user.id]"
                        icon="pi pi-eye"
                        [text]="true"
                        size="small"
                        severity="info"
                        pTooltip="View Details"
                      ></p-button>
                      <p-button
                        [routerLink]="['/admin/users', user.id, 'edit']"
                        icon="pi pi-pencil"
                        [text]="true"
                        size="small"
                        severity="success"
                        pTooltip="Edit User"
                      ></p-button>
                      <p-button
                        (onClick)="toggleUserStatus(user)"
                        [icon]="user.status === 'active' ? 'pi pi-pause' : 'pi pi-play'"
                        [text]="true"
                        size="small"
                        [severity]="user.status === 'active' ? 'secondary' : 'success'"
                        [pTooltip]="user.status === 'active' ? 'Suspend User' : 'Activate User'"
                      ></p-button>
                      <p-button
                        (onClick)="deleteUser(user)"
                        icon="pi pi-trash"
                        [text]="true"
                        size="small"
                        severity="danger"
                        pTooltip="Delete User"
                      ></p-button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        @if (filteredUsers().length === 0) {
          <div class="text-center py-12">
            <i class="pi pi-users text-4xl text-gray-400 mb-4"></i>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p class="text-gray-500 mb-6">
              @if (hasActiveFilters()) {
                No users match your current filters.
              } @else {
                Get started by creating your first user.
              }
            </p>
            @if (!hasActiveFilters()) {
              <app-button
                routerLink="/admin/users/new"
                variant="primary"
              >
                <i class="pi pi-plus mr-2"></i>
                Add First User
              </app-button>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class UsersListComponent {
  searchQuery = '';
  selectedRole = '';
  selectedStatus = '';

  roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' }
  ];

  statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  users: AdminUser[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2023-06-01T09:00:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-14T16:45:00Z',
      createdAt: '2023-07-15T14:20:00Z'
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      role: 'user',
      status: 'inactive',
      lastLogin: '2023-12-20T11:15:00Z',
      createdAt: '2023-08-10T10:30:00Z'
    },
    {
      id: '4',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'user',
      status: 'suspended',
      lastLogin: '2024-01-10T08:20:00Z',
      createdAt: '2023-09-05T13:45:00Z'
    }
  ];

  filteredUsers(): AdminUser[] {
    return this.users.filter(user => {
      const matchesSearch = !this.searchQuery ||
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesRole = !this.selectedRole || user.role === this.selectedRole;
      const matchesStatus = !this.selectedStatus || user.status === this.selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  hasActiveFilters(): boolean {
    return !!this.searchQuery || !!this.selectedRole || !!this.selectedStatus;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedRole = '';
    this.selectedStatus = '';
  }

  toggleUserStatus(user: AdminUser): void {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    const action = newStatus === 'active' ? 'activate' : 'suspend';

    if (confirm(`Are you sure you want to ${action} ${user.name}?`)) {
      user.status = newStatus;
    }
  }

  deleteUser(user: AdminUser): void {
    if (confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }

  getRoleBadgeClass(role: string): string {
    return role === 'admin'
      ? 'bg-purple-100 text-purple-800'
      : 'bg-blue-100 text-blue-800';
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'suspended':
        return 'Suspended';
      default:
        return 'Unknown';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getAvatarUrl(email: string): string {
    const hash = this.hashEmail(email);
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=40`;
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