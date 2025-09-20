import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ToastService } from '../../../shared/services/toast.service';

interface ProjectDetail {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  startDate: string;
  dueDate: string;
  budget: number;
  manager: string;
  team: string[];
  category: string;
  tags: string[];
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  assignee: string;
  dueDate: string;
}

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    @if (project) {
      <div class="project-detail max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <div class="flex items-center space-x-3">
              <button routerLink="/app/projects" class="text-gray-500 hover:text-gray-700 dark:!text-gray-400 dark:hover:!text-gray-200">
                <i class="pi pi-arrow-left"></i>
              </button>
              <h1 class="text-2xl font-bold text-gray-900 dark:!text-gray-100">{{ project.name }}</h1>
              <span
                [class]="getStatusBadgeClass(project.status)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ getStatusLabel(project.status) }}
              </span>
            </div>
            <p class="text-gray-600 dark:!text-gray-400 mt-1">{{ project.description }}</p>
          </div>
          <div class="flex space-x-3">
            <app-button
              [routerLink]="['/app/projects', project.id, 'edit']"
              variant="secondary"
            >
              <i class="pi pi-pencil mr-2"></i>
              Edit Project
            </app-button>
            <app-button
              variant="danger"
              (clicked)="deleteProject()"
            >
              <i class="pi pi-trash mr-2"></i>
              Delete
            </app-button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Progress Section -->
            <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6">
              <h2 class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-4">Project Progress</h2>
              <div class="mb-4">
                <div class="flex justify-between text-sm text-gray-600 dark:!text-gray-400 mb-2">
                  <span>Overall Progress</span>
                  <span>{{ project.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:!bg-gray-700 rounded-full h-3">
                  <div
                    class="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    [style.width.%]="project.progress"
                  ></div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-2xl font-bold text-gray-900 dark:!text-gray-100">{{ getCompletedTasks() }}</div>
                  <div class="text-sm text-gray-500 dark:!text-gray-400">Completed</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-gray-900 dark:!text-gray-100">{{ getPendingTasks() }}</div>
                  <div class="text-sm text-gray-500 dark:!text-gray-400">Pending</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-gray-900 dark:!text-gray-100">{{ project.tasks.length }}</div>
                  <div class="text-sm text-gray-500 dark:!text-gray-400">Total Tasks</div>
                </div>
              </div>
            </div>

            <!-- Tasks Section -->
            <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700">
              <div class="p-6 border-b border-gray-200 dark:!border-gray-700">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-medium text-gray-900 dark:!text-gray-100">Tasks</h2>
                  <app-button variant="primary" size="sm">
                    <i class="pi pi-plus mr-2"></i>
                    Add Task
                  </app-button>
                </div>
              </div>
              <div class="divide-y divide-gray-200 dark:!divide-gray-700">
                @for (task of project.tasks; track task.id) {
                  <div class="p-6 hover:bg-gray-50 dark:hover:!bg-gray-700">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          [checked]="task.completed"
                          (change)="toggleTask(task.id)"
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div>
                          <h3 [class]="task.completed ? 'line-through text-gray-500 dark:!text-gray-500' : 'text-gray-900 dark:!text-gray-100'"
                              class="text-sm font-medium">
                            {{ task.title }}
                          </h3>
                          <div class="flex items-center space-x-4 text-xs text-gray-500 dark:!text-gray-400 mt-1">
                            <span>Assigned to {{ task.assignee }}</span>
                            <span>Due {{ formatDate(task.dueDate) }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <button class="text-gray-400 hover:text-gray-600 dark:hover:!text-gray-300">
                          <i class="pi pi-pencil"></i>
                        </button>
                        <button class="text-gray-400 hover:text-red-600 dark:hover:!text-red-400">
                          <i class="pi pi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Project Info -->
            <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6">
              <h3 class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-4">Project Information</h3>
              <dl class="space-y-3">
                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:!text-gray-400">Priority</dt>
                  <dd [class]="getPriorityClass(project.priority)" class="text-sm font-medium mt-1">
                    {{ getPriorityLabel(project.priority) }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:!text-gray-400">Start Date</dt>
                  <dd class="text-sm text-gray-900 dark:!text-gray-100 mt-1">{{ formatDate(project.startDate) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:!text-gray-400">Due Date</dt>
                  <dd class="text-sm text-gray-900 dark:!text-gray-100 mt-1">{{ formatDate(project.dueDate) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:!text-gray-400">Budget</dt>
                  <dd class="text-sm text-gray-900 dark:!text-gray-100 mt-1">\${{ project.budget.toLocaleString() }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:!text-gray-400">Category</dt>
                  <dd class="text-sm text-gray-900 dark:!text-gray-100 mt-1">{{ project.category }}</dd>
                </div>
              </dl>
            </div>

            <!-- Project Manager -->
            <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6">
              <h3 class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-4">Project Manager</h3>
              <div class="flex items-center space-x-3">
                <img
                  [src]="getAvatarUrl(project.manager)"
                  [alt]="project.manager"
                  class="w-10 h-10 rounded-full"
                />
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:!text-gray-100">{{ project.manager }}</div>
                  <div class="text-sm text-gray-500 dark:!text-gray-400">Project Manager</div>
                </div>
              </div>
            </div>

            <!-- Team Members -->
            <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6">
              <h3 class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-4">Team Members</h3>
              <div class="space-y-3">
                @for (member of project.team; track member) {
                  <div class="flex items-center space-x-3">
                    <img
                      [src]="getAvatarUrl(member)"
                      [alt]="member"
                      class="w-8 h-8 rounded-full"
                    />
                    <div class="text-sm text-gray-900 dark:!text-gray-100">{{ member }}</div>
                  </div>
                }
              </div>
            </div>

            <!-- Tags -->
            @if (project.tags && project.tags.length > 0) {
              <div class="bg-white dark:!bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:!border-gray-700 p-6">
                <h3 class="text-lg font-medium text-gray-900 dark:!text-gray-100 mb-4">Tags</h3>
                <div class="flex flex-wrap gap-2">
                  @for (tag of project.tags; track tag) {
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    } @else {
      <div class="flex items-center justify-center h-64">
        <div class="text-center">
          <i class="pi pi-spin pi-spinner text-4xl text-gray-400 mb-4"></i>
          <p class="text-gray-500 dark:!text-gray-400">Loading project details...</p>
        </div>
      </div>
    }
  `
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  project: ProjectDetail | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProject(+id);
    }
  }

  loadProject(id: number): void {
    // Simulate API call
    setTimeout(() => {
      this.project = {
        id: id,
        name: 'Website Redesign',
        description: 'Complete redesign of the company website with modern UI/UX principles and responsive design for all devices.',
        status: 'active',
        priority: 'high',
        progress: 75,
        startDate: '2024-01-15',
        dueDate: '2024-03-15',
        budget: 50000,
        manager: 'John Doe',
        team: ['Alice Johnson', 'Charlie Brown', 'David Lee'],
        category: 'Web Development',
        tags: ['Frontend', 'React', 'TypeScript', 'Design'],
        tasks: [
          { id: 1, title: 'Create wireframes and mockups', completed: true, assignee: 'Alice Johnson', dueDate: '2024-01-20' },
          { id: 2, title: 'Set up development environment', completed: true, assignee: 'Charlie Brown', dueDate: '2024-01-25' },
          { id: 3, title: 'Implement homepage design', completed: true, assignee: 'David Lee', dueDate: '2024-02-05' },
          { id: 4, title: 'Build responsive navigation', completed: false, assignee: 'Alice Johnson', dueDate: '2024-02-15' },
          { id: 5, title: 'Integrate contact form', completed: false, assignee: 'Charlie Brown', dueDate: '2024-02-20' },
          { id: 6, title: 'Performance optimization', completed: false, assignee: 'David Lee', dueDate: '2024-03-01' },
          { id: 7, title: 'User testing and feedback', completed: false, assignee: 'Alice Johnson', dueDate: '2024-03-10' }
        ]
      };
    }, 500);
  }

  toggleTask(taskId: number): void {
    if (this.project) {
      const task = this.project.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.updateProgress();
      }
    }
  }

  updateProgress(): void {
    if (this.project) {
      const completedTasks = this.project.tasks.filter(t => t.completed).length;
      this.project.progress = Math.round((completedTasks / this.project.tasks.length) * 100);
    }
  }

  async deleteProject(): Promise<void> {
    if (!this.project) return;

    const confirmed = await this.toastService.confirm(
      `Are you sure you want to delete "${this.project.name}"? This action cannot be undone.`,
      'Delete Project',
      'Delete',
      'Cancel',
      'pi pi-exclamation-triangle',
      'p-button-danger'
    );

    if (confirmed) {
      this.toastService.success(`Project "${this.project.name}" has been deleted successfully`);
      // Implement delete logic - could navigate back to projects list
      console.log('Project deleted');
    }
  }

  getCompletedTasks(): number {
    return this.project?.tasks.filter(t => t.completed).length || 0;
  }

  getPendingTasks(): number {
    return this.project?.tasks.filter(t => !t.completed).length || 0;
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

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  }

  getPriorityLabel(priority: string): string {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getAvatarUrl(name: string): string {
    const hash = this.hashString(name);
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=40`;
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }
}