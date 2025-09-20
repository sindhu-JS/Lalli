// Shared barrel exports
export * from './components';
export * from './directives';
export * from './pipes';

// Export specific models to avoid conflicts
export type { User, UserProfile, UserPreferences, NotificationSettings } from './models/user.model';
export type { ApiError, ApiMeta, PaginatedRequest } from './models/api.model';
export type { LoginRequest, RegisterRequest, AuthResponse, ForgotPasswordRequest, ResetPasswordRequest, ChangePasswordRequest, AuthState } from './models/auth.model';

// Export services with specific exports to avoid conflicts
export { AuthService } from './services/auth.service';
export { ApiService } from './services/api.service';
export { ToastService } from './services/toast.service';
export { ThemeService } from './services/theme.service';

export * from './guards/auth.guard';
export * from './guards/admin.guard';
export * from './interceptors/jwt.interceptor';
export * from './interceptors/error.interceptor';