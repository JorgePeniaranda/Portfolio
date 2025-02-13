import type { APIContext } from 'astro';

import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest';
import { createContext } from 'astro/middleware';
import { TEST_STACK_MOCK } from '__test__/__mock__/stack.mock';

import { databaseClient } from '@/helpers/client/prisma';
import { PUT } from '@/pages/api/stack/id/[id]';
import { StackUpdateSchema } from '@/schemas/stack/update';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    stack: {
      update: vi.fn(),
    },
  },
}));

vi.mock('@/schemas/stack/update', () => ({
  StackUpdateSchema: {
    parse: vi.fn(),
  },
}));

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('PUT stack endpoint', () => {
  const input = {
    ...TEST_STACK_MOCK,
    updatedAt: TEST_STACK_MOCK.updatedAt.toISOString(),
    createdAt: TEST_STACK_MOCK.createdAt.toISOString(),
  };
  const url = `https://example.com/api/stack/${input.id}/update`;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a stack when parameters are valid', async () => {
    // Mock the database response
    const mockStack = TEST_STACK_MOCK;

    (databaseClient.stack.update as unknown as Mock).mockResolvedValue(mockStack);
    (StackUpdateSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const request: APIContext = createContext({
      request: new Request(url, {
        method: 'PUT',
        body: JSON.stringify(input),
      }),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await PUT(request);

    expect(response.status).toBe(200);
    expect(databaseClient.stack.update).toHaveBeenCalled();
    expect(StackUpdateSchema.parse).toHaveBeenCalledWith(input);
  });

  it('should return a 500 error if an exception occurs', async () => {
    (databaseClient.stack.update as unknown as Mock).mockRejectedValue(
      new Error('This is a test error'),
    );
    (StackUpdateSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const request: APIContext = createContext({
      request: new Request(url, {
        method: 'PUT',
        body: JSON.stringify(input),
      }),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await PUT(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(StackUpdateSchema.parse).toHaveBeenCalledWith(input);
  });
});
