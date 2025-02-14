import type { ErrorResponse } from '@/types/responses';
import type { AxiosError } from 'axios';

import { AxiosHeaders, type AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { TEST_PROJECT_MOCK } from '../../__mock__/project.mock';

import { apiClient } from '@/helpers/client/axios';
import { postProject } from '@/services/project/postProject';

// Mock the apiClient module
vi.mock('@/helpers/client/axios');

describe('postProject', () => {
  // Input data for the tests
  const input = TEST_PROJECT_MOCK;
  const APIUrl = '/api/project';

  it('should return a successful response when the request is correct', async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<unknown> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: 'OK',
      data: TEST_PROJECT_MOCK,
    };

    // Simulate a resolved promise for apiClient.post
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);
    const response = await postProject(input);

    // Validate response and apiClient call
    expect(response).toEqual(mockResponse.data);
    expect(apiClient.post).toHaveBeenCalledWith(APIUrl, input);
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

    // Simulate a rejected promise for apiClient.post
    vi.mocked(apiClient.post).mockRejectedValueOnce(mockError);

    try {
      await postProject(input);
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.title);
      }
    }

    expect(apiClient.post).toHaveBeenCalledWith(APIUrl, input);
  });
});
