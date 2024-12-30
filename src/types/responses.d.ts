export interface BaseResponse {
  success: boolean; // Indicates whether the operation was successful
  message: string; // Descriptive message about the operation result
}

export interface SuccessResponse<T> extends BaseResponse {
  data?: T; // Additional information, if applicable
}

export interface ErrorResponse extends BaseResponse {
  error?: string; // Error message if the operation failed
  errors?: string[]; // Validation errors if the operation failed
}

export type ApiResponse<T = undefined> = SuccessResponse<T> | ErrorResponse;
