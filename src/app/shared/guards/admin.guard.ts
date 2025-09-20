import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAdminAccess(state.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAdminAccess(state.url);
  }

  private checkAdminAccess(redirectUrl: string): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        // Check if user is authenticated
        if (!user) {
          // Store the attempted URL for redirecting after login
          localStorage.setItem('redirectUrl', redirectUrl);

          // Redirect to login page
          this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: redirectUrl }
          });

          return false;
        }

        // Check if user is admin
        if (user.role !== 'admin') {
          // Redirect to unauthorized page or main dashboard
          this.router.navigate(['/unauthorized'], {
            queryParams: { message: 'Admin access required' }
          });

          return false;
        }

        return true;
      })
    );
  }
}