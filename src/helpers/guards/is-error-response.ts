import type {ErrorResponse} from "@/types/responses";

import {isNotDefined} from "./is-defined";

/**
 * Type guard for the ErrorResponse type.
 *
 * @param error - The error to check
 * @returns True if the error is an ErrorResponse, false otherwise
 */
export function isErrorResponse(error: unknown): error is ErrorResponse {
  let predicate = false;

  if (typeof error !== "object" || isNotDefined(error)) {
    return false;
  }

  if ("error" in error && typeof error.error !== "string") {
    predicate &&= true;
  } else {
    predicate &&= false;
  }

  if (
    "errors" in error &&
    Array.isArray(error.errors) &&
    error.errors.some((error) => typeof error !== "string")
  ) {
    predicate &&= true;
  } else {
    predicate &&= false;
  }

  return predicate;
}
