import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { generateTestProjectMock } from '__test__/__mock__/project.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { DELETE, POST } from '@/pages/api/project';
import { ProjectCreateSchema } from '@/schemas/project/create';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    project: {
      create: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

vi.mock('@/schemas/project/create', () => ({
  ProjectCreateSchema: {
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

describe('CREATE project endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked request body representing a project update payload.
   * Used as input data when testing the API request handling.
   */
  const MockProjectRequest: ProjectCreateSchema = {
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
   * @example
   * const response = await apiCall();
   * const parsedResponse = await response.json(); // Equivalent to ParsedProjectResponse
   */
  const ParsedProjectResponse: typeof MockProjectRecord = JSON.parse(
    JSON.stringify(MockProjectRecord),
  );

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      request: {
        method: 'POST',
        body: JSON.stringify(MockProjectRequest),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(ProjectCreateSchema.parse).toHaveBeenCalledWith(ParsedProjectRequest);
    expect(databaseClient.project.create).toHaveBeenCalled();
  });

  it('should return the created project when the request body is valid', async () => {
    vi.spyOn(databaseClient.project, 'create').mockResolvedValue(MockProjectRecord);
    vi.spyOn(ProjectCreateSchema, 'parse').mockResolvedValue(ParsedProjectRequest);

    const response = await POST(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedProjectResponse);
    expect(response.status).toBe(201);
  });

  it('should return a 500 error when an exception occurs during project creation', async () => {
    vi.spyOn(databaseClient.project, 'create').mockRejectedValue(new Error('This is a test error'));
    vi.spyOn(ProjectCreateSchema, 'parse').mockResolvedValue(ParsedProjectRequest);

    const response = await POST(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'This is a test error' });
  });
});

describe('DELETE project endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked request body representing a project update payload.
   * Used as input data when testing the API request handling.
   */
  const MockProjectRequest = [1, 2, 3];

  /**
   * Mocked database response representing a deleted project entry.
   * This simulates the expected result when querying the database.
   */
  const DeletedResponse = {
    count: MockProjectRequest.length,
  };

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      request: {
        method: 'DELETE',
        body: JSON.stringify(MockProjectRequest),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.project.deleteMany).toHaveBeenCalled();
  });

  it('should return the count of deleted projects when the request body is valid', async () => {
    vi.spyOn(databaseClient.project, 'deleteMany').mockResolvedValue(DeletedResponse);

    const response = await DELETE(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual(DeletedResponse);
  });

  it('should return a 500 error when an exception occurs during project deletion', async () => {
    vi.spyOn(databaseClient.project, 'deleteMany').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await DELETE(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'This is a test error' });
  });
});
