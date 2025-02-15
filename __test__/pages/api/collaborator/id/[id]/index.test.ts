import type { APIContext } from 'astro';

import {
  generateManyTestCollaboratorMocks,
  generateTestCollaboratorMock,
} from '__test__/__mock__/collaborator.mock';
import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { PUT, getStaticPaths } from '@/pages/api/collaborator/id/[id]';
import { CollaboratorUpdateSchema } from '@/schemas/collaborator/update';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('PUT collaborator endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked request body representing a collaborator update payload.
   * Used as input data when testing the API request handling.
   */
  const MockCollaboratorRequest: CollaboratorUpdateSchema = {
    nickname: 'nickname',
    linkedinUsername: 'linkedinUsername',
    githubUsername: 'githubUsername',
  };

  /**
   * Parsed version of the request body.
   * Simulates the actual result of calling `request.json()` in an API handler.
   * @example
   * const parsed = request.json(); // Equivalent to ParsedCollaboratorRequest
   */
  const ParsedCollaboratorRequest: typeof MockCollaboratorRequest = JSON.parse(
    JSON.stringify(MockCollaboratorRequest),
  );

  /**
   * Mocked database response representing a stored collaborator entry.
   * This simulates the expected result when querying the database.
   */
  const MockCollaboratorRecord = generateTestCollaboratorMock();

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
    AstroApiContext = createMockApiContext({
      params: {
        id: '1',
      },
      request: {
        method: 'PUT',
        body: JSON.stringify(ParsedCollaboratorRequest),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {});

  it('should return the updated collaborator data when the request is valid', async () => {
    vi.spyOn(databaseClient.collaborator, 'update').mockResolvedValue(MockCollaboratorRecord);
    vi.spyOn(CollaboratorUpdateSchema, 'parse').mockResolvedValue(ParsedCollaboratorRequest);

    const response = await PUT(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedCollaboratorResponse);
    expect(response.status).toBe(200);
  });

  it('should return a 500 error when an exception occurs during the update', async () => {
    vi.spyOn(databaseClient.collaborator, 'update').mockRejectedValue(
      new Error('This is a test error'),
    );
    vi.spyOn(CollaboratorUpdateSchema, 'parse').mockResolvedValue(ParsedCollaboratorRequest);

    const response = await PUT(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});

describe('getStaticPaths', () => {
  it('should return a list of paths for all collaborators', async () => {
    const PrismaCollaboratorMock = generateManyTestCollaboratorMocks(3);

    vi.spyOn(databaseClient.collaborator, 'findMany').mockResolvedValue(PrismaCollaboratorMock);
    const paths = await getStaticPaths();

    expect(paths).toEqual(
      PrismaCollaboratorMock.map((collaborator) => ({
        params: { id: collaborator.id },
      })),
    );
  });
});
