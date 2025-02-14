import type { DeleteResponse, ErrorResponse } from '@/types/responses';
import type { AxiosError } from 'axios';

import { describe, it, expect, vi } from 'vitest';
import { AxiosHeaders, type AxiosResponse } from 'axios';

import { deleteCollaborator } from '@/services/collaborator/deleteCollaborator';
import { apiClient } from '@/helpers/client/axios';

// Mock the apiClient module
vi.mock('@/helpers/client/axios');

describe('deleteCollaborator', () => {
  const input = [0, 1];
  const APIUrl = '/api/collaborator';

  it('should return a successful response when the request is correct', async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<DeleteResponse> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: 'OK',
      data: {
        count: input.length,
      },
    };

    // Simulate a resolved promise for apiClient.delete
    vi.mocked(apiClient.delete).mockResolvedValueOnce(mockResponse);
    const response = await deleteCollaborator(input);

    // Validate response and apiClient call
    expect(response).toEqual(mockResponse.data);
    expect(apiClient.delete).toHaveBeenCalledWith(APIUrl, {
      data: input,
    });
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

    // Simulate a rejected promise for apiClient.delete
    vi.mocked(apiClient.delete).mockRejectedValueOnce(mockError);

    try {
      await deleteCollaborator(input);
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.title);
      }
    }

    expect(apiClient.delete).toHaveBeenCalledWith(APIUrl, {
      data: input,
    });
  });
});
