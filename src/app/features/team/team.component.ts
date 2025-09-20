import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
  status: 'active' | 'away' | 'busy';
  joinDate: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule, CardModule, InputTextModule, SelectModule],
  template: `
    <div class="team-page">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:!text-gray-100">Team Members</h1>
            <p class="text-gray-600 dark:!text-gray-400 mt-2">
              Manage your team members and their roles
            </p>
          </div>
          <div class="flex space-x-3">
            <p-button
              label="Export"
              icon="pi pi-download"
              severity="secondary"
              [outlined]="true"
            ></p-button>
            <p-button
              label="Invite Member"
              icon="pi pi-plus"
            ></p-button>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <i class="pi pi-users text-blue-600"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:!text-gray-400">Total Members</p>
              <p class="text-2xl font-bold text-gray-900 dark:!text-gray-100">{{ teamMembers.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <i class="pi pi-check-circle text-green-600"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:!text-gray-400">Active</p>
              <p class="text-2xl font-bold text-gray-900 dark:!text-gray-100">{{ getActiveCount() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <i class="pi pi-clock text-yellow-600"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:!text-gray-400">Away</p>
              <p class="text-2xl font-bold text-gray-900 dark:!text-gray-100">{{ getAwayCount() }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <i class="pi pi-times-circle text-red-600"></i>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:!text-gray-400">Busy</p>
              <p class="text-2xl font-bold text-gray-900 dark:!text-gray-100">{{ getBusyCount() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-2">Search</label>
            <input
              pInputText
              type="text"
              placeholder="Search team members..."
              [(ngModel)]="searchTerm"
              (input)="filterTeamMembers()"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-2">Department</label>
            <p-select
              [(ngModel)]="selectedDepartment"
              [options]="departmentOptions"
              placeholder="All Departments"
              (onChange)="filterTeamMembers()"
              class="w-full"
            ></p-select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-2">Role</label>
            <p-select
              [(ngModel)]="selectedRole"
              [options]="roleOptions"
              placeholder="All Roles"
              (onChange)="filterTeamMembers()"
              class="w-full"
            ></p-select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-2">Status</label>
            <p-select
              [(ngModel)]="selectedStatus"
              [options]="statusOptions"
              placeholder="All Statuses"
              (onChange)="filterTeamMembers()"
              class="w-full"
            ></p-select>
          </div>
        </div>
      </div>

      <!-- Team Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @for (member of filteredTeamMembers; track member.id) {
          <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6 hover:shadow-md transition-shadow">
            <!-- Member Avatar and Status -->
            <div class="flex items-center justify-between mb-4">
              <div class="relative">
                <img
                  [src]="member.avatar"
                  [alt]="member.name"
                  class="w-12 h-12 rounded-full border-2 border-gray-200 dark:!border-gray-700"
                />
                <div
                  class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                  [class]="getStatusColorClass(member.status)"
                ></div>
              </div>
              <div class="flex space-x-2">
                <button
                  class="p-2 text-gray-400 hover:text-gray-600 dark:hover:!text-gray-300 rounded-md hover:bg-gray-50 dark:hover:!bg-gray-700"
                  title="Edit"
                >
                  <i class="pi pi-pencil text-sm"></i>
                </button>
                <button
                  class="p-2 text-gray-400 hover:text-red-600 dark:hover:!text-red-400 rounded-md hover:bg-red-50 dark:hover:!bg-red-900"
                  title="Remove"
                >
                  <i class="pi pi-trash text-sm"></i>
                </button>
              </div>
            </div>

            <!-- Member Info -->
            <div class="text-center mb-4">
              <h3 class="font-semibold text-gray-900 dark:!text-gray-100 mb-1">{{ member.name }}</h3>
              <p class="text-sm text-gray-600 dark:!text-gray-400 mb-2">{{ member.role }}</p>
              <p class="text-xs text-gray-500 dark:!text-gray-400">{{ member.department }}</p>
            </div>

            <!-- Contact Info -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm text-gray-600 dark:!text-gray-400">
                <i class="pi pi-envelope mr-2 text-xs"></i>
                <span class="truncate">{{ member.email }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-600 dark:!text-gray-400">
                <i class="pi pi-calendar mr-2 text-xs"></i>
                <span>Joined {{ member.joinDate }}</span>
              </div>
            </div>

            <!-- Status Badge -->
            <div class="flex justify-center">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                [class]="getStatusBadgeClass(member.status)"
              >
                {{ member.status | titlecase }}
              </span>
            </div>
          </div>
        }
      </div>

      <!-- Empty State -->
      @if (filteredTeamMembers.length === 0) {
        <div class="text-center py-12">
          <i class="pi pi-users text-4xl text-gray-400 mb-4"></i>
          <h3 class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-2">No team members found</h3>
          <p class="text-gray-600 dark:!text-gray-400 mb-6">
            @if (hasActiveFilters()) {
              Try adjusting your filters to see more results.
            } @else {
              Get started by inviting your first team member.
            }
          </p>
          @if (!hasActiveFilters()) {
            <p-button
              label="Invite First Member"
              icon="pi pi-plus"
            ></p-button>
          }
        </div>
      }

    </div>
  `
})
export class TeamComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  filteredTeamMembers: TeamMember[] = [];

  searchTerm = '';
  selectedDepartment = '';
  selectedRole = '';
  selectedStatus = '';

  departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Product', label: 'Product' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' }
  ];

  roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Senior Developer', label: 'Senior Developer' },
    { value: 'Product Manager', label: 'Product Manager' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'Marketing Manager', label: 'Marketing Manager' },
    { value: 'Sales Representative', label: 'Sales Representative' }
  ];

  statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'away', label: 'Away' },
    { value: 'busy', label: 'Busy' }
  ];

  ngOnInit(): void {
    this.loadTeamMembers();
  }

  loadTeamMembers(): void {
    // Mock team data
    this.teamMembers = [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        role: 'Senior Developer',
        department: 'Engineering',
        avatar: 'https://i.pravatar.cc/100?img=1',
        status: 'active',
        joinDate: 'Jan 2023'
      },
      {
        id: 2,
        name: 'Bob Wilson',
        email: 'bob.wilson@example.com',
        role: 'Product Manager',
        department: 'Product',
        avatar: 'https://i.pravatar.cc/100?img=2',
        status: 'busy',
        joinDate: 'Mar 2023'
      },
      {
        id: 3,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        role: 'UI/UX Designer',
        department: 'Design',
        avatar: 'https://i.pravatar.cc/100?img=3',
        status: 'active',
        joinDate: 'Feb 2023'
      },
      {
        id: 4,
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        role: 'Marketing Manager',
        department: 'Marketing',
        avatar: 'https://i.pravatar.cc/100?img=4',
        status: 'away',
        joinDate: 'Apr 2023'
      },
      {
        id: 5,
        name: 'Edward Smith',
        email: 'edward.smith@example.com',
        role: 'Senior Developer',
        department: 'Engineering',
        avatar: 'https://i.pravatar.cc/100?img=5',
        status: 'active',
        joinDate: 'Dec 2022'
      },
      {
        id: 6,
        name: 'Fiona Davis',
        email: 'fiona.davis@example.com',
        role: 'Sales Representative',
        department: 'Sales',
        avatar: 'https://i.pravatar.cc/100?img=6',
        status: 'busy',
        joinDate: 'May 2023'
      }
    ];

    this.filteredTeamMembers = [...this.teamMembers];
  }

  filterTeamMembers(): void {
    this.filteredTeamMembers = this.teamMembers.filter(member => {
      const matchesSearch = !this.searchTerm ||
        member.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesDepartment = !this.selectedDepartment || member.department === this.selectedDepartment;
      const matchesRole = !this.selectedRole || member.role === this.selectedRole;
      const matchesStatus = !this.selectedStatus || member.status === this.selectedStatus;

      return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
    });
  }

  getStatusColorClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'away':
        return 'bg-yellow-100 text-yellow-800';
      case 'busy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  hasActiveFilters(): boolean {
    return !!(this.searchTerm || this.selectedDepartment || this.selectedRole || this.selectedStatus);
  }

  getActiveCount(): number {
    return this.teamMembers.filter(member => member.status === 'active').length;
  }

  getAwayCount(): number {
    return this.teamMembers.filter(member => member.status === 'away').length;
  }

  getBusyCount(): number {
    return this.teamMembers.filter(member => member.status === 'busy').length;
  }
}