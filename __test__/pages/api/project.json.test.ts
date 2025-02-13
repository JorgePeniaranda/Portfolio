import type { APIContext } from 'astro';

import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest';
import { createContext } from 'astro/middleware';

import { databaseClient } from '@/helpers/client/prisma';
import { GET } from '@/pages/api/project.json';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    project: {
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

describe('GET all project endpoint', () => {
  const url = 'https://example.com/api/project.json';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a paginated list of project when parameters are valid', async () => {
    // Mock the database response
    const mockProjects = [
      { id: 1, name: 'project 1' },
      { id: 2, name: 'project 2' },
    ];

    (databaseClient.project.findMany as unknown as Mock).mockResolvedValue(mockProjects);

    // Simulate a request
    const request: APIContext = createContext({
      request: new Request(url),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toEqual(mockProjects);

    expect(databaseClient.project.findMany).toHaveBeenCalled();
  });

  it('should return an empty list if no project are found', async () => {
    (databaseClient.project.findMany as unknown as Mock).mockResolvedValue([]);

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
