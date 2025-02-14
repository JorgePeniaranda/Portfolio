import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { generateTestStackMock } from '__test__/__mock__/stack.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { PUT } from '@/pages/api/stack/id/[id]';
import { StackUpdateSchema } from '@/schemas/stack/update';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('PUT stack endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked request body representing a stack update payload.
   * Used as input data when testing the API request handling.
   */
  const MockStackRequest: StackUpdateSchema = {
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
  const MockStackRecord = generateTestStackMock();

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
      params: {
        id: '1',
      },
      request: {
        method: 'PUT',
        body: JSON.stringify(ParsedStackRequest),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {});

  it('should return the updated stack data when the request is valid', async () => {
    vi.spyOn(databaseClient.stack, 'update').mockResolvedValue(MockStackRecord);
    vi.spyOn(StackUpdateSchema, 'parse').mockResolvedValue(ParsedStackRequest);

    const response = await PUT(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedStackResponse);
    expect(response.status).toBe(200);
  });

  it('should return a 500 error when an exception occurs during the update', async () => {
    vi.spyOn(databaseClient.stack, 'update').mockRejectedValue(new Error('This is a test error'));
    vi.spyOn(StackUpdateSchema, 'parse').mockResolvedValue(ParsedStackRequest);

    const response = await PUT(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});
