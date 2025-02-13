import { describe, it, expect } from 'vitest';
import { Prisma } from '@prisma/client';

import { isPrismaError } from '@/helpers/guards/is-prisma-error';

describe('isPrismaError', () => {
  it('should return true for known Prisma error types', () => {
    const knownError1 = new Prisma.PrismaClientKnownRequestError('message', {
      clientVersion: '3.0.0',
      code: 'P2001',
      meta: {
        target: ['model'],
      },
    });
    const knownError2 = new Prisma.PrismaClientUnknownRequestError('message', {
      clientVersion: '3.0.0',
    });
    const knownError3 = new Prisma.PrismaClientRustPanicError('message', '3.0.0');
    const knownError4 = new Prisma.PrismaClientInitializationError('message', '3.0.0');
    const knownError5 = new Prisma.PrismaClientValidationError('message', {
      clientVersion: '3.0.0',
    });

    expect(isPrismaError(knownError1)).toBe(true);
    expect(isPrismaError(knownError2)).toBe(true);
    expect(isPrismaError(knownError3)).toBe(true);
    expect(isPrismaError(knownError4)).toBe(true);
    expect(isPrismaError(knownError5)).toBe(true);
  });

  it('should return false for non-Prisma errors', () => {
    const genericError = new Error('Generic error');
    const nonPrismaError = { message: 'Non-Prisma error' };

    expect(isPrismaError(genericError)).toBe(false);
    expect(isPrismaError(nonPrismaError)).toBe(false);
    expect(isPrismaError(null)).toBe(false);
    expect(isPrismaError(undefined)).toBe(false);
  });
});
