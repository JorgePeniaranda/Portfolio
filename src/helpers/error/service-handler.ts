import axios from 'axios';

import { isDefined, isNotDefined } from '../guards/is-defined';
import { isErrorResponse } from '../guards/is-error-response';

import { ENV } from '@/constants/env';

/**
 * Handle an error from a service.
 * @param params - Function parameters
 * @param params.error - The error to handle
 * @param params.defaultErrorMessage - The default error message to use if the error does not contain one
 * @returns An error with the message to display
 * @throws An error if the error is not an Axios error
 */
export function handleServiceError({
  error,
  defaultErrorMessage = 'Ha ocurrido un error.',
}: {
  error: unknown;
  defaultErrorMessage?: string;
}): Error {
  if (ENV.isServerSideEnable === false) {
    throw new Error('No se puede realizar cambios por ser un sitio estático');
  }

  if (!axios.isAxiosError(error)) {
    return new Error(defaultErrorMessage);
  }

  if (isNotDefined(error.response?.data)) {
    return new Error(defaultErrorMessage);
  }

  const { data: responseData } = error.response;

  if (!isErrorResponse(responseData)) {
    return new Error(defaultErrorMessage);
  }

  if (isDefined(responseData.fieldErrors?.length) && responseData.fieldErrors.length > 0) {
    return new Error(
      responseData.fieldErrors.map((error) => `${error.field}: ${error.message}`).join('\n'),
    );
  }

  if (isDefined(responseData.title)) {
    return new Error(responseData.title);
  }

  return new Error(defaultErrorMessage);
}
