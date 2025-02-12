import type { APIContext } from 'astro';

import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest';
import { createContext } from 'astro/middleware';
import { TEST_COLLABORATOR_MOCK } from '__test__/__mock__/collaborator.mock';

import { databaseClient } from '@/helpers/client/prisma';
import { POST } from '@/pages/api/collaborator/create';
import { CollaboratorCreateSchema } from '@/schemas/collaborator/create';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    collaborator: {
      create: vi.fn(),
    },
  },
}));

vi.mock('@/schemas/collaborator/create', () => ({
  CollaboratorCreateSchema: {
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

describe('GET /collaborator/create endpoint', () => {
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

    (databaseClient.collaborator.create as unknown as Mock).mockResolvedValue(mockCollaborator);
    (CollaboratorCreateSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = 'https://example.com/api/collaborator/delete';
    const request: APIContext = createContext({
      request: new Request(url, {
        method: 'POST',
        body: JSON.stringify(input),
      }),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await POST(request);

    expect(response.status).toBe(201);
    expect(databaseClient.collaborator.create).toHaveBeenCalled();
    expect(CollaboratorCreateSchema.parse).toHaveBeenCalledWith(input);
  });

  it('should return a 500 error if an exception occurs', async () => {
    (databaseClient.collaborator.create as unknown as Mock).mockRejectedValue(
      new Error('This is a test error'),
    );
    (CollaboratorCreateSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = 'https://example.com/api/collaborator/delete';
    const request: APIContext = createContext({
      request: new Request(url, {
        method: 'POST',
        body: JSON.stringify(input),
      }),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(CollaboratorCreateSchema.parse).toHaveBeenCalledWith(input);
  });
});
