import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service
    const token = this.authService.getToken();

    // Check if request is to our API
    const isApiUrl = this.isApiRequest(request.url);

    // Add auth header with jwt if user is logged in and request is to API
    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request);
  }

  private isApiRequest(url: string): boolean {
    // Check if the request URL is for our API
    return url.includes('/api/') || url.startsWith('http://localhost') || url.includes('your-api-domain.com');
  }
}