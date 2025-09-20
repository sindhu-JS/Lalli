import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, NEVER } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          return this.handle401Error(request, next, error);
        }

        // Handle 403 Forbidden errors
        if (error.status === 403) {
          this.handle403Error();
          return throwError(() => error);
        }

        // Handle 500+ server errors
        if (error.status >= 500) {
          this.handleServerError(error);
          return throwError(() => error);
        }

        // Handle network errors
        if (error.error instanceof ErrorEvent) {
          this.handleNetworkError(error);
          return throwError(() => error);
        }

        // Log all errors for debugging
        console.error('HTTP Error:', {
          status: error.status,
          statusText: error.statusText,
          url: request.url,
          error: error.error
        });

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): Observable<HttpEvent<any>> {
    // Don't try to refresh token for auth endpoints
    if (this.isAuthEndpoint(request.url)) {
      this.authService.logout();
      return throwError(() => error);
    }

    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.refreshToken().pipe(
        switchMap(() => {
          this.isRefreshing = false;
          // Retry the original request with the new token
          const token = this.authService.getToken();
          const clonedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(clonedRequest);
        }),
        catchError((refreshError) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => refreshError);
        })
      );
    }

    // If we're already refreshing, wait for it to complete
    return NEVER;
  }

  private handle403Error(): void {
    // User is authenticated but doesn't have permission
    this.router.navigate(['/unauthorized']);
  }

  private handleServerError(error: HttpErrorResponse): void {
    // Show global error message for server errors
    console.error('Server Error:', error);

    // You can implement a global notification service here
    // this.notificationService.showError('Server error. Please try again later.');
  }

  private handleNetworkError(error: HttpErrorResponse): void {
    // Handle network connectivity issues
    console.error('Network Error:', error.error.message);

    // You can implement a global notification service here
    // this.notificationService.showError('Network error. Please check your connection.');
  }

  private isAuthEndpoint(url: string): boolean {
    return url.includes('/auth/login') ||
           url.includes('/auth/register') ||
           url.includes('/auth/refresh') ||
           url.includes('/auth/forgot-password') ||
           url.includes('/auth/reset-password');
  }
}