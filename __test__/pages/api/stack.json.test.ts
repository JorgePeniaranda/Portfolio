import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { TEST_STACK_MOCK } from '__test__/__mock__/stack.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { GET } from '@/pages/api/stack.json';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('GET all stacks endpoint', () => {
  const PrismaStackMock = [TEST_STACK_MOCK, TEST_STACK_MOCK, TEST_STACK_MOCK];
  const ResponseStackExpected = PrismaStackMock.map((e) => ({
    ...e,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));
  let AstroApiContext: APIContext;

  beforeEach(() => {
    AstroApiContext = createMockApiContext();

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.stack.findMany).toHaveBeenCalled();
  });

  it('should return a paginated list of stack when parameters are valid', async () => {
    vi.spyOn(databaseClient.stack, 'findMany').mockResolvedValue(PrismaStackMock);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ResponseStackExpected);
    expect(response.status).toBe(200);
  });

  it('should return an empty list if no stack are found', async () => {
    vi.spyOn(databaseClient.stack, 'findMany').mockResolvedValue([]);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual([]);
  });

  it('should return a 500 error if an exception occurs', async () => {
    vi.spyOn(databaseClient.stack, 'findMany').mockRejectedValue(new Error('This is a test error'));

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});
