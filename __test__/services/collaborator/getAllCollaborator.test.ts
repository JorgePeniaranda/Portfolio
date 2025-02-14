import type { Collaborator } from '@prisma/client';

import { createMockAxiosError } from '__test__/__mock__/create-mock-axios-error';
import { createMockAxiosResponse } from '__test__/__mock__/create-mock-axios-response';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { generateManyTestCollaboratorMocks } from '../../__mock__/collaborator.mock';

import { apiClient } from '@/helpers/client/axios';
import { getAllCollaborator } from '@/services/collaborator/getAllCollaborator';

vi.mock('@/helpers/client/axios');

describe('getAllCollaborator', () => {
  /**
   * Mocked response body for axios when the request is successful.
   */
  const MockAxiosResponse = createMockAxiosResponse<Collaborator[]>({
    data: generateManyTestCollaboratorMocks(3),
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
  const EndpointUrl = `/api/collaborator.json`;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(apiClient.get).toHaveBeenCalledWith(EndpointUrl);
  });

  it('should return collaborator data when the request is successful', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce(MockAxiosResponse);

    const response = await getAllCollaborator();

    expect(response).toEqual(MockAxiosResponse.data);
  });

  it('should handle errors correctly when the request fails', async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(MockAxiosError);

    try {
      await getAllCollaborator();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(MockAxiosError.response?.data.title);
      }
    }
  });
});
