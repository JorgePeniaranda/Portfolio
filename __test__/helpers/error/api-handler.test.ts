import type { FieldError } from '@/types/responses';
import type { TranslationKey } from '@/types/translation';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { handleApiError } from '@/helpers/error/api-handler';
import { prismaHandler } from '@/helpers/error/prisma-handler';
import { isPrismaError } from '@/helpers/guards/is-prisma-error';

vi.mock('@/helpers/guards/is-prisma-error', () => ({
  isPrismaError: vi.fn(),
}));

vi.mock('@/helpers/error/prisma-handler', () => ({
  prismaHandler: vi.fn(),
}));

vi.mock('@/helpers/error/zod-handler', () => ({
  handleZodError: vi.fn(),
}));

describe('handleApiError', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should handle a Prisma error', async () => {
    const mockError = { code: 'P2002' };
    const mockPrismaResponse = {
      statusCode: 409,
      message: 'Unique constraint failed' as TranslationKey,
    };

    vi.mocked(isPrismaError).mockReturnValue(true);
    vi.mocked(prismaHandler).mockReturnValue(mockPrismaResponse);

    const response = handleApiError(mockError);
    const body = await response.json();

    expect(isPrismaError).toHaveBeenCalledWith(mockError);
    expect(prismaHandler).toHaveBeenCalledWith(mockError);
    expect(response.status).toBe(409);
    expect(body).toEqual(
      expect.objectContaining({
        detail: mockPrismaResponse.message,
        status: mockPrismaResponse.statusCode,
      }),
    );
  });

  it('should handle a Zod validation error', async () => {
    const mockZodError = new z.ZodError([
      { path: ['field1'], message: 'Invalid field1', code: 'custom' },
    ]);
    const mockZodResponse = {
      errorTextReduce: 'field1: Invalid field1',
      errorList: [{ field: 'field1', message: 'Invalid field1' }] satisfies FieldError[],
    };

    vi.mocked(isPrismaError).mockReturnValue(false);

    const response = handleApiError(mockZodError);
    const body = await response.json();

    expect(isPrismaError).toHaveBeenCalledWith(mockZodError);
    expect(response.status).toBe(400);
    expect(body).toEqual(
      expect.objectContaining({
        detail: mockZodResponse.errorTextReduce,
        fieldErrors: mockZodResponse.errorList,
      }),
    );
  });

  it('should handle a generic error', async () => {
    const mockGenericError = new Error('Something went wrong');

    vi.mocked(isPrismaError).mockReturnValue(false);

    const response = handleApiError(mockGenericError);
    const body = await response.json();

    expect(isPrismaError).toHaveBeenCalledWith(mockGenericError);
    expect(response.status).toBe(500);
    expect(body).toEqual(
      expect.objectContaining({
        detail: 'Something went wrong',
        status: 500,
      }),
    );
  });

  it('should handle an unknown error', async () => {
    const mockUnknownError = { someKey: 'someValue' };

    vi.mocked(isPrismaError).mockReturnValue(false);

    const response = handleApiError(mockUnknownError);
    const body = await response.json();

    expect(isPrismaError).toHaveBeenCalledWith(mockUnknownError);
    expect(response.status).toBe(500);
    expect(body).toEqual(
      expect.objectContaining({
        detail: 'An internal server error occurred.',
        status: 500,
        title: 'Internal server error.',
        type: 'InternalServerError',
      }),
    );
  });
});
