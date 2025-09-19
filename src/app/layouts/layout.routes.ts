import { Routes } from '@angular/router';
import { ModernSassComponent } from './modern-sass/modern-sass.component';

export const Layout: Routes = [
  {
    path: 'modern-sass',
    component: ModernSassComponent,
    data: {
      title: 'Modern SASS| Unice Landing Page',
    },
  },
];
