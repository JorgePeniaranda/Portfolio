import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { TEST_STACK_MOCK } from '__test__/__mock__/stack.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TEST_PROJECT_MOCK } from '__test__/__mock__/project.mock';

import { databaseClient } from '@/helpers/client/prisma';
import { DELETE, POST, getStaticPaths } from '@/pages/api/stack/id/[id]/project/[idProject]';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('POST relation with stack endpoint', () => {
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

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      params: {
        id: '1',
        idProject: '2',
      },
      request: {
        method: 'POST',
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.stack.update).toHaveBeenCalled();
  });

  it('should successfully create a relation between a stack and a project when parameters are valid', async () => {
    vi.spyOn(databaseClient.stack, 'update').mockResolvedValue(MockStackRecord);

    const response = await POST(AstroApiContext);

    expect(response.status).toBe(204);
  });

  it('should return a 500 error when an exception occurs while creating a relation between a stack and a project', async () => {
    vi.spyOn(databaseClient.stack, 'update').mockRejectedValue(new Error('This is a test error'));

    const response = await POST(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});

describe('DELETE relation with stack endpoint', () => {
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

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      params: {
        id: '1',
        idProject: '2',
      },
      request: {
        method: 'DELETE',
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.stack.update).toHaveBeenCalled();
  });

  it('should successfully delete a relation between a stack and a project when parameters are valid', async () => {
    vi.spyOn(databaseClient.stack, 'update').mockResolvedValue(MockStackRecord);

    const response = await DELETE(AstroApiContext);

    expect(response.status).toBe(204);
  });

  it('should return a 500 error when an exception occurs while deleting a relation between a stack and a project', async () => {
    vi.spyOn(databaseClient.stack, 'update').mockRejectedValue(new Error('This is a test error'));

    const response = await DELETE(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});

describe('getStaticPaths', () => {
  it('should return a list of paths for all stack and project combinations', async () => {
    const PrismaStackMock = [TEST_STACK_MOCK, TEST_STACK_MOCK, TEST_STACK_MOCK];
    const PrismaProjectMock = [TEST_PROJECT_MOCK, TEST_PROJECT_MOCK, TEST_PROJECT_MOCK];

    vi.spyOn(databaseClient.stack, 'findMany').mockResolvedValue(PrismaStackMock);
    vi.spyOn(databaseClient.project, 'findMany').mockResolvedValue(PrismaProjectMock);
    const paths = await getStaticPaths();

    expect(paths).toEqual(
      PrismaStackMock.flatMap((stack) =>
        PrismaProjectMock.map((project) => ({
          params: {
            id: stack.id,
            idProject: project.id,
          },
        })),
      ),
    );
  });
});
