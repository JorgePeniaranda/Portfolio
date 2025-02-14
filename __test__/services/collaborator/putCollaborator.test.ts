import type { ErrorResponse } from '@/types/responses';
import type { Collaborator } from '@prisma/client';
import type { AxiosError } from 'axios';

import { AxiosHeaders, type AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { generateTestCollaboratorMock } from '../../__mock__/collaborator.mock';

import { apiClient } from '@/helpers/client/axios';
import { putCollaborator } from '@/services/collaborator/putCollaborator';

// Mock the apiClient module
vi.mock('@/helpers/client/axios');

describe('putCollaborator', () => {
  const mockCollaborator = generateTestCollaboratorMock();
  const idCollaborator = mockCollaborator.id;
  const input = {
    nickname: 'John Doe',
  } as const;
  const APIUrl = `/api/collaborator/id/${idCollaborator}`;

  it('should return a successful response when the request is correct', async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<Collaborator> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: 'OK',
      data: mockCollaborator,
    };

    // Simulate a resolved promise for apiClient.put
    vi.mocked(apiClient.put).mockResolvedValueOnce(mockResponse);
    const response = await putCollaborator({
      idCollaborator: idCollaborator,
      updatedCollaborator: input,
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
      await putCollaborator({
        idCollaborator: idCollaborator,
        updatedCollaborator: input,
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
