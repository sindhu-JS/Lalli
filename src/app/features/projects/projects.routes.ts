import { Routes } from '@angular/router';

export const projectRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./projects-list/projects-list.component').then(
        (c) => c.ProjectsListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./project-form/project-form.component').then(
        (c) => c.ProjectFormComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./project-detail/project-detail.component').then(
        (c) => c.ProjectDetailComponent
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./project-form/project-form.component').then(
        (c) => c.ProjectFormComponent
      ),
  },
];
