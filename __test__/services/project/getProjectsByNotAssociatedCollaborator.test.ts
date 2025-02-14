import type { Project } from '@prisma/client';

import { createMockAxiosError } from '__test__/__mock__/create-mock-axios-error';
import { createMockAxiosResponse } from '__test__/__mock__/create-mock-axios-response';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { generateManyTestProjectMocks } from '../../__mock__/project.mock';

import { apiClient } from '@/helpers/client/axios';
import { getProjectsByNotAssociatedCollaborator } from '@/services/project/getProjectsByNotAssociatedCollaborator';

// Mocking apiClient to simulate HTTP requests without actually calling the API
vi.mock('@/helpers/client/axios');

describe('getProjectsByNotAssociatedCollaborator', () => {
  const idCollaborator = 1;

  /**
   * Mocked response body for axios when the request is successful.
   */
  const MockAxiosResponse = createMockAxiosResponse<Project[]>({
    data: generateManyTestProjectMocks(3),
  });

  /**
   * Mocked error response for axios when the request fails.
   */
  const MockAxiosError = createMockAxiosError({
    response: {
      data: {
        title: 'An test error occurred',
      },
    },
  });

  /**
   * API endpoint for the service.
   */
  const EndpointUrl = `/api/project/not-related/collaborator/${idCollaborator}.json`;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(apiClient.get).toHaveBeenCalledWith(EndpointUrl);
  });

  it('should return project data when the request is successful', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce(MockAxiosResponse);

    const response = await getProjectsByNotAssociatedCollaborator({
      idCollaborator,
    });

    expect(response).toEqual(MockAxiosResponse.data);
  });

  it('should handle errors correctly when the request fails', async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(MockAxiosError);

    try {
      await getProjectsByNotAssociatedCollaborator({
        idCollaborator,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(MockAxiosError.response?.data.title);
      }
    }
  });
});
