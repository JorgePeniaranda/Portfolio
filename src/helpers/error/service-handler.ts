import axios from "axios";

import {isDefined, isNotDefined} from "../guards/is-defined";
import {isErrorResponse} from "../guards/is-error-response";
import {devConsoleLog} from "../common/dev-console-log";

/**
 * Handle an error from a service.
 *
 * @param error - The error to handle.
 * @param defaultErrorMessage - The default error message to use if the error does not contain one.
 * @returns An error with the message to display.
 */
export function handleServiceError({
  error,
  defaultErrorMessage = "Ha ocurrido un error.",
}: {
  error: unknown;
  defaultErrorMessage?: string;
}): Error {
  devConsoleLog.log("Error in service: ", error);

  if (!axios.isAxiosError(error)) {
    return new Error(defaultErrorMessage);
  }

  if (isNotDefined(error.response?.data)) {
    return new Error(defaultErrorMessage);
  }

  const {data: responseData} = error.response;

  if (!isErrorResponse(responseData)) {
    return new Error(defaultErrorMessage);
  }

  if (isDefined(responseData.errors?.length) && responseData.errors.length > 0) {
    return new Error(responseData.errors.join("\n"));
  }

  if (isDefined(responseData.error)) {
    return new Error(responseData.error);
  }

  return new Error(defaultErrorMessage);
}
