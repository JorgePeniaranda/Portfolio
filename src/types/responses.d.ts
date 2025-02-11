export interface PaginationRequest {
  page: number; // The current page number
  size: number; // The number of items per page
}

export interface ErrorResponse {
  error?: string; // Error message if the operation failed
  errors?: string[]; // Validation errors if the operation failed
}

export interface DeleteResponse {
  count: number; // The number of items deleted
}
