import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user_data';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Signals for reactive state management
  public currentUser = signal<User | null>(null);
  public isAuthenticated = signal<boolean>(false);

  // Observables for component subscriptions
  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.getToken();
    const userData = this.getUserData();

    if (token && userData) {
      this.setCurrentUser(userData);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', credentials)
      .pipe(
        tap(response => {
          this.setAuthData(response);
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/register', userData)
      .pipe(
        tap(response => {
          this.setAuthData(response);
        }),
        catchError(error => {
          console.error('Registration failed:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    // Call logout endpoint
    this.http.post('/api/auth/logout', {}).subscribe({
      complete: () => {
        this.clearAuthData();
        this.router.navigate(['/auth/login']);
      }
    });
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>('/api/auth/refresh', { refreshToken })
      .pipe(
        tap(response => {
          this.setAuthData(response);
        }),
        catchError(error => {
          this.clearAuthData();
          this.router.navigate(['/auth/login']);
          return throwError(() => error);
        })
      );
  }

  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/api/auth/forgot-password', { email });
  }

  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/api/auth/reset-password', {
      token,
      password: newPassword
    });
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>('/api/auth/profile', userData)
      .pipe(
        tap(user => {
          this.setCurrentUser(user);
        })
      );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/api/auth/change-password', {
      currentPassword,
      newPassword
    });
  }

  private setAuthData(authResponse: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));

    if (authResponse.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, authResponse.refreshToken);
    }

    this.setCurrentUser(authResponse.user);
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);

    // Update signals
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    // Update signals
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private getUserData(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUserData();
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.role === 'admin';
  }

  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.role === role;
  }
}