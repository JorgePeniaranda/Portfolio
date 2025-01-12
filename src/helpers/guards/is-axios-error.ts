import type {AxiosError} from "axios";

import {isNotDefined} from "./is-defined";

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAxiosError<T = any, D = any>(payload: unknown): payload is AxiosError<T, D> {
  if (typeof payload !== "object") {
    return false;
  }

  if (isNotDefined(payload)) {
    return false;
  }

  if (!("isAxiosError" in payload)) {
    return false;
  }

  return payload.isAxiosError === true;
}
