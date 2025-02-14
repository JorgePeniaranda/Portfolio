import type { ErrorResponse } from '@/types/responses';
import type { Collaborator } from '@prisma/client';
import type { AxiosError } from 'axios';

import { generateTestProjectMock } from '__test__/__mock__/project.mock';
import { AxiosHeaders, type AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { generateManyTestCollaboratorMocks } from '../../__mock__/collaborator.mock';

import { apiClient } from '@/helpers/client/axios';
import { getCollaboratorsByAssociatedProjects } from '@/services/collaborator/getCollaboratorsByAssociatedProjects';

// Mocking apiClient to simulate HTTP requests without actually calling the API
vi.mock('@/helpers/client/axios');

describe('getCollaboratorsByAssociatedProjects', () => {
  const projectMock = generateTestProjectMock();
  const idProject = projectMock.id;
  const APIUrl = `/api/collaborator/related/project/${idProject}.json`;

  it('should return collaborator data when the request is successful', async () => {
    // Simulating a successful response from apiClient
    const mockResponse: AxiosResponse<Collaborator[]> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: 'OK',
      data: generateManyTestCollaboratorMocks(3),
    };

    // Mocking the resolved value of apiClient.get for this test case
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const response = await getCollaboratorsByAssociatedProjects({
      idProject,
    });

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
      await getCollaboratorsByAssociatedProjects({ idProject });
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
