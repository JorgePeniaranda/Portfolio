import axios from "axios";

import {isDefined} from "../guards/is-defined";

/**
 * Handles errors from service calls and returns a corresponding error message.
 * It checks if the error is an Axios error and if it has a response with a status. If so, it returns the error message from the response.
 * If the error is a generic JavaScript `Error` instance, it returns the error's message.
 * Otherwise, it returns a default error message indicating an unexpected error occurred.
 *
 * @param {unknown} error - The error object to handle, which can be an Axios error, a generic Error, or any other type.
 * @returns {string} A string message describing the error, either from the Axios response, the error object, or a default message.
 */
export function serviceErrorHandler(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (isDefined(error.response?.status)) {
      return error.response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ha ocurrido un error inesperado";
}
