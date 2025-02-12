import type { ErrorResponse } from '@/types/responses';
import type { Stack } from '@prisma/client';

import { AxiosError, AxiosHeaders, type AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { TEST_STACK_MOCK } from '../../__mock__/stack.mock';

import { apiClient } from '@/helpers/client/axios';
import { getStackById } from '@/services/stack/getStackById';

// Mocking apiClient to simulate HTTP requests without actually calling the API
vi.mock('@/helpers/client/axios');

describe('getStackById', () => {
  const idStack = TEST_STACK_MOCK.id;
  const APIUrl = `/api/stack/get/id/${idStack}.json`;

  it('should return stack data when the request is successful', async () => {
    // Simulating a successful response from apiClient
    const mockResponse: AxiosResponse<Stack> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: 'OK',
      data: TEST_STACK_MOCK,
    };

    // Mocking the resolved value of apiClient.get for this test case
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const response = await getStackById({ id: idStack });

    // Asserting that the response matches the mock data
    expect(response).toEqual(mockResponse.data);
    // Ensuring the API was called with the correct endpoint
    expect(apiClient.get).toHaveBeenCalledWith(APIUrl);
  });

  it('should handle errors correctly when the request fails', async () => {
    // Mock an error response (axios error)
    const mockError: AxiosError<ErrorResponse> = {
      isAxiosError: true,
      message: 'Request failed with status code 500',
      name: 'AxiosError',
      toJSON: () => ({}),
      response: {
        config: {
          headers: new AxiosHeaders(),
        },
        headers: {},
        status: 500,
        statusText: 'Internal Server Error',
        data: {
          status: 500,
          title: 'An internal server error occurred.',
          type: 'InternalServerError',
          detail: 'This is an test error message',
        },
      },
    };

    // Simulate a rejected promise for apiClient.get
    vi.mocked(apiClient.get).mockRejectedValueOnce(mockError);

    try {
      await getStackById({ id: idStack });
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.title);
      }
    }

    expect(apiClient.get).toHaveBeenCalledWith(APIUrl);
  });
});
