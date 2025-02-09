import axios from "axios";

import {isDefined, isNotDefined} from "../guards/is-defined";
import {isErrorResponse} from "../guards/is-error-response";
import {devConsoleLog} from "../common/dev-console-log";

import {ENV} from "@/constants/env";

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

  if (ENV.isServerSideEnable === false) {
    throw new Error("No se puede realizar cambios por ser un sitio estático");
  }

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

  if (isDefined(responseData.fieldErrors?.length) && responseData.fieldErrors.length > 0) {
    return new Error(responseData.fieldErrors.map((error) => error.detail).join("\n"));
  }

  if (isDefined(responseData.title)) {
    return new Error(responseData.title);
  }

  return new Error(defaultErrorMessage);
}
