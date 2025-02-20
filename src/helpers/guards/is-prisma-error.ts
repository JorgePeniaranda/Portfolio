import type { PrismaError } from '@/types/common';

import { Prisma } from '@prisma/client';

/**
 * Type guard function that checks if the provided error is a known Prisma error.
 * It checks if the error is an instance of any known Prisma error types, such as `PrismaClientKnownRequestError`, `PrismaClientUnknownRequestError`,
 * `PrismaClientRustPanicError`, `PrismaClientInitializationError`, or `PrismaClientValidationError`.
 * If the error matches any of these types, it returns `true`; otherwise, it returns `false`.
 * @param error - The error object to check
 * @returns `true` if the error is an instance of a known Prisma error type, otherwise `false`
 */
export function isPrismaError(error: unknown): error is PrismaError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return true;
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return true;
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return true;
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return true;
  }

  return false;
}
