export interface PaginationRequest {
  page: number; // The current page number
  size: number; // The number of items per page
}

export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  fieldErrors?: Omit<ErrorResponse, "errors">[];
}

export interface DeleteResponse {
  count: number; // The number of items deleted
}
