import type { APIContext } from 'astro';

import { generateManyTestCollaboratorMocks } from '__test__/__mock__/collaborator.mock';
import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { generateManyTestProjectMocks } from '__test__/__mock__/project.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import {
  GET,
  getStaticPaths,
} from '@/pages/api/project/not-related/collaborator/[idCollaborator].json';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('GET project by not related collaborator endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked database response representing a stored project entry.
   * This simulates the expected result when querying the database.
   */
  const MockProjectRecord = generateManyTestProjectMocks(3);

  /**
   * Simulated parsed response body.
   * Represents the expected API response after processing the request.
   * @example
   * const response = await apiCall();
   * const parsedResponse = await response.json(); // Equivalent to ParsedProjectResponse
   */
  const ParsedProjectResponse: typeof MockProjectRecord = JSON.parse(
    JSON.stringify(MockProjectRecord),
  );

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      params: { idCollaborator: '1' },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.project.findMany).toHaveBeenCalled();
  });

  it('should return a list of projects when the collaborator ID is valid', async () => {
    vi.spyOn(databaseClient.project, 'findMany').mockResolvedValue(MockProjectRecord);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedProjectResponse);
    expect(response.status).toBe(200);
  });

  it('should return an empty list when no projects are found for the collaborator ID', async () => {
    vi.spyOn(databaseClient.project, 'findMany').mockResolvedValue([]);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual([]);
    expect(response.status).toBe(200);
  });

  it('should return a 500 error when an exception occurs during the database query', async () => {
    vi.spyOn(databaseClient.project, 'findMany').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await GET(AstroApiContext);
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
        params: { idCollaborator: collaborator.id },
      })),
    );
  });
});
