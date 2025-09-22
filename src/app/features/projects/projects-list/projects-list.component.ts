import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  dueDate: string;
  team: string[];
}

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="projects-list">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:!text-gray-100">
            Projects
          </h1>
          <p class="text-gray-600 dark:!text-gray-400 mt-1">
            Manage and track all your projects
          </p>
        </div>
        <a
          routerLink="/app/projects/new"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <i class="pi pi-plus mr-2"></i>
          New Project
        </a>
      </div>

      <!-- Filters -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2">
          <button
            *ngFor="let filter of filters"
            (click)="activeFilter = filter.key"
            [class]="
              filter.key === activeFilter
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:!bg-gray-800 text-gray-700 dark:!text-gray-300 hover:bg-gray-50 dark:hover:!bg-gray-700'
            "
            class="px-3 py-1 text-sm font-medium border border-gray-300 dark:!border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {{ filter.label }} ({{ getFilterCount(filter.key) }})
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (project of filteredProjects(); track project.id) {
        <div
          class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3
                  class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-2"
                >
                  <a
                    [routerLink]="['/app/projects', project.id]"
                    class="hover:text-blue-600"
                  >
                    {{ project.name }}
                  </a>
                </h3>
                <p
                  class="text-gray-600 dark:!text-gray-400 text-sm mb-4 line-clamp-2"
                >
                  {{ project.description }}
                </p>
              </div>
              <div class="flex-shrink-0 ml-4">
                <span
                  [class]="getStatusBadgeClass(project.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ getStatusLabel(project.status) }}
                </span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div
                class="flex justify-between text-sm text-gray-600 dark:!text-gray-400 mb-1"
              >
                <span>Progress</span>
                <span>{{ project.progress }}%</span>
              </div>
              <div
                class="w-full bg-gray-200 dark:!bg-gray-700 rounded-full h-2"
              >
                <div
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  [style.width.%]="project.progress"
                ></div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between text-sm">
              <div class="text-gray-500 dark:!text-gray-400">
                Due: {{ formatDate(project.dueDate) }}
              </div>
              <div class="flex -space-x-1">
                @for (member of project.team.slice(0, 3); track member) {
                <img
                  [src]="getAvatarUrl(member)"
                  [alt]="member"
                  [title]="member"
                  class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                />
                } @if (project.team.length > 3) {
                <div
                  class="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 dark:!bg-gray-700 ring-2 ring-white dark:!ring-gray-800 text-xs text-gray-600 dark:!text-gray-300"
                >
                  +{{ project.team.length - 3 }}
                </div>
                }
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div
            class="px-6 py-3 bg-gray-50 dark:!bg-gray-700 border-t border-gray-200 dark:!border-gray-700 rounded-b-lg"
          >
            <div class="flex justify-between">
              <button
                [routerLink]="['/app/projects', project.id]"
                class="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View Details
              </button>
              <div class="flex space-x-2">
                <button
                  [routerLink]="['/app/projects', project.id, 'edit']"
                  class="text-sm text-gray-600 hover:text-gray-800"
                >
                  <i class="pi pi-pencil"></i>
                </button>
                <button
                  (click)="deleteProject(project.id)"
                  class="text-sm text-red-600 hover:text-red-800"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        }
      </div>

      <!-- Empty State -->
      @if (filteredProjects().length === 0) {
      <div class="text-center py-12">
        <i class="pi pi-folder-open text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-2">
          No projects found
        </h3>
        <p class="text-gray-500 dark:!text-gray-400 mb-6">
          @if (activeFilter === 'all') { Get started by creating your first
          project. } @else { No projects match the current filter. }
        </p>
        @if (activeFilter === 'all') {
        <a
          routerLink="/app/projects/new"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <i class="pi pi-plus mr-2"></i>
          Create Project
        </a>
        }
      </div>
      }
    </div>
  `,
  styles: [
    `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
  ],
})
export class ProjectsListComponent implements OnInit {
  activeFilter = 'all';

  constructor(private toastService: ToastService) {}

  filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
    { key: 'on-hold', label: 'On Hold' },
  ];

  projects: Project[] = [
    {
      id: 1,
      name: 'Website Redesign',
      description:
        'Complete redesign of the company website with modern UI/UX principles and responsive design.',
      status: 'active',
      progress: 75,
      dueDate: '2024-03-15',
      team: [
        'john.doe@example.com',
        'jane.smith@example.com',
        'bob.wilson@example.com',
      ],
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description:
        'Native mobile application for iOS and Android platforms with cross-platform compatibility.',
      status: 'active',
      progress: 45,
      dueDate: '2024-04-20',
      team: ['alice.johnson@example.com', 'charlie.brown@example.com'],
    },
    {
      id: 3,
      name: 'Database Migration',
      description:
        'Migration from legacy database system to modern cloud-based solution.',
      status: 'completed',
      progress: 100,
      dueDate: '2024-02-28',
      team: [
        'david.lee@example.com',
        'sarah.wilson@example.com',
        'mike.davis@example.com',
        'lisa.chen@example.com',
      ],
    },
    {
      id: 4,
      name: 'API Integration',
      description:
        'Integration with third-party APIs for enhanced functionality and data synchronization.',
      status: 'on-hold',
      progress: 25,
      dueDate: '2024-05-10',
      team: ['tom.anderson@example.com'],
    },
  ];

  ngOnInit(): void {
    // Load projects data
  }

  filteredProjects(): Project[] {
    if (this.activeFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(
      (project) => project.status === this.activeFilter
    );
  }

  getFilterCount(filter: string): number {
    if (filter === 'all') {
      return this.projects.length;
    }
    return this.projects.filter((project) => project.status === filter).length;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'on-hold':
        return 'On Hold';
      default:
        return 'Unknown';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  getAvatarUrl(email: string): string {
    // Generate avatar URL (using Gravatar as example)
    const hash = this.hashEmail(email);
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=24`;
  }

  private hashEmail(email: string): string {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  async deleteProject(projectId: number): Promise<void> {
    const project = this.projects.find((p) => p.id === projectId);
    const confirmed = await this.toastService.confirm(
      `Are you sure you want to delete "${project?.name}"? This action cannot be undone.`,
      'Delete Project',
      'Delete',
      'Cancel',
      'pi pi-exclamation-triangle',
      'p-button-danger'
    );

    if (confirmed) {
      this.projects = this.projects.filter((p) => p.id !== projectId);
      this.toastService.success(
        `Project "${project?.name}" has been deleted successfully`
      );
    }
  }
}
