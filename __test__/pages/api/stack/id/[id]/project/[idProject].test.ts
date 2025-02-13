import type { APIContext } from 'astro';

import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest';
import { createContext } from 'astro/middleware';

import { databaseClient } from '@/helpers/client/prisma';
import { DELETE, POST } from '@/pages/api/stack/id/[id]/project/[idProject]';
import { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    stack: {
      update: vi.fn(),
    },
  },
}));

vi.mock('@/schemas/common/entity-relation-schema', () => ({
  EntityRelationSchema: {
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

describe('POST relation with stack endpoint', () => {
  const input = { idFrom: 1, idTo: 2 };
  const url = `https://example.com/api/stack/id/${input.idTo}/project/1`;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a stack when parameters are valid', async () => {
    // Mock the database response
    const mockStack = { id: 1, name: 'stack 1' };

    (databaseClient.stack.update as unknown as Mock).mockResolvedValue(mockStack);
    (EntityRelationSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = 'https://example.com/api/id/stack/relations/project/add';
    const request: APIContext = createContext({
      request: new Request(url, {
        method: 'POST',
        body: JSON.stringify(input),
      }),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await POST(request);

    expect(response.status).toBe(204);
    expect(databaseClient.stack.update).toHaveBeenCalled();
    expect(EntityRelationSchema.parse).toHaveBeenCalledWith(input);
  });

  it('should return a 500 error if an exception occurs', async () => {
    (databaseClient.stack.update as unknown as Mock).mockRejectedValue(
      new Error('This is a test error'),
    );
    (EntityRelationSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
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
    expect(EntityRelationSchema.parse).toHaveBeenCalledWith(input);
  });
});

describe('DELETE relation with stack endpoint', () => {
  const input = { idFrom: 1, idTo: 2 };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a stack when parameters are valid', async () => {
    // Mock the database response
    const mockStack = { id: 1, name: 'stack 1' };

    (databaseClient.stack.update as unknown as Mock).mockResolvedValue(mockStack);
    (EntityRelationSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = 'https://example.com/api/id/stack/relations/project/delete';
    const request: APIContext = createContext({
      request: new Request(url, {
        method: 'DELETE',
        body: JSON.stringify(input),
      }),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await DELETE(request);

    expect(response.status).toBe(204);
    expect(databaseClient.stack.update).toHaveBeenCalled();
    expect(EntityRelationSchema.parse).toHaveBeenCalledWith(input);
  });

  it('should return a 500 error if an exception occurs', async () => {
    (databaseClient.stack.update as unknown as Mock).mockRejectedValue(
      new Error('This is a test error'),
    );
    (EntityRelationSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = 'https://example.com/api/id/stack/relations/project/delete';
    const request: APIContext = createContext({
      request: new Request(url, {
        method: 'DELETE',
        body: JSON.stringify(input),
      }),
      defaultLocale: 'en',
      locals: {},
    });

    const response = await DELETE(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(EntityRelationSchema.parse).toHaveBeenCalledWith(input);
  });
});
