import type { APIContext } from 'astro';

import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest';
import { createContext } from 'astro/middleware';

import { databaseClient } from '@/helpers/client/prisma';
import { GET } from '@/pages/api/stack.json';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    stack: {
      findMany: vi.fn(),
    },
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

describe('GET all stacks endpoint', () => {
  const url = 'https://example.com/api/stack.json';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a paginated list of stack when parameters are valid', async () => {
    // Mock the database response
    const mockStacks = [
      { id: 1, name: 'stack 1' },
      { id: 2, name: 'stack 2' },
    ];

    (databaseClient.stack.findMany as unknown as Mock).mockResolvedValue(mockStacks);

    // Simulate a request
    const request: APIContext = createContext({
      request: new Request(url),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toEqual(mockStacks);

    expect(databaseClient.stack.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
    });
  });

  it('should return an empty list if no stack are found', async () => {
    (databaseClient.stack.findMany as unknown as Mock).mockResolvedValue([]);

    // Simulate a request
    const request: APIContext = createContext({
      request: new Request(url),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toEqual([]);
  });

  it('should return a 500 error if an exception occurs', async () => {
    // Simulate a request
    const request: APIContext = createContext({
      request: new Request(url),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'Invalid URL' });
  });
});
