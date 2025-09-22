# Lalli Project Architecture Documentation

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Folder Structure](#folder-structure)
- [Navigation Structure](#navigation-structure)
- [User Roles and Permissions](#user-roles-and-permissions)
- [Component Architecture](#component-architecture)
- [Service Layer](#service-layer)
- [State Management](#state-management)
- [Security Implementation](#security-implementation)
- [Design Patterns](#design-patterns)

---

## Overview

Lalli is a modern Angular 18 project management application built with enterprise-grade architecture principles. The application follows a modular, scalable design using standalone components, modern Angular features, and industry best practices.

### Key Architectural Principles

- **Modularity**: Feature-based module organization
- **Separation of Concerns**: Clear separation between presentation, business logic, and data layers
- **Scalability**: Designed to handle growing complexity and team size
- **Maintainability**: Clean code practices with proper documentation
- **Performance**: Lazy loading, OnPush change detection, and optimized bundles
- **Security**: JWT-based authentication with role-based access control

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Angular 18)                    │
├─────────────────┬─────────────────┬─────────────────────────┤
│   Presentation  │  Business Logic │      Data Layer         │
│     Layer       │      Layer      │        Layer            │
├─────────────────┼─────────────────┼─────────────────────────┤
│ • Components    │ • Services      │ • HTTP Interceptors     │
│ • Directives    │ • Guards        │ • API Services          │
│ • Pipes         │ • Resolvers     │ • State Management      │
│ • Templates     │ • Validators    │ • Local Storage         │
└─────────────────┴─────────────────┴─────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend API (Future)                     │
├─────────────────────────────────────────────────────────────┤
│ • RESTful API Endpoints                                     │
│ • JWT Authentication                                        │
│ • Database Integration                                      │
│ • Business Logic                                            │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Core Framework
- **Angular 18**: Primary framework with standalone components
- **TypeScript 5.x**: Type safety and modern JS features
- **Nx**: Monorepo tooling and build optimization
- **RxJS**: Reactive programming and state management

#### UI/UX Layer
- **PrimeNG**: Enterprise UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **PrimeIcons**: Icon library
- **Angular CDK**: Component development kit

#### Development & Build Tools
- **Nx**: Build system and workspace management
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality gates

---

## Folder Structure

### Root Level Structure

```
Lalli/
├── src/                          # Source code
│   ├── app/                     # Application source
│   ├── assets/                  # Static assets
│   ├── environments/            # Environment configurations
│   └── styles/                  # Global styles
├── public/                      # Public assets (Sass themes, images)
├── docs/                        # Project documentation
├── dist/                        # Build output
├── node_modules/               # Dependencies
├── nx.json                     # Nx workspace configuration
├── project.json                # Project configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies and scripts
```

### Application Structure (`src/app/`)

```
src/app/
├── core/                       # Core application modules
│   ├── guards/                # Route guards
│   │   ├── auth.guard.ts      # Authentication guard
│   │   └── role.guard.ts      # Role-based guard
│   ├── interceptors/          # HTTP interceptors
│   │   ├── auth.interceptor.ts # JWT token interceptor
│   │   └── error.interceptor.ts # Error handling interceptor
│   └── layout/                # Layout components
│       ├── main-layout/       # Main application layout
│       ├── auth-layout/       # Authentication layout
│       └── public-layout/     # Public pages layout
├── features/                   # Feature modules
│   ├── auth/                  # Authentication feature
│   │   ├── login.component.ts
│   │   ├── register.component.ts
│   │   └── forgot-password.component.ts
│   ├── dashboard/             # Dashboard feature
│   │   ├── admin-dashboard.component.ts
│   │   └── user-dashboard.component.ts
│   ├── projects/              # Project management
│   │   ├── projects-list/
│   │   ├── project-detail/
│   │   └── project-form/
│   ├── team/                  # Team management
│   │   ├── team.component.ts
│   │   └── users-list/
│   ├── profile/               # User profile
│   │   └── profile.component.ts
│   ├── notifications/         # Notifications
│   │   └── notifications.component.ts
│   └── settings/              # Application settings
│       └── settings.component.ts
├── shared/                     # Shared modules
│   ├── components/            # Reusable components
│   │   ├── button/            # Custom button component
│   │   ├── modal/             # Modal component
│   │   ├── loading/           # Loading spinner
│   │   ├── confirmation/      # Confirmation dialog
│   │   └── tap-to-top/        # Scroll to top
│   ├── services/              # Shared services
│   │   ├── auth.service.ts    # Authentication service
│   │   ├── theme.service.ts   # Theme management
│   │   ├── toast.service.ts   # Notification service
│   │   ├── loading.service.ts # Loading state management
│   │   └── storage.service.ts # Local storage utilities
│   ├── models/                # TypeScript interfaces
│   │   ├── user.interface.ts  # User model
│   │   ├── project.interface.ts # Project model
│   │   └── api.interface.ts   # API response models
│   ├── utils/                 # Utility functions
│   │   ├── validators.ts      # Custom validators
│   │   ├── constants.ts       # Application constants
│   │   └── helpers.ts         # Helper functions
│   └── pipes/                 # Custom pipes
│       └── safe-html.pipe.ts  # HTML sanitization pipe
├── pages/                      # Public page components
│   └── public-modern/         # Modern public pages
│       ├── public-modern-header/
│       ├── public-modern-feature/
│       └── public-modern-footer/
├── app.component.ts           # Root component
├── app.config.ts              # Application configuration
└── app.routes.ts              # Application routes
```

---

## Navigation Structure

### Route Hierarchy

```
/ (Root)
├── /                          # Home/Landing page
├── /auth                      # Authentication routes
│   ├── /login                # Login page
│   ├── /register             # Registration page
│   └── /forgot-password      # Password reset
├── /app                       # Protected application routes
│   ├── /dashboard            # Dashboard (role-based)
│   ├── /projects             # Project management
│   │   ├── /                # Projects list
│   │   ├── /new             # Create new project
│   │   ├── /:id             # Project details
│   │   └── /:id/edit        # Edit project
│   ├── /team                 # Team management
│   │   ├── /                # Team overview
│   │   └── /users           # User list
│   ├── /profile              # User profile
│   ├── /notifications        # Notifications
│   └── /settings             # Application settings
└── /public                    # Public pages
    └── /modern               # Modern landing pages
```

### Navigation Guards

```typescript
// Route protection implementation
interface RouteGuard {
  canActivate: boolean;
  requiredRoles?: UserRole[];
  redirectTo?: string;
}

Routes:
/app/*          → AuthGuard (requires authentication)
/app/settings/* → RoleGuard (requires admin role)
/auth/*         → GuestGuard (redirects authenticated users)
```

### Breadcrumb Navigation

```
Dashboard
├── Projects > Project List
├── Projects > New Project
├── Projects > [Project Name] > Details
├── Projects > [Project Name] > Edit
├── Team > Overview
├── Team > Users
├── Profile
├── Notifications
└── Settings
```

---

## User Roles and Permissions

### Current Implementation

The application currently implements a **simple 3-role system**:

```typescript
// Current implementation in src/app/shared/services/auth.service.ts
export type UserRole = 'anonymous' | 'user' | 'admin';

// Mock users for testing
const MOCK_USERS = [
  {
    role: 'admin' as UserRole,    // Administrator access
    email: 'admin@lalli.com',
    password: 'admin123$'
  },
  {
    role: 'user' as UserRole,     // Regular user access
    email: 'user@lalli.com',
    password: 'user123$'
  }
];
```

#### Current Role Definitions:
- **`'anonymous'`**: Unauthenticated users (public access)
- **`'user'`**: Authenticated users with basic access
- **`'admin'`**: Authenticated users with administrative privileges

#### Current Permission Checks:
```typescript
// In admin.guard.ts
if (user.role !== 'admin') {
  // Redirect to unauthorized page
  this.router.navigate(['/unauthorized']);
  return false;
}
```

#### Current Job Title Roles (Display Only)

The application also has **job title roles** for team member display purposes (not for permissions):

```typescript
// In src/app/features/team/team.component.ts
roleOptions = [
  { value: 'Senior Developer', label: 'Senior Developer' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'UI/UX Designer', label: 'UI/UX Designer' },
  { value: 'Marketing Manager', label: 'Marketing Manager' },
  { value: 'Sales Representative', label: 'Sales Representative' },
];
```

> **Note**: These job titles are for display/organizational purposes only and don't affect permissions. All permission checks are based on the system roles (`'anonymous'`, `'user'`, `'admin'`).

### Future/Suggested Implementation (Migration Guide)

For **enterprise-level applications** or when more granular permissions are needed, consider implementing this expanded role system:

#### Suggested Role Hierarchy

```
Future System Roles:
├── Super Admin (SUPER_ADMIN)
├── Admin (ADMIN)
├── Project Manager (PROJECT_MANAGER)
├── Team Lead (TEAM_LEAD)
├── Developer (DEVELOPER)
└── Viewer (VIEWER)
```

#### Suggested Future Role Definitions

> **Note**: These are suggested roles for future implementation. The current system uses the simple 3-role model above.

##### Super Admin (SUPER_ADMIN)
- **Description**: Highest level of access with system-wide permissions
- **Permissions**:
  - Full system access
  - User management (create, edit, delete, assign roles)
  - System configuration
  - All project operations
  - Analytics and reporting
  - Security settings

##### Admin (ADMIN)
- **Description**: Administrative access for organizational management
- **Permissions**:
  - User management within organization
  - Project creation and management
  - Team management
  - Settings configuration
  - Reports and analytics
  - Cannot modify system-level settings

##### Project Manager (PROJECT_MANAGER)
- **Description**: Manages specific projects and teams
- **Permissions**:
  - Create and manage assigned projects
  - Assign team members to projects
  - View and edit project details
  - Monitor project progress
  - Generate project reports
  - Cannot manage users outside assigned projects

##### Team Lead (TEAM_LEAD)
- **Description**: Leads development teams on projects
- **Permissions**:
  - View and update assigned projects
  - Manage team tasks and assignments
  - Update project progress
  - View team member information
  - Cannot create new projects
  - Limited user management (team members only)

##### Developer (DEVELOPER)
- **Description**: Standard project contributor
- **Permissions**:
  - View assigned projects
  - Update own tasks and progress
  - View team information
  - Edit own profile
  - Cannot manage projects or users

##### Viewer (VIEWER)
- **Description**: Read-only access for stakeholders
- **Permissions**:
  - View project information
  - View reports and dashboards
  - View team information
  - No edit permissions
  - Cannot access sensitive data

#### Migration Guide: Permission Matrix (Future Implementation)

> **Note**: This is a suggested permission matrix for the expanded role system. Currently, the app only distinguishes between `'user'` and `'admin'` roles.

| Feature | Super Admin | Admin | Project Manager | Team Lead | Developer | Viewer |
|---------|-------------|-------|-----------------|-----------|-----------|--------|
| **User Management** |
| Create Users | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit Users | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ❌ |
| Delete Users | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Assign Roles | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Project Management** |
| Create Projects | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit Projects | ✅ | ✅ | ⚠️ | ⚠️ | ❌ | ❌ |
| Delete Projects | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| View Projects | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| **Team Management** |
| Assign Team Members | ✅ | ✅ | ⚠️ | ⚠️ | ❌ | ❌ |
| View Team | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| **System Settings** |
| System Configuration | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Organization Settings | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Reports & Analytics** |
| System Reports | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Project Reports | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ |

**Legend:**
- ✅ Full Access
- ⚠️ Limited Access (only assigned/owned resources)
- ❌ No Access

#### Migration Guide: Suggested Permission Service Implementation

> **Future Implementation Pattern**: This is a suggested pattern for implementing granular permissions. Currently, the app uses simple role checks in guards.

```typescript
// Future PermissionService implementation
export class PermissionService {
  private userRole = signal<UserRole>('VIEWER');

  hasPermission(permission: Permission, resource?: any): boolean {
    const role = this.userRole();

    switch (permission) {
      case 'CREATE_PROJECT':
        return ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER'].includes(role);

      case 'EDIT_PROJECT':
        if (['SUPER_ADMIN', 'ADMIN'].includes(role)) return true;
        if (role === 'PROJECT_MANAGER' && this.isProjectOwner(resource)) return true;
        return false;

      case 'VIEW_PROJECT':
        if (['SUPER_ADMIN', 'ADMIN'].includes(role)) return true;
        return this.isProjectMember(resource);

      default:
        return false;
    }
  }
}
```

#### Migration Guide: Enhanced Route Protection (Future Implementation)

> **Current Implementation**: Routes are protected with simple `AuthGuard` and `AdminGuard`. This is the suggested pattern for expanded role-based protection.

```typescript
// Future enhanced role-based route guards
export const routes: Routes = [
  {
    path: 'app/settings',
    component: SettingsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { requiredRoles: ['SUPER_ADMIN', 'ADMIN'] }
  },
  {
    path: 'app/projects/new',
    component: ProjectFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { requiredRoles: ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER'] }
  }
];
```

### Migration Path: From Simple to Enterprise Roles

When you're ready to implement the expanded role system, follow these steps:

#### Step 1: Update Type Definitions
```typescript
// Update src/app/shared/services/auth.service.ts
export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'PROJECT_MANAGER'
  | 'TEAM_LEAD'
  | 'DEVELOPER'
  | 'VIEWER';
```

#### Step 2: Create Permission Service
```typescript
// Create src/app/shared/services/permission.service.ts
@Injectable({ providedIn: 'root' })
export class PermissionService {
  // Implementation as shown above in suggested patterns
}
```

#### Step 3: Update Guards
```typescript
// Update guards to use PermissionService instead of simple role checks
export class RoleGuard implements CanActivate {
  constructor(private permissionService: PermissionService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['requiredRoles'] as UserRole[];
    return requiredRoles.some(role =>
      this.permissionService.hasRole(role)
    );
  }
}
```

#### Step 4: Update Route Configurations
```typescript
// Add role requirements to routes
{
  path: 'admin',
  canActivate: [RoleGuard],
  data: { requiredRoles: ['SUPER_ADMIN', 'ADMIN'] }
}
```

#### Step 5: Update Components
```typescript
// Use PermissionService in components
@Component({...})
export class ExampleComponent {
  canEdit = computed(() =>
    this.permissionService.hasPermission('EDIT_PROJECT', this.project())
  );
}
```

#### Benefits of Migration:
- **Granular Permissions**: Fine-tuned access control
- **Scalability**: Easy to add new roles and permissions
- **Security**: Principle of least privilege
- **Maintainability**: Centralized permission logic

---

## Component Architecture

### Component Hierarchy

```
App Component (Root)
├── Auth Layout
│   ├── Login Component
│   ├── Register Component
│   └── Forgot Password Component
├── Main Layout
│   ├── Header Component
│   │   ├── Navigation Menu
│   │   ├── Theme Toggle
│   │   └── User Menu
│   ├── Main Content Area
│   │   └── Feature Components
│   └── Footer Component
└── Public Layout
    ├── Public Header
    ├── Landing Pages
    └── Public Footer
```

### Standalone Components

All components follow Angular 18's standalone component architecture:

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, RouterModule, /* other imports */],
  template: `...`,
  providers: [/* component-specific providers */]
})
export class ExampleComponent {
  // Component implementation
}
```

### Component Communication Patterns

1. **Parent to Child**: `@Input()` properties
2. **Child to Parent**: `@Output()` events
3. **Sibling Components**: Shared services with signals
4. **Global State**: Injectable services with signals

---

## Service Layer

### Service Architecture

```
Service Layer
├── Core Services (Global)
│   ├── AuthService          # Authentication management
│   ├── ThemeService         # Theme and dark mode
│   ├── ToastService         # Notifications
│   ├── LoadingService       # Global loading states
│   └── StorageService       # Local/session storage
├── Feature Services
│   ├── ProjectService       # Project CRUD operations
│   ├── UserService          # User management
│   ├── TeamService          # Team operations
│   └── NotificationService  # User notifications
└── Utility Services
    ├── ValidationService    # Custom validations
    ├── DateService          # Date formatting/manipulation
    └── ExportService        # Data export utilities
```

### Service Implementation Pattern

```typescript
@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  private baseUrl = 'api/example';
  private dataSignal = signal<Data[]>([]);
  private loadingSignal = signal<boolean>(false);

  // Public computed signals
  data = this.dataSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();

  constructor(private http: HttpClient) {}

  // Public methods
  async loadData(): Promise<void> {
    this.loadingSignal.set(true);
    try {
      const data = await firstValueFrom(this.http.get<Data[]>(this.baseUrl));
      this.dataSignal.set(data);
    } finally {
      this.loadingSignal.set(false);
    }
  }
}
```

---

## State Management

### Signal-Based State Management

The application uses Angular Signals for reactive state management:

```typescript
// Global state service example
@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // Private signals
  private userSignal = signal<User | null>(null);
  private themeSignal = signal<Theme>('light');
  private loadingSignal = signal<boolean>(false);

  // Public readonly signals
  user = this.userSignal.asReadonly();
  theme = this.themeSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();

  // Computed signals
  isAuthenticated = computed(() => !!this.user());
  isDarkMode = computed(() => this.theme() === 'dark');

  // State mutations
  setUser(user: User | null): void {
    this.userSignal.set(user);
  }

  toggleTheme(): void {
    this.themeSignal.update(current =>
      current === 'light' ? 'dark' : 'light'
    );
  }
}
```

### Local Component State

Components manage local state using signals:

```typescript
export class ExampleComponent {
  // Local state signals
  private formDataSignal = signal<FormData>({});
  private validationErrorsSignal = signal<string[]>([]);

  // Public computed signals
  isFormValid = computed(() =>
    this.validationErrorsSignal().length === 0
  );

  // Form handling
  updateFormData(data: Partial<FormData>): void {
    this.formDataSignal.update(current => ({ ...current, ...data }));
  }
}
```

---

## Security Implementation

### Authentication Flow

```
1. User submits credentials
2. AuthService validates with backend
3. JWT token received and stored
4. AuthGuard protects routes
5. HTTP Interceptor adds token to requests
6. Token refresh handled automatically
7. Logout clears stored tokens
```

### JWT Token Management

```typescript
export class AuthService {
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/auth/login', credentials)
      .pipe(
        tap(response => {
          this.storageService.setItem(this.tokenKey, response.token);
          this.storageService.setItem(this.refreshTokenKey, response.refreshToken);
          this.userSignal.set(response.user);
        })
      );
  }

  logout(): void {
    this.storageService.removeItem(this.tokenKey);
    this.storageService.removeItem(this.refreshTokenKey);
    this.userSignal.set(null);
    this.router.navigate(['/auth/login']);
  }
}
```

### Route Protection

```typescript
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
```

---

## Design Patterns

### Patterns Used

1. **Singleton Pattern**: Services with `providedIn: 'root'`
2. **Observer Pattern**: RxJS Observables and Angular Signals
3. **Facade Pattern**: Service layer abstracts complex operations
4. **Strategy Pattern**: Different authentication strategies
5. **Factory Pattern**: Dynamic component creation
6. **Decorator Pattern**: Angular decorators (`@Component`, `@Injectable`)
7. **Command Pattern**: Action-based state updates

### Code Organization Patterns

1. **Feature-Based Organization**: Modules organized by business features
2. **Barrel Exports**: Clean import statements using index files
3. **Smart/Dumb Components**: Container vs. Presentation components
4. **Single Responsibility**: Each service/component has one responsibility
5. **Dependency Injection**: Loose coupling through DI

---

## Conclusion

This architecture provides a solid foundation for a scalable, maintainable Angular application. The modular design allows for easy expansion, the role-based permission system ensures security, and the use of modern Angular features provides excellent performance and developer experience.

For any questions or clarifications about the architecture, please refer to the code comments or reach out to the development team.