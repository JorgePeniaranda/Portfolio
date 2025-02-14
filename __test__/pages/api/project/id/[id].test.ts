import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { TEST_PROJECT_MOCK } from '__test__/__mock__/project.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { GET, getStaticPaths } from '@/pages/api/project/id/[id].json';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('GET project by id endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked database response representing a stored project entry.
   * This simulates the expected result when querying the database.
   */
  const MockProjectRecord = TEST_PROJECT_MOCK;

  /**
   * Simulated parsed response body.
   * Represents the expected API response after processing the request.
   *
   * @example
   * const response = await apiCall();
   * const parsedResponse = await response.json(); // Equivalent to ParsedProjectResponse
   */
  const ParsedProjectResponse: typeof MockProjectRecord = JSON.parse(
    JSON.stringify(MockProjectRecord),
  );

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      params: { id: '1' },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.project.findUnique).toHaveBeenCalled();
  });

  it('should return the project data when a valid ID is provided', async () => {
    vi.spyOn(databaseClient.project, 'findUnique').mockResolvedValue(MockProjectRecord);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedProjectResponse);
    expect(response.status).toBe(200);
  });

  it('should return null when no project is found for the given ID', async () => {
    vi.spyOn(databaseClient.project, 'findUnique').mockResolvedValue(null);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toBeNull();
    expect(response.status).toBe(200);
  });

  it('should return a 500 error when an exception occurs during the query', async () => {
    vi.spyOn(databaseClient.project, 'findUnique').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});

describe('getStaticPaths', () => {
  it('should return a list of paths for all projects', async () => {
    const PrismaProjectMock = [TEST_PROJECT_MOCK, TEST_PROJECT_MOCK, TEST_PROJECT_MOCK];

    vi.spyOn(databaseClient.project, 'findMany').mockResolvedValue(PrismaProjectMock);
    const paths = await getStaticPaths();

    expect(paths).toEqual(
      PrismaProjectMock.map((project) => ({
        params: { id: project.id },
      })),
    );
  });
});
