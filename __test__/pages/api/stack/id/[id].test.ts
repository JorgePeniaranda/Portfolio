import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { TEST_STACK_MOCK } from '__test__/__mock__/stack.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { GET, getStaticPaths } from '@/pages/api/stack/id/[id].json';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('GET stack by id endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

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
      params: { id: '1' },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.stack.findUnique).toHaveBeenCalled();
  });

  it('should return the stack data when a valid ID is provided', async () => {
    vi.spyOn(databaseClient.stack, 'findUnique').mockResolvedValue(MockStackRecord);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedStackResponse);
    expect(response.status).toBe(200);
  });

  it('should return null when no stack is found for the given ID', async () => {
    vi.spyOn(databaseClient.stack, 'findUnique').mockResolvedValue(null);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toBeNull();
    expect(response.status).toBe(200);
  });

  it('should return a 500 error when an exception occurs during the query', async () => {
    vi.spyOn(databaseClient.stack, 'findUnique').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});

describe('getStaticPaths', () => {
  it('should return a list of paths for all stacks', async () => {
    const PrismaStackMock = [TEST_STACK_MOCK, TEST_STACK_MOCK, TEST_STACK_MOCK];

    vi.spyOn(databaseClient.stack, 'findMany').mockResolvedValue(PrismaStackMock);
    const paths = await getStaticPaths();

    expect(paths).toEqual(
      PrismaStackMock.map((stack) => ({
        params: { id: stack.id },
      })),
    );
  });
});
