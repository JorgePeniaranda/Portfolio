import {isDefined} from "../guards/is-defined";
import {isErrorResponse} from "../guards/is-error-response";

export function handleServiceError({
  error,
  defaultErrorMessage = "Ha ocurrido un error.",
}: {
  error: unknown;
  defaultErrorMessage?: string;
}): Error {
  if (!isErrorResponse(error)) {
    return new Error(defaultErrorMessage);
  }

  if (isDefined(error?.errors?.length) && error?.errors?.length > 0) {
    return new Error(error.errors.join(", "));
  }

  return new Error(error.error);
}
