import type { APIContext } from 'astro';

import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest';
import { createContext } from 'astro/middleware';

import { databaseClient } from '@/helpers/client/prisma';
import { GET, getStaticPaths } from '@/pages/api/project/get/key/[key].json';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    project: {
      findUnique: vi.fn(),
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

describe('GET /project/key/[key] endpoint', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return project when parameters are valid', async () => {
    // Mock the database response
    const mockProject = { id: 1, key: 'project-1', name: 'project 1' };

    (databaseClient.project.findUnique as unknown as Mock).mockResolvedValue(mockProject);

    // Simulate a request
    const url = 'https://example.com/api/project/key/project-1';
    const request: APIContext = createContext({
      params: { key: 'project-1' },
      request: new Request(url),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toEqual(mockProject);

    expect(databaseClient.project.findUnique).toHaveBeenCalled();
  });

  it('should return null if no project are found', async () => {
    (databaseClient.project.findUnique as unknown as Mock).mockResolvedValue([]);

    // Simulate a request
    const url = 'https://example.com/api/project/key/project-1';
    const request: APIContext = createContext({
      params: { key: 'project-1' },
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
    (databaseClient.project.findUnique as unknown as Mock).mockRejectedValue(
      new Error('This is a test error'),
    );

    // Simulate a request
    const url = 'https://example.com/api/Projects?page=1&size=10';
    const request: APIContext = createContext({
      params: { key: 'project-1' },
      request: new Request(url),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
  });
});

describe('getStaticPaths', () => {
  it('should return a list of paths', async () => {
    const mockProject = [{ key: '1' }, { key: '2' }, { key: '3' }];

    (databaseClient.project.findMany as unknown as Mock).mockResolvedValue(mockProject);
    const paths = await getStaticPaths();

    expect(paths).toEqual(
      mockProject.map((project) => ({
        params: { key: project.key.toString() },
      })),
    );
  });
});
