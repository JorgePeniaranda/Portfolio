import type { ErrorResponse } from '@/types/responses';

import { z } from 'zod';

import { isPrismaError } from '../guards/is-prisma-error';

import { prismaHandler } from './prisma-handler';

/**
 * A helper function that formats API errors into a readable error response.
 *
 * @param {unknown} error - The error object to handle.
 * @param {URL} [url] - The URL object to include in the error response.
 * @returns {Response} A response object containing the error message and status code.
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
        detail: error.errors.map((error) => `${error.path}: ${error.message}`).join(', '),
        fieldErrors: error.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        })),
        instance: url?.pathname,
        status: 400,
        title: 'A validation error occurred.',
        type: 'ValidationError',
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
      detail: error instanceof Error ? error.message : 'Unknown error occurred.',
      instance: url?.pathname,
      status: 500,
      title: 'An internal server error occurred.',
      type: 'InternalServerError',
    } satisfies ErrorResponse,
    {
      status: 500,
      headers: {
        'Content-Type': 'application/problem+json',
      },
    },
  );
}
