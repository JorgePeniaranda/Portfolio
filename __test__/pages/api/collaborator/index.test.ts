import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { TEST_COLLABORATOR_MOCK } from '__test__/__mock__/collaborator.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { DELETE, POST } from '@/pages/api/collaborator';
import { CollaboratorCreateSchema } from '@/schemas/collaborator/create';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    collaborator: {
      create: vi.fn(),
      deleteMany: vi.fn(),
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

describe('CREATE collaborator endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked request body representing a collaborator update payload.
   * Used as input data when testing the API request handling.
   */
  const MockCollaboratorRequest: CollaboratorCreateSchema = {
    nickname: 'nickname',
    linkedinUsername: 'linkedinUsername',
    githubUsername: 'githubUsername',
  };

  /**
   * Parsed version of the request body.
   * Simulates the actual result of calling `request.json()` in an API handler.
   *
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
  const MockCollaboratorRecord = TEST_COLLABORATOR_MOCK;

  /**
   * Simulated parsed response body.
   * Represents the expected API response after processing the request.
   *
   * @example
   * const response = await apiCall();
   * const parsedResponse = await response.json(); // Equivalent to ParsedCollaboratorResponse
   */
  const ParsedCollaboratorResponse: typeof MockCollaboratorRecord = JSON.parse(
    JSON.stringify(MockCollaboratorRecord),
  );

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      request: {
        method: 'POST',
        body: JSON.stringify(MockCollaboratorRequest),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(CollaboratorCreateSchema.parse).toHaveBeenCalledWith(ParsedCollaboratorRequest);
    expect(databaseClient.collaborator.create).toHaveBeenCalled();
  });

  it('should return the created collaborator when the request body is valid', async () => {
    vi.spyOn(databaseClient.collaborator, 'create').mockResolvedValue(MockCollaboratorRecord);
    vi.spyOn(CollaboratorCreateSchema, 'parse').mockResolvedValue(ParsedCollaboratorRequest);

    const response = await POST(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedCollaboratorResponse);
    expect(response.status).toBe(201);
  });

  it('should return a 500 error when an exception occurs during collaborator creation', async () => {
    vi.spyOn(databaseClient.collaborator, 'create').mockRejectedValue(
      new Error('This is a test error'),
    );
    vi.spyOn(CollaboratorCreateSchema, 'parse').mockResolvedValue(ParsedCollaboratorRequest);

    const response = await POST(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'This is a test error' });
  });
});

describe('DELETE collaborator endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked request body representing a collaborator update payload.
   * Used as input data when testing the API request handling.
   */
  const MockCollaboratorRequest = [1, 2, 3];

  /**
   * Mocked database response representing a deleted collaborator entry.
   * This simulates the expected result when querying the database.
   */
  const DeletedResponse = {
    count: MockCollaboratorRequest.length,
  };

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      request: {
        method: 'DELETE',
        body: JSON.stringify(MockCollaboratorRequest),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.collaborator.deleteMany).toHaveBeenCalled();
  });

  it('should return the count of deleted collaborators when the request body is valid', async () => {
    vi.spyOn(databaseClient.collaborator, 'deleteMany').mockResolvedValue(DeletedResponse);

    const response = await DELETE(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual(DeletedResponse);
  });

  it('should return a 500 error when an exception occurs during collaborator deletion', async () => {
    vi.spyOn(databaseClient.collaborator, 'deleteMany').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await DELETE(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'This is a test error' });
  });
});
