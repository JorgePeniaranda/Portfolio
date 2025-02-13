import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { TEST_STACK_MOCK } from '__test__/__mock__/stack.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { PUT } from '@/pages/api/stack/id/[id]';
import { StackUpdateSchema } from '@/schemas/stack/update';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('PUT stack endpoint', () => {
  const PrismaStackMock = TEST_STACK_MOCK;
  const RequestStackMock: StackUpdateSchema = {
    name: 'Test Stack',
    description: 'This is a test stack',
    key: 'test-stack',
    category: 'BACK_END',
    type: 'DATABASE',
    iconUrl: 'https://example.com/icon.png',
  };
  const ResponseStackExpected = {
    ...PrismaStackMock,
    createdAt: PrismaStackMock.createdAt.toISOString(),
    updatedAt: PrismaStackMock.updatedAt.toISOString(),
  };
  let AstroApiContext: APIContext;

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      params: {
        id: '1',
      },
      request: {
        method: 'PUT',
        body: JSON.stringify(RequestStackMock),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {});

  it('should return a 200 status and update the stack when parameters are valid', async () => {
    vi.spyOn(databaseClient.stack, 'update').mockResolvedValue(PrismaStackMock);
    vi.spyOn(StackUpdateSchema, 'parse').mockResolvedValue(RequestStackMock);

    const response = await PUT(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ResponseStackExpected);
    expect(response.status).toBe(200);
  });

  it('should return a 500 error if an exception occurs', async () => {
    vi.spyOn(databaseClient.stack, 'update').mockRejectedValue(new Error('This is a test error'));
    vi.spyOn(StackUpdateSchema, 'parse').mockResolvedValue(RequestStackMock);

    const response = await PUT(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});
