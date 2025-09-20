export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: 'success' | 'error';
  meta?: ApiMeta;
}

export interface ApiMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  statusText: string;
  error: any;
}

export interface PaginatedRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ModelRequestOptions {
  headers?: { [header: string]: string | string[] };
  params?: { [param: string]: string | string[] };
  timeout?: number;
  retries?: number;
}