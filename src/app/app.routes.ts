import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'modern-sass',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/layouts/layout.routes').then((r) => r.Layout),
  },
];
