import type { ErrorResponse } from '@/types/responses';

import { isNotDefined } from './is-defined';

/**
 * Type guard for the ErrorResponse type.
 *
 * @param error - The error to check
 * @returns True if the error is an ErrorResponse, false otherwise
 */
export function isErrorResponse(error: unknown): error is ErrorResponse {
  let predicate = false;

  if (typeof error !== 'object' || isNotDefined(error)) {
    return false;
  }

  if ('type' in error && typeof error.type === 'string') {
    predicate ||= true;
  } else {
    predicate ||= false;
  }

  if ('title' in error && typeof error.title === 'string') {
    predicate ||= true;
  } else {
    predicate ||= false;
  }

  if ('status' in error && typeof error.status === 'string') {
    predicate ||= true;
  } else {
    predicate ||= false;
  }

  return predicate;
}
