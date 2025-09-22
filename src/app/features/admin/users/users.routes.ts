import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./users-list.component').then((c) => c.UsersListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./user-form.component').then((c) => c.UserFormComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./user-detail.component').then((c) => c.UserDetailComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./user-form.component').then((c) => c.UserFormComponent),
  },
];
