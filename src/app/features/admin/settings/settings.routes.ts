import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./settings.component').then((c) => c.SettingsComponent),
  },
];