import type { Collaborator } from '@prisma/client';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockAxiosError } from '__test__/__mock__/create-mock-axios-error';
import { createMockAxiosResponse } from '__test__/__mock__/create-mock-axios-response';

import { generateTestCollaboratorMock } from '../../__mock__/collaborator.mock';

import { apiClient } from '@/helpers/client/axios';
import { putCollaborator } from '@/services/collaborator/putCollaborator';

// Mock the apiClient module
vi.mock('@/helpers/client/axios');

describe('putCollaborator', () => {
  /**
   * Mocked request body for the service.
   */
  const MockCollaboratorRequest = generateTestCollaboratorMock();

  /**
   * Mocked response body for axios when the request is successful.
   */
  const MockAxiosResponse = createMockAxiosResponse<Collaborator>({
    data: generateTestCollaboratorMock(),
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
  const EndpointUrl = `/api/collaborator/id/${MockCollaboratorRequest.id}`;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(apiClient.put).toHaveBeenCalledWith(EndpointUrl, MockCollaboratorRequest);
  });

  it('should return a successful response when the request is correct', async () => {
    vi.mocked(apiClient.put).mockResolvedValueOnce(MockAxiosResponse);

    const response = await putCollaborator({
      idCollaborator: MockCollaboratorRequest.id,
      updatedCollaborator: MockCollaboratorRequest,
    });

    // Validate response and apiClient call
    expect(response).toEqual(MockAxiosResponse.data);
  });

  it('should handle errors correctly when the request fails', async () => {
    vi.mocked(apiClient.put).mockRejectedValueOnce(MockAxiosError);

    try {
      await putCollaborator({
        idCollaborator: MockCollaboratorRequest.id,
        updatedCollaborator: MockCollaboratorRequest,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(MockAxiosError.response?.data.title);
      }
    }
  });
});
