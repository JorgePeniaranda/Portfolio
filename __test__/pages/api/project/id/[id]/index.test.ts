import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { generateTestProjectMock } from '__test__/__mock__/project.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { PUT } from '@/pages/api/project/id/[id]';
import { ProjectUpdateSchema } from '@/schemas/project/update';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('PUT project endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked request body representing a project update payload.
   * Used as input data when testing the API request handling.
   */
  const MockProjectRequest: ProjectUpdateSchema = {
    key: 'test-project',
    name: 'Test Project',
    status: 'IN_PROGRESS',
    stackCategory: 'FULL_STACK',
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-12-31'),
    description: 'This is a test project',
    goals: 'This is a test goal',
    contributions: 'This is a test contribution',
    logoUrl: 'https://example.com/logo.png',
    primaryColor: '#c05454',
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://example.com/github',
  };

  /**
   * Parsed version of the request body.
   * Simulates the actual result of calling `request.json()` in an API handler.
   *
   * @example
   * const parsed = request.json(); // Equivalent to ParsedProjectRequest
   */
  const ParsedProjectRequest: typeof MockProjectRequest = JSON.parse(
    JSON.stringify(MockProjectRequest),
  );

  /**
   * Mocked database response representing a stored project entry.
   * This simulates the expected result when querying the database.
   */
  const MockProjectRecord = generateTestProjectMock();

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
      params: {
        id: '1',
      },
      request: {
        method: 'PUT',
        body: JSON.stringify(ParsedProjectRequest),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {});

  it('should return the updated project data when the request is valid', async () => {
    vi.spyOn(databaseClient.project, 'update').mockResolvedValue(MockProjectRecord);
    vi.spyOn(ProjectUpdateSchema, 'parse').mockResolvedValue(ParsedProjectRequest);

    const response = await PUT(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedProjectResponse);
    expect(response.status).toBe(200);
  });

  it('should return a 500 error when an exception occurs during the update', async () => {
    vi.spyOn(databaseClient.project, 'update').mockRejectedValue(new Error('This is a test error'));
    vi.spyOn(ProjectUpdateSchema, 'parse').mockResolvedValue(ParsedProjectRequest);

    const response = await PUT(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});
