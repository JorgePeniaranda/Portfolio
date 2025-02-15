import type { APIContext } from 'astro';

import { generateManyTestCollaboratorMocks } from '__test__/__mock__/collaborator.mock';
import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { GET } from '@/pages/api/collaborator.json';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('GET all collaborators endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked database response representing a stored collaborator entry.
   * This simulates the expected result when querying the database.
   */
  const MockCollaboratorRecord = generateManyTestCollaboratorMocks(3);

  /**
   * Simulated parsed response body.
   * Represents the expected API response after processing the request.
   * @example
   * const response = await apiCall();
   * const parsedResponse = await response.json(); // Equivalent to ParsedCollaboratorResponse
   */
  const ParsedCollaboratorResponse: typeof MockCollaboratorRecord = JSON.parse(
    JSON.stringify(MockCollaboratorRecord),
  );

  beforeEach(() => {
    AstroApiContext = createMockApiContext();

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.collaborator.findMany).toHaveBeenCalled();
  });

  it('should return a list of collaborators when parameters are valid', async () => {
    vi.spyOn(databaseClient.collaborator, 'findMany').mockResolvedValue(MockCollaboratorRecord);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedCollaboratorResponse);
    expect(response.status).toBe(200);
  });

  it('should return an empty list when no collaborators are found', async () => {
    vi.spyOn(databaseClient.collaborator, 'findMany').mockResolvedValue([]);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual([]);
  });

  it('should return a 500 error when an exception occurs during the database query', async () => {
    vi.spyOn(databaseClient.collaborator, 'findMany').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});
