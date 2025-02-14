import type { Stack } from '@prisma/client';

import { createMockAxiosError } from '__test__/__mock__/create-mock-axios-error';
import { createMockAxiosResponse } from '__test__/__mock__/create-mock-axios-response';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { generateTestStackMock } from '../../__mock__/stack.mock';

import { apiClient } from '@/helpers/client/axios';
import { getStackById } from '@/services/stack/getStackById';

// Mocking apiClient to simulate HTTP requests without actually calling the API
vi.mock('@/helpers/client/axios');

describe('getStackById', () => {
  /**
   * Mocked request body for the service.
   */
  const MockCollaboratorRequest = generateTestStackMock();

  /**
   * Mocked response body for axios when the request is successful.
   */
  const MockAxiosResponse = createMockAxiosResponse<Stack>({
    data: generateTestStackMock(),
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
  const EndpointUrl = `/api/stack/id/${MockCollaboratorRequest.id}.json`;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(apiClient.get).toHaveBeenCalledWith(EndpointUrl);
  });

  it('should return stack data when the request is successful', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce(MockAxiosResponse);

    const response = await getStackById({ id: MockCollaboratorRequest.id });

    expect(response).toEqual(MockAxiosResponse.data);
  });

  it('should handle errors correctly when the request fails', async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(MockAxiosError);

    try {
      await getStackById({ id: MockCollaboratorRequest.id });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(MockAxiosError.response?.data.title);
      }
    }
  });
});
