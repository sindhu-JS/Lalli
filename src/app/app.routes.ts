import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/public-layout/public-layout.component').then(
        (c) => c.PublicLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/public/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/public/about/about.component').then((c) => c.AboutComponent),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./pages/public/services/services.component').then((c) => c.ServicesComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/public/contact/contact.component').then((c) => c.ContactComponent),
      },
    ],
  },

  // Auth routes (no layout shell)
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register.component').then((c) => c.RegisterComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/auth/forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent),
      },
    ],
  },

  // Main app routes (protected)
  {
    path: 'app',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout.component').then(
        (c) => c.MainLayoutComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./features/projects/projects.routes').then((r) => r.projectRoutes),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.routes').then((r) => r.profileRoutes),
      },
      {
        path: 'team',
        loadChildren: () =>
          import('./features/team/team.routes').then((r) => r.teamRoutes),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./features/notifications/notifications.routes').then((r) => r.notificationsRoutes),
      },
    ],
  },

  // Admin routes (protected + admin role)
  {
    path: 'admin',
    loadComponent: () =>
      import('./core/layout/admin-layout/admin-layout.component').then(
        (c) => c.AdminLayoutComponent
      ),
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/admin-dashboard.component').then((c) => c.AdminDashboardComponent),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/admin/users/users.routes').then((r) => r.usersRoutes),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/admin/settings/settings.routes').then((r) => r.settingsRoutes),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.routes').then((r) => r.profileRoutes),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./features/notifications/notifications.routes').then((r) => r.notificationsRoutes),
      },
    ],
  },

  // Legacy routes (maintain backward compatibility)
  {
    path: 'modern-sass',
    loadChildren: () =>
      import('./layouts/layout.routes').then((r) => r.Layout),
  },

  // Error routes
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/errors/unauthorized/unauthorized.component').then((c) => c.UnauthorizedComponent),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/errors/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },

  // Wildcard route - must be last
  {
    path: '**',
    redirectTo: '404',
  },
];
