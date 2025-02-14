import type { ErrorResponse } from '@/types/responses';
import type { Project } from '@prisma/client';
import type { AxiosError } from 'axios';

import { AxiosHeaders, type AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { TEST_PROJECT_MOCK } from '../../__mock__/project.mock';

import { apiClient } from '@/helpers/client/axios';
import { putProject } from '@/services/project/putProject';

// Mock the apiClient module
vi.mock('@/helpers/client/axios');

describe('putProject', () => {
  // Input data for the tests
  const input = TEST_PROJECT_MOCK;
  const APIUrl = `/api/project/id/${input.id}`;

  it('should return a successful response when the request is correct', async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<Project> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: 'OK',
      data: TEST_PROJECT_MOCK,
    };

    // Simulate a resolved promise for apiClient.put
    vi.mocked(apiClient.put).mockResolvedValueOnce(mockResponse);
    const response = await putProject({
      idProject: input.id,
      projectUpdateInput: input,
    });

    // Validate response and apiClient call
    expect(response).toEqual(mockResponse.data);
    expect(apiClient.put).toHaveBeenCalledWith(APIUrl, input);
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

    // Simulate a rejected promise for apiClient.put
    vi.mocked(apiClient.put).mockRejectedValueOnce(mockError);

    try {
      await putProject({
        idProject: input.id,
        projectUpdateInput: input,
      });
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.title);
      }
    }

    expect(apiClient.put).toHaveBeenCalledWith(APIUrl, input);
  });
});
