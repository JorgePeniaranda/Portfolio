import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { TEST_STACK_MOCK } from '__test__/__mock__/stack.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { GET, getStaticPaths } from '@/pages/api/stack/id/[id].json';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('GET stack by id endpoint', () => {
  const PrismaStackMock = TEST_STACK_MOCK;
  const ResponseStackExpected = {
    ...PrismaStackMock,
    createdAt: PrismaStackMock.createdAt.toISOString(),
    updatedAt: PrismaStackMock.updatedAt.toISOString(),
  };
  let AstroApiContext: APIContext;

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      params: { id: '1' },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.stack.findUnique).toHaveBeenCalled();
  });

  it('should return a stack when parameters are valid', async () => {
    vi.spyOn(databaseClient.stack, 'findUnique').mockResolvedValue(PrismaStackMock);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ResponseStackExpected);
    expect(response.status).toBe(200);
  });

  it('should return null if no stack is found', async () => {
    vi.spyOn(databaseClient.stack, 'findUnique').mockResolvedValue(null);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toBeNull();
    expect(response.status).toBe(200);
  });

  it('should return a 500 error if an exception occurs', async () => {
    vi.spyOn(databaseClient.stack, 'findUnique').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});

describe('getStaticPaths', () => {
  it('should return a list of paths', async () => {
    const PrismaStackMock = [TEST_STACK_MOCK, TEST_STACK_MOCK, TEST_STACK_MOCK];

    vi.spyOn(databaseClient.stack, 'findMany').mockResolvedValue(PrismaStackMock);
    const paths = await getStaticPaths();

    expect(paths).toEqual(
      PrismaStackMock.map((stack) => ({
        params: { id: stack.id },
      })),
    );
  });
});
