import type { APIContext } from 'astro';

import {
  generateManyTestCollaboratorMocks,
  generateTestCollaboratorMock,
} from '__test__/__mock__/collaborator.mock';
import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { generateManyTestProjectMocks } from '__test__/__mock__/project.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { DELETE, getStaticPaths, POST } from '@/pages/api/collaborator/id/[id]/project/[idProject]';

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('POST relation with collaborator endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked database response representing a stored collaborator entry.
   * This simulates the expected result when querying the database.
   */
  const MockCollaboratorRecord = generateTestCollaboratorMock();

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
    expect(databaseClient.collaborator.update).toHaveBeenCalled();
  });

  it('should successfully create a relation between a collaborator and a project when parameters are valid', async () => {
    vi.spyOn(databaseClient.collaborator, 'update').mockResolvedValue(MockCollaboratorRecord);

    const response = await POST(AstroApiContext);

    expect(response.status).toBe(204);
  });

  it('should return a 500 error when an exception occurs while creating a relation between a collaborator and a project', async () => {
    vi.spyOn(databaseClient.collaborator, 'update').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await POST(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});

describe('DELETE relation with collaborator endpoint', () => {
  /**
   * Mocked API context for Astro API requests.
   * This context is initialized before each test to ensure isolation.
   */
  let AstroApiContext: APIContext;

  /**
   * Mocked database response representing a stored collaborator entry.
   * This simulates the expected result when querying the database.
   */
  const MockCollaboratorRecord = generateTestCollaboratorMock();

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
    expect(databaseClient.collaborator.update).toHaveBeenCalled();
  });

  it('should successfully delete a relation between a collaborator and a project when parameters are valid', async () => {
    vi.spyOn(databaseClient.collaborator, 'update').mockResolvedValue(MockCollaboratorRecord);

    const response = await DELETE(AstroApiContext);

    expect(response.status).toBe(204);
  });

  it('should return a 500 error when an exception occurs while deleting a relation between a collaborator and a project', async () => {
    vi.spyOn(databaseClient.collaborator, 'update').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await DELETE(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual({ error: 'This is a test error' });
    expect(response.status).toBe(500);
  });
});

describe('getStaticPaths', () => {
  it('should return a list of paths for all collaborator and project combinations', async () => {
    const PrismaCollaboratorMock = generateManyTestCollaboratorMocks(3);
    const PrismaProjectMock = generateManyTestProjectMocks(3);

    vi.spyOn(databaseClient.collaborator, 'findMany').mockResolvedValue(PrismaCollaboratorMock);
    vi.spyOn(databaseClient.project, 'findMany').mockResolvedValue(PrismaProjectMock);
    const paths = await getStaticPaths();

    expect(paths).toEqual(
      PrismaCollaboratorMock.flatMap((collaborator) =>
        PrismaProjectMock.map((project) => ({
          params: {
            id: collaborator.id,
            idProject: project.id,
          },
        })),
      ),
    );
  });
});
