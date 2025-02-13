import type { APIContext } from 'astro';

import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest';
import { createContext } from 'astro/middleware';

import { databaseClient } from '@/helpers/client/prisma';
import { GET } from '@/pages/api/collaborator.json';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    collaborator: {
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

describe('GET all collaborator endpoint', () => {
  const url = 'https://example.com/api/collaborator.json';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a paginated list of collaborator when parameters are valid', async () => {
    // Mock the database response
    const mockCollaborators = [
      { id: 1, name: 'collaborator 1' },
      { id: 2, name: 'collaborator 2' },
    ];

    (databaseClient.collaborator.findMany as unknown as Mock).mockResolvedValue(mockCollaborators);

    // Simulate a request
    const request: APIContext = createContext({
      request: new Request(url),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toEqual(mockCollaborators);

    expect(databaseClient.collaborator.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
    });
  });

  it('should return an empty list if no collaborator are found', async () => {
    (databaseClient.collaborator.findMany as unknown as Mock).mockResolvedValue([]);

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
