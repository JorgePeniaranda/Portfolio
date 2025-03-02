import type { PrismaError } from '@/types/common';
import type { TranslationKey } from '@/types/translation';

import { Prisma } from '@prisma/client';

import { PRISMA_ERROR_MESSAGES } from '@/messages/errors/prisma';
import { PRISMA_STATUS_CODE_STATUS_CATEGORY } from '@/constants/common';

/**
 * Returns the corresponding HTTP status code based on the provided Prisma error code.
 * It looks for the error code in the `PRISMA_STATUS_CODE_STATUS_CATEGORY` dictionary and returns the associated status code.
 * If no match is found, it returns a default status code of 500.
 * @param prismaErrorCode - The error code from Prisma to map to an HTTP status code
 * @returns The HTTP status code corresponding to the Prisma error code, or 500 if not found
 */
export function getStatusCodeByPrismaErrorCode(prismaErrorCode: string): number {
  for (const [statusCode, errorCodes] of Object.entries(PRISMA_STATUS_CODE_STATUS_CATEGORY)) {
    if (errorCodes.includes(prismaErrorCode)) {
      return parseInt(statusCode);
    }
  }

  return 500;
}

/**
 * Handles Prisma errors and returns an object with an appropriate HTTP status code and error message.
 * It checks if the error is a known Prisma error and if the error code has a corresponding message.
 * If so, it returns that message and the related status code. Otherwise, it returns a generic internal server error.
 * @param error - The error object thrown by Prisma.
 * @returns An object containing the HTTP status code and error message.
 */
export function prismaHandler(error: PrismaError): { statusCode: number; message: TranslationKey } {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code in PRISMA_ERROR_MESSAGES
  ) {
    return {
      statusCode: getStatusCodeByPrismaErrorCode(error.code),
      message: PRISMA_ERROR_MESSAGES[error.code],
    };
  }

  return {
    statusCode: 500,
    message: 'handler.prisma.generic-error',
  };
}
