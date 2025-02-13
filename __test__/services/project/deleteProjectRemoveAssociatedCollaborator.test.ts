import type { ErrorResponse } from '@/types/responses';
import type { AxiosError } from 'axios';
import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';

import { AxiosHeaders, type AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { deleteProjectRemoveAssociatedCollaborator } from '@/services/project/deleteProjectRemoveAssociatedCollaborator';
import { apiClient } from '@/helpers/client/axios';

// Mock the apiClient module
vi.mock('@/helpers/client/axios');

describe('deleteProjectRemoveAssociatedCollaborator', () => {
  // Input data for the tests
  const input: EntityRelationSchema = {
    idSource: 1,
    idTarget: 2,
  } as const;
  const APIUrl = `/api/project/id/${input.idTarget}/collaborator/${input.idSource}`;

  it('should return a successful response when the request is correct', async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<null> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: 'OK',
      data: null,
    };

    // Simulate a resolved promise for apiClient.delete
    vi.mocked(apiClient.delete).mockResolvedValueOnce(mockResponse);
    const response = await deleteProjectRemoveAssociatedCollaborator(input);

    // Validate response and apiClient call
    expect(response).toEqual(mockResponse.data);
    expect(apiClient.delete).toHaveBeenCalledWith(APIUrl);
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
      await deleteProjectRemoveAssociatedCollaborator(input);
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.title);
      }
    }

    expect(apiClient.delete).toHaveBeenCalledWith(APIUrl);
  });
});
