import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { TEST_PROJECT_MOCK } from '__test__/__mock__/project.mock';
import { TEST_STACK_MOCK } from '__test__/__mock__/stack.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { GET, getStaticPaths } from '@/pages/api/stack/not-related/project/[idProject].json';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('GET stack by not related project endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked database response representing a stored stack entry.
   * This simulates the expected result when querying the database.
   */
  const MockStackRecord = [TEST_STACK_MOCK, TEST_STACK_MOCK, TEST_STACK_MOCK];

  /**
   * Simulated parsed response body.
   * Represents the expected API response after processing the request.
   *
   * @example
   * const response = await apiCall();
   * const parsedResponse = await response.json(); // Equivalent to ParsedStackResponse
   */
  const ParsedStackResponse: typeof MockStackRecord = JSON.parse(JSON.stringify(MockStackRecord));

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      params: { idProject: '1' },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.stack.findMany).toHaveBeenCalled();
  });

  it('should return a list of stacks when the project ID is valid', async () => {
    vi.spyOn(databaseClient.stack, 'findMany').mockResolvedValue(MockStackRecord);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedStackResponse);
    expect(response.status).toBe(200);
  });

  it('should return an empty list when no stacks are found for the project ID', async () => {
    vi.spyOn(databaseClient.stack, 'findMany').mockResolvedValue([]);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual([]);
    expect(response.status).toBe(200);
  });

  it('should return a 500 error when an exception occurs during the database query', async () => {
    vi.spyOn(databaseClient.stack, 'findMany').mockRejectedValue(new Error('This is a test error'));

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
        params: { idProject: project.id },
      })),
    );
  });
});
