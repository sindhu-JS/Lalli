import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: 'success' | 'error';
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiRequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  timeout?: number;
  retries?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl || 'http://localhost:3000/api';
  private readonly defaultTimeout = 30000; // 30 seconds
  private readonly defaultRetries = 2;

  constructor(private http: HttpClient) {}

  // GET request
  get<T>(endpoint: string, options?: ApiRequestOptions): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const httpOptions = this.buildHttpOptions(options);

    return (this.http.get<ApiResponse<T>>(url, httpOptions) as unknown as Observable<ApiResponse<T>>)
      .pipe(
        timeout(options?.timeout || this.defaultTimeout),
        retry(options?.retries || this.defaultRetries),
        catchError(this.handleError)
      );
  }

  // POST request
  post<T>(endpoint: string, data: any, options?: ApiRequestOptions): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const httpOptions = this.buildHttpOptions(options);

    return (this.http.post<ApiResponse<T>>(url, data, httpOptions) as unknown as Observable<ApiResponse<T>>)
      .pipe(
        timeout(options?.timeout || this.defaultTimeout),
        catchError(this.handleError)
      );
  }

  // PUT request
  put<T>(endpoint: string, data: any, options?: ApiRequestOptions): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const httpOptions = this.buildHttpOptions(options);

    return (this.http.put<ApiResponse<T>>(url, data, httpOptions) as unknown as Observable<ApiResponse<T>>)
      .pipe(
        timeout(options?.timeout || this.defaultTimeout),
        catchError(this.handleError)
      );
  }

  // PATCH request
  patch<T>(endpoint: string, data: any, options?: ApiRequestOptions): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const httpOptions = this.buildHttpOptions(options);

    return (this.http.patch<ApiResponse<T>>(url, data, httpOptions) as unknown as Observable<ApiResponse<T>>)
      .pipe(
        timeout(options?.timeout || this.defaultTimeout),
        catchError(this.handleError)
      );
  }

  // DELETE request
  delete<T>(endpoint: string, options?: ApiRequestOptions): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const httpOptions = this.buildHttpOptions(options);

    return (this.http.delete<ApiResponse<T>>(url, httpOptions) as unknown as Observable<ApiResponse<T>>)
      .pipe(
        timeout(options?.timeout || this.defaultTimeout),
        catchError(this.handleError)
      );
  }

  // Upload file
  uploadFile<T>(endpoint: string, file: File, additionalData?: any): Observable<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const formData = new FormData();

    formData.append('file', file);

    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    return (this.http.post<ApiResponse<T>>(url, formData) as unknown as Observable<ApiResponse<T>>)
      .pipe(
        timeout(60000), // 60 seconds for file uploads
        catchError(this.handleError)
      );
  }

  // Download file
  downloadFile(endpoint: string, filename?: string): Observable<Blob> {
    const url = this.buildUrl(endpoint);

    return this.http.get(url, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/octet-stream'
      })
    }).pipe(
      timeout(60000), // 60 seconds for file downloads
      catchError(this.handleError)
    );
  }

  // Get with query parameters helper
  getWithParams<T>(endpoint: string, params: { [key: string]: any }): Observable<ApiResponse<T>> {
    const cleanParams = this.cleanParams(params);
    return this.get<T>(endpoint, { params: cleanParams });
  }

  // Paginated GET request
  getPaginated<T>(
    endpoint: string,
    page = 1,
    limit = 10,
    additionalParams?: { [key: string]: any }
  ): Observable<ApiResponse<T[]>> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      ...additionalParams
    };

    return this.getWithParams<T[]>(endpoint, params);
  }

  // Search with query
  search<T>(endpoint: string, query: string, additionalParams?: { [key: string]: any }): Observable<ApiResponse<T[]>> {
    const params = {
      q: query,
      ...additionalParams
    };

    return this.getWithParams<T[]>(endpoint, params);
  }

  // Build full URL
  private buildUrl(endpoint: string): string {
    // Remove leading slash if present
    endpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${this.baseUrl}/${endpoint}`;
  }

  // Build HTTP options
  private buildHttpOptions(options?: ApiRequestOptions): any {
    const httpOptions: any = {};

    if (options?.headers) {
      httpOptions.headers = options.headers instanceof HttpHeaders
        ? options.headers
        : new HttpHeaders(options.headers);
    }

    if (options?.params) {
      httpOptions.params = options.params instanceof HttpParams
        ? options.params
        : new HttpParams({ fromObject: options.params });
    }

    return httpOptions;
  }

  // Clean undefined/null parameters
  private cleanParams(params: { [key: string]: any }): { [key: string]: string } {
    const cleanParams: { [key: string]: string } = {};

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== null && value !== undefined && value !== '') {
        cleanParams[key] = String(value);
      }
    });

    return cleanParams;
  }

  // Error handling
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Bad Request';
          break;
        case 401:
          errorMessage = 'Unauthorized - Please log in';
          break;
        case 403:
          errorMessage = 'Forbidden - You do not have permission';
          break;
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 422:
          errorMessage = error.error?.message || 'Validation error';
          break;
        case 429:
          errorMessage = 'Too many requests - Please try again later';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        case 503:
          errorMessage = 'Service temporarily unavailable';
          break;
        default:
          errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      }
    }

    console.error('API Error:', {
      url: error.url,
      status: error.status,
      statusText: error.statusText,
      message: errorMessage,
      error: error.error
    });

    return throwError(() => ({
      message: errorMessage,
      status: error.status,
      statusText: error.statusText,
      error: error.error
    }));
  };
}