import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="project-form max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:!text-gray-100">
          {{ isEditMode ? 'Edit Project' : 'Create New Project' }}
        </h1>
        <p class="text-gray-600 dark:!text-gray-400 mt-1">
          {{ isEditMode ? 'Update project information' : 'Fill in the details below to create a new project' }}
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border">
        <form [formGroup]="projectForm" (ngSubmit)="onSubmit()" class="p-6 space-y-6">
          <!-- Basic Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  formControlName="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter project name"
                  [class.border-red-500]="isFieldInvalid('name')"
                />
                @if (isFieldInvalid('name')) {
                  <p class="mt-1 text-sm text-red-600">Project name is required</p>
                }
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  formControlName="status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  [class.border-red-500]="isFieldInvalid('status')"
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
                @if (isFieldInvalid('status')) {
                  <p class="mt-1 text-sm text-red-600">Status is required</p>
                }
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  formControlName="priority"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  formControlName="startDate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  formControlName="dueDate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  formControlName="description"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter project description..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Team & Budget -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Team & Budget</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Project Manager
                </label>
                <select
                  formControlName="manager"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select manager</option>
                  <option value="john.doe">John Doe</option>
                  <option value="jane.smith">Jane Smith</option>
                  <option value="bob.wilson">Bob Wilson</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Budget (USD)
                </label>
                <input
                  type="number"
                  formControlName="budget"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Team Members
                </label>
                <select
                  multiple
                  formControlName="teamMembers"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                >
                  <option value="alice.johnson">Alice Johnson</option>
                  <option value="charlie.brown">Charlie Brown</option>
                  <option value="david.lee">David Lee</option>
                  <option value="sarah.wilson">Sarah Wilson</option>
                  <option value="mike.davis">Mike Davis</option>
                  <option value="lisa.chen">Lisa Chen</option>
                </select>
                <p class="mt-1 text-sm text-gray-500">Hold Ctrl (Cmd) to select multiple members</p>
              </div>
            </div>
          </div>

          <!-- Tags & Categories -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Categories & Tags</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  formControlName="category"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="research">Research</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  formControlName="tags"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="frontend, react, typescript (comma separated)"
                />
              </div>
            </div>
          </div>

          @if (errorMessage) {
            <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {{ errorMessage }}
            </div>
          }

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <app-button
              type="button"
              variant="secondary"
              routerLink="/app/projects"
            >
              Cancel
            </app-button>
            <app-button
              type="submit"
              variant="primary"
              [loading]="isLoading"
              [disabled]="projectForm.invalid"
            >
              {{ isEditMode ? 'Update Project' : 'Create Project' }}
            </app-button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  projectForm: FormGroup;
  isLoading = false;
  isEditMode = false;
  errorMessage = '';
  projectId: string | null = null;

  constructor() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      priority: ['medium'],
      startDate: [''],
      dueDate: [''],
      manager: [''],
      budget: [0, Validators.min(0)],
      teamMembers: [[]],
      category: [''],
      tags: ['']
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.projectId;

    if (this.isEditMode) {
      this.loadProject();
    }
  }

  loadProject(): void {
    // Simulate loading project data
    // In a real app, you would call a service to get the project data
    const mockProject = {
      name: 'Website Redesign',
      description: 'Complete redesign of the company website with modern UI/UX principles',
      status: 'active',
      priority: 'high',
      startDate: '2024-01-15',
      dueDate: '2024-03-15',
      manager: 'john.doe',
      budget: 50000,
      teamMembers: ['alice.johnson', 'charlie.brown'],
      category: 'web-development',
      tags: 'frontend, react, typescript'
    };

    this.projectForm.patchValue(mockProject);
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formData = this.projectForm.value;

      // Process tags
      if (formData.tags) {
        formData.tags = formData.tags.split(',').map((tag: string) => tag.trim());
      }

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;

        // Navigate back to projects list
        this.router.navigate(['/app/projects']);
      }, 1500);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.projectForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}