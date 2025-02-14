import type { Stack } from '@prisma/client';

import { createMockAxiosError } from '__test__/__mock__/create-mock-axios-error';
import { createMockAxiosResponse } from '__test__/__mock__/create-mock-axios-response';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { generateTestStackMock } from '../../__mock__/stack.mock';

import { apiClient } from '@/helpers/client/axios';
import { putStack } from '@/services/stack/putStack';

// Mock the apiClient module
vi.mock('@/helpers/client/axios');

describe('putStack', () => {
  /**
   * Mocked request body for the service.
   */
  const MockStackRequest = generateTestStackMock();

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
  const EndpointUrl = `/api/stack/id/${MockStackRequest.id}`;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(apiClient.put).toHaveBeenCalledWith(EndpointUrl, MockStackRequest);
  });

  it('should return a successful response when the request is correct', async () => {
    vi.mocked(apiClient.put).mockResolvedValueOnce(MockAxiosResponse);

    const response = await putStack({
      idStack: MockStackRequest.id,
      stackUpdateInput: MockStackRequest,
    });

    expect(response).toEqual(MockAxiosResponse.data);
  });

  it('should handle errors correctly when the request fails', async () => {
    vi.mocked(apiClient.put).mockRejectedValueOnce(MockAxiosError);

    try {
      await putStack({
        idStack: MockStackRequest.id,
        stackUpdateInput: MockStackRequest,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(MockAxiosError.response?.data.title);
      }
    }
  });
});
