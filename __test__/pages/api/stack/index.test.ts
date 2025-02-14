import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { TEST_STACK_MOCK } from '__test__/__mock__/stack.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { DELETE, POST } from '@/pages/api/stack';
import { StackCreateSchema } from '@/schemas/stack/create';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    stack: {
      create: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

vi.mock('@/schemas/stack/create', () => ({
  StackCreateSchema: {
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

describe('CREATE stack endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked request body representing a stack update payload.
   * Used as input data when testing the API request handling.
   */
  const MockStackRequest: StackCreateSchema = {
    name: 'Test Stack',
    description: 'This is a test stack',
    key: 'test-stack',
    category: 'BACK_END',
    type: 'DATABASE',
    iconUrl: 'https://example.com/icon.png',
  };

  /**
   * Parsed version of the request body.
   * Simulates the actual result of calling `request.json()` in an API handler.
   *
   * @example
   * const parsed = request.json(); // Equivalent to ParsedStackRequest
   */
  const ParsedStackRequest: typeof MockStackRequest = JSON.parse(JSON.stringify(MockStackRequest));

  /**
   * Mocked database response representing a stored stack entry.
   * This simulates the expected result when querying the database.
   */
  const MockStackRecord = TEST_STACK_MOCK;

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
      request: {
        method: 'POST',
        body: JSON.stringify(MockStackRequest),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(StackCreateSchema.parse).toHaveBeenCalledWith(ParsedStackRequest);
    expect(databaseClient.stack.create).toHaveBeenCalled();
  });

  it('should return the created stack when the request body is valid', async () => {
    vi.spyOn(databaseClient.stack, 'create').mockResolvedValue(MockStackRecord);
    vi.spyOn(StackCreateSchema, 'parse').mockResolvedValue(ParsedStackRequest);

    const response = await POST(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedStackResponse);
    expect(response.status).toBe(201);
  });

  it('should return a 500 error when an exception occurs during stack creation', async () => {
    vi.spyOn(databaseClient.stack, 'create').mockRejectedValue(new Error('This is a test error'));
    vi.spyOn(StackCreateSchema, 'parse').mockResolvedValue(ParsedStackRequest);

    const response = await POST(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'This is a test error' });
  });
});

describe('DELETE stack endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked request body representing a stack update payload.
   * Used as input data when testing the API request handling.
   */
  const MockStackRequest = [1, 2, 3];

  /**
   * Mocked database response representing a deleted stack entry.
   * This simulates the expected result when querying the database.
   */
  const DeletedResponse = {
    count: MockStackRequest.length,
  };

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      request: {
        method: 'DELETE',
        body: JSON.stringify(MockStackRequest),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.stack.deleteMany).toHaveBeenCalled();
  });

  it('should return the count of deleted stacks when the request body is valid', async () => {
    vi.spyOn(databaseClient.stack, 'deleteMany').mockResolvedValue(DeletedResponse);

    const response = await DELETE(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual(DeletedResponse);
  });

  it('should return a 500 error when an exception occurs during stack deletion', async () => {
    vi.spyOn(databaseClient.stack, 'deleteMany').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await DELETE(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'This is a test error' });
  });
});
