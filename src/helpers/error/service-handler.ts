import type { TranslationKey } from '@/types/translation';

import axios from 'axios';

import { isDefined } from '../guards/is-defined';
import { isErrorResponse } from '../guards/is-error-response';

import { ServiceError, type ErrorServiceValidationError } from './service-error';

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
  defaultErrorMessage = 'handler.service.generic-error',
}: {
  error: unknown;
  defaultErrorMessage?: TranslationKey;
}): Error {
  if (ENV.isServerSideEnable === false) {
    throw new ServiceError('handler.service.static-error');
  }

  if (!axios.isAxiosError(error) || !isErrorResponse(error.response?.data)) {
    return new ServiceError(defaultErrorMessage);
  }

  const { data: errorResponseData } = error.response;

  if (
    isDefined(errorResponseData.fieldErrors?.length) &&
    errorResponseData.fieldErrors.length > 0
  ) {
    const fieldsErrors: ErrorServiceValidationError[] = errorResponseData.fieldErrors.map(
      (error) => {
        return {
          field: error.field,
          message: error.message as TranslationKey,
        };
      },
    );

    return new ServiceError(defaultErrorMessage, fieldsErrors);
  }

  if (isDefined(errorResponseData.i18nKey)) {
    return new ServiceError(errorResponseData.i18nKey);
  }

  return new ServiceError(defaultErrorMessage);
}
