import { Prisma } from '@prisma/client';

import { PRISMA_ERROR_MESSAGES } from '@/messages/errors/prisma-errors';
import { PRISMA_STATUS_CODE_STATUS_CATEGORY } from '@/constants/common';

/**
 * Returns the corresponding HTTP status code based on the provided Prisma error code.
 * It looks for the error code in the `PRISMA_STATUS_CODE_STATUS_CATEGORY` dictionary and returns the associated status code.
 * If no match is found, it returns a default status code of 500.
 *
 * @param {string} prismaErrorCode - The error code from Prisma to map to an HTTP status code.
 * @returns {number} The HTTP status code corresponding to the Prisma error code, or 500 if not found.
 */
export function getStatusCode(prismaErrorCode: string): number {
  // Iterate over the PRISMA_STATUS_CODE_STATUS_CATEGORY dictionary entries
  for (const [statusCode, errorCodes] of Object.entries(PRISMA_STATUS_CODE_STATUS_CATEGORY)) {
    // Check if the prismaErrorCode exists in the list of error codes for the current status code
    if (errorCodes.includes(prismaErrorCode)) {
      return parseInt(statusCode); // Return the status code as a number
    }
  }

  return 500; // Default status code if the error code is not found
}

/**
 * Handles Prisma errors and returns an object with an appropriate HTTP status code and error message.
 * It checks if the error is a known Prisma error and if the error code has a corresponding message.
 * If so, it returns that message and the related status code. Otherwise, it returns a generic internal server error.
 *
 * @param {Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientUnknownRequestError | Prisma.PrismaClientRustPanicError} error - The error object thrown by Prisma.
 * @returns {{statusCode: number, message: string}} An object containing the HTTP status code and error message.
 */
export function prismaHandler(
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientRustPanicError,
): { statusCode: number; message: string } {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code in PRISMA_ERROR_MESSAGES
  ) {
    return {
      statusCode: getStatusCode(error.code),
      message: PRISMA_ERROR_MESSAGES[error.code],
    };
  }

  return {
    statusCode: 500,
    message: 'Internal server error.',
  };
}
