import { Prisma } from '@prisma/client';
import { describe, it, expect, vi } from 'vitest';

import { getStatusCodeByPrismaErrorCode, prismaHandler } from '@/helpers/error/prisma-handler';
import { PRISMA_STATUS_CODE_STATUS_CATEGORY } from '@/constants/common';

// Mocking the PRISMA_ERROR_MESSAGES for test purposes
vi.mock('@/messages/errors/prisma-errors', () => ({
  PRISMA_ERROR_MESSAGES: {
    P2000: 'Invalid value in a query.',
    P2001: 'Record not found.',
    P2002: 'Unique constraint failed.',
  },
}));

describe('prismaHandler', () => {
  it('should return correct status code and message for known error codes', () => {
    const error = new Prisma.PrismaClientKnownRequestError('Invalid value in a query.', {
      code: 'P2000',
      meta: {
        target: ['query'],
      },
      clientVersion: '3.0.0',
    });
    const result = prismaHandler(error);

    expect(result.statusCode).toBe(400);
    expect(result.message).toBe('Invalid value in a query.');
  });

  it('should return the default 500 status code and message for unknown Prisma error codes', () => {
    const error = new Prisma.PrismaClientKnownRequestError('Unknown error', {
      code: 'P9999',
      meta: {
        target: ['query'],
      },
      clientVersion: '3.0.0',
    });
    const result = prismaHandler(error);

    expect(result.statusCode).toBe(500);
    expect(result.message).toBe('Internal server error.');
  });

  it('should return default 500 status code and message if error is not a known Prisma error', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = { message: 'Not a Prisma error' } as any;
    const result = prismaHandler(error);

    expect(result.statusCode).toBe(500);
    expect(result.message).toBe('Internal server error.');
  });

  it('should return the default 500 status code and message for PrismaUnknownRequestError', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = { code: 'P2005', message: 'Unknown request error' } as any;
    const result = prismaHandler(error);

    expect(result.statusCode).toBe(500);
    expect(result.message).toBe('Internal server error.');
  });
});

describe('getStatusCode', () => {
  it('should return correct status code for known error codes', () => {
    expect(getStatusCodeByPrismaErrorCode(PRISMA_STATUS_CODE_STATUS_CATEGORY[400][0])).toBe(400);
    expect(getStatusCodeByPrismaErrorCode(PRISMA_STATUS_CODE_STATUS_CATEGORY[404][0])).toBe(404);
    expect(getStatusCodeByPrismaErrorCode(PRISMA_STATUS_CODE_STATUS_CATEGORY[409][0])).toBe(409);
    expect(getStatusCodeByPrismaErrorCode(PRISMA_STATUS_CODE_STATUS_CATEGORY[422][0])).toBe(422);
  });

  it('should return 500 for unknown error codes', () => {
    // Test for an unknown error code, not present in STATUS_CODE
    expect(getStatusCodeByPrismaErrorCode('P9999')).toBe(500); // Should return default status code
  });

  it('should return 500 for error codes not found in any status group', () => {
    // Test for an error code that is not present in any of the groups
    expect(getStatusCodeByPrismaErrorCode('P2027')).toBe(500); // Should return default status code
  });
});
