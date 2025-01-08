import axios from "axios";

import {isDefined} from "../guards/is-defined";

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
