import type { APIContext } from 'astro';

import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest';
import { createContext } from 'astro/middleware';
import { TEST_COLLABORATOR_MOCK } from '__test__/__mock__/collaborator.mock';

import { databaseClient } from '@/helpers/client/prisma';
import { PUT } from '@/pages/api/collaborator/update';
import { CollaboratorUpdateSchema } from '@/schemas/collaborator/update';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    collaborator: {
      update: vi.fn(),
    },
  },
}));

vi.mock('@/schemas/collaborator/update', () => ({
  CollaboratorUpdateSchema: {
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

describe('GET /collaborator/update endpoint', () => {
  const input = {
    ...TEST_COLLABORATOR_MOCK,
    updatedAt: TEST_COLLABORATOR_MOCK.updatedAt.toISOString(),
    createdAt: TEST_COLLABORATOR_MOCK.createdAt.toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a collaborator when parameters are valid', async () => {
    // Mock the database response
    const mockCollaborator = TEST_COLLABORATOR_MOCK;

    (databaseClient.collaborator.update as unknown as Mock).mockResolvedValue(mockCollaborator);
    (CollaboratorUpdateSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = 'https://example.com/api/collaborator/update';
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
    expect(databaseClient.collaborator.update).toHaveBeenCalled();
    expect(CollaboratorUpdateSchema.parse).toHaveBeenCalledWith(input);
  });

  it('should return a 500 error if an exception occurs', async () => {
    (databaseClient.collaborator.update as unknown as Mock).mockRejectedValue(
      new Error('This is a test error'),
    );
    (CollaboratorUpdateSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = 'https://example.com/api/collaborator/update';
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
    expect(CollaboratorUpdateSchema.parse).toHaveBeenCalledWith(input);
  });
});
