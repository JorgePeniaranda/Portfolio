import type { Stack } from '@prisma/client';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockAxiosError } from '__test__/__mock__/create-mock-axios-error';
import { createMockAxiosResponse } from '__test__/__mock__/create-mock-axios-response';

import { generateTestStackMock } from '../../__mock__/stack.mock';

import { apiClient } from '@/helpers/client/axios';
import { postStack } from '@/services/stack/postStack';

// Mock the apiClient module
vi.mock('@/helpers/client/axios');

describe('postStack', () => {
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
  const EndpointUrl = '/api/stack';

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(apiClient.post).toHaveBeenCalledWith(EndpointUrl, MockCollaboratorRequest);
  });

  it('should return a successful response when the request is correct', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce(MockAxiosResponse);

    const response = await postStack(MockCollaboratorRequest);

    expect(response).toEqual(MockAxiosResponse.data);
  });

  it('should handle errors correctly when the request fails', async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(MockAxiosError);

    try {
      await postStack(MockCollaboratorRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(MockAxiosError.response?.data.title);
      }
    }
  });
});
