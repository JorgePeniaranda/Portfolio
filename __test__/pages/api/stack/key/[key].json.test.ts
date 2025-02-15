import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { generateManyTestStackMocks, generateTestStackMock } from '__test__/__mock__/stack.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { GET, getStaticPaths } from '@/pages/api/stack/key/[key].json';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('GET stack by key endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked database response representing a stored stack entry.
   * This simulates the expected result when querying the database.
   */
  const MockStackRecord = generateTestStackMock();

  /**
   * Simulated parsed response body.
   * Represents the expected API response after processing the request.
   * @example
   * const response = await apiCall();
   * const parsedResponse = await response.json(); // Equivalent to ParsedStackResponse
   */
  const ParsedStackResponse: typeof MockStackRecord = JSON.parse(JSON.stringify(MockStackRecord));

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      params: { key: 'stack-1' },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.stack.findUnique).toHaveBeenCalled();
  });

  it('should return the stack data when the key is valid', async () => {
    vi.spyOn(databaseClient.stack, 'findUnique').mockResolvedValue(MockStackRecord);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedStackResponse);
    expect(response.status).toBe(200);
  });

  it('should return null when no stack is found for the given key', async () => {
    vi.spyOn(databaseClient.stack, 'findUnique').mockResolvedValue(null);

    const response = await GET(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(null);
    expect(response.status).toBe(200);
  });

  it('should return a 500 error when an exception occurs during the database query', async () => {
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
    const PrismaStackMock = generateManyTestStackMocks(3);

    vi.spyOn(databaseClient.stack, 'findMany').mockResolvedValue(PrismaStackMock);
    const paths = await getStaticPaths();

    expect(paths).toEqual(
      PrismaStackMock.map((stack) => ({
        params: { key: stack.key },
      })),
    );
  });
});
