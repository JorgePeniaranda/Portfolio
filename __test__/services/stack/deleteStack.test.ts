import type { DeleteResponse } from '@/types/responses';

import { createMockAxiosError } from '__test__/__mock__/create-mock-axios-error';
import { createMockAxiosResponse } from '__test__/__mock__/create-mock-axios-response';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/helpers/client/axios';
import { deleteStack } from '@/services/stack/deleteStack';

// Mock the apiClient module
vi.mock('@/helpers/client/axios');

describe('deleteStack', () => {
  /**
   * Mocked request body for the service.
   */
  const MockStackRequest = [0, 1];

  /**
   * Mocked response body for axios when the request is successful.
   */
  const MockAxiosResponse = createMockAxiosResponse<DeleteResponse>({
    data: {
      count: MockStackRequest.length,
    },
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
  const EndpointUrl = '/api/stack';

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(apiClient.delete).toHaveBeenCalledWith(EndpointUrl, {
      data: MockStackRequest,
    });
  });

  it('should return a successful response when the request is correct', async () => {
    vi.mocked(apiClient.delete).mockResolvedValueOnce(MockAxiosResponse);

    const response = await deleteStack(MockStackRequest);

    expect(response).toEqual(MockAxiosResponse.data);
  });

  it('should handle errors correctly when the request fails', async () => {
    vi.mocked(apiClient.delete).mockRejectedValueOnce(MockAxiosError);

    try {
      await deleteStack(MockStackRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(MockAxiosError.response?.data.title);
      }
    }
  });
});
