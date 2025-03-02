import type { ErrorResponse } from '@/types/responses';

import { z } from 'zod';

import { isPrismaError } from '../guards/is-prisma-error';

import { prismaHandler } from './prisma-handler';

/**
 * A helper function that formats API errors into a readable error response.
 * @param error - The error object to handle
 * @param [url] - The URL object to include in the error response
 * @returns A response object containing the error message and status code
 */
export function handleApiError(error: unknown, url?: URL): Response {
  // If the error is a Prisma error
  if (isPrismaError(error)) {
    const { statusCode, message } = prismaHandler(error);

    return Response.json(
      {
        detail: message,
        instance: url?.pathname,
        status: statusCode,
        title: 'An operation failed while processing the request.',
        type: 'OperationFailedError',
        i18nKey: 'error.api.operationFailed',
      } satisfies ErrorResponse,
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/problem+json',
        },
      },
    );
  }

  // If the error is a Zod validation error
  if (error instanceof z.ZodError) {
    return Response.json(
      {
        detail: error.errors.map((zodError) => `${zodError.path}: ${zodError.message}`).join(', '),
        fieldErrors: error.errors.map((zodError) => ({
          field: zodError.path.join('.'),
          message: zodError.message,
        })),
        instance: url?.pathname,
        status: 400,
        title: 'A validation error occurred.',
        type: 'ValidationError',
        i18nKey: 'error.api.validation',
      } satisfies ErrorResponse,
      {
        status: 400,
        headers: {
          'Content-Type': 'application/problem+json',
        },
      },
    );
  }

  // Else, return a generic 500 error response
  return Response.json(
    {
      detail: error instanceof Error ? error.message : 'An internal server error occurred.',
      instance: url?.pathname,
      status: 500,
      title: 'Internal server error.',
      type: 'InternalServerError',
      i18nKey: 'error.api.generic',
    } satisfies ErrorResponse,
    {
      status: 500,
      headers: {
        'Content-Type': 'application/problem+json',
      },
    },
  );
}
