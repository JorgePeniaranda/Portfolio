import type {ApiResponse} from "@/types/responses";

import {describe, it, expect, vi} from "vitest";
import {AxiosHeaders, type AxiosResponse} from "axios";

import {apiClient} from "@/helpers/client/axios";
import {getCollaboratorById} from "@/services/collaborator/getCollaboratorById";

// Mocking apiClient to simulate HTTP requests without actually calling the API
vi.mock("@/helpers/client/axios");

describe("getCollaboratorById", () => {
  it("should return collaborator data when the request is successful", async () => {
    // Simulating a successful response from apiClient
    const mockResponse: AxiosResponse<ApiResponse<unknown>> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: {
        success: true,
        message: "Collaborator found",
        data: {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
        },
      },
    };

    // Mocking the resolved value of apiClient.get for this test case
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const collaboratorId = 1; // The ID of the collaborator to fetch
    const response = await getCollaboratorById({id: collaboratorId});

    // Asserting that the response matches the mock data
    expect(response).toEqual(mockResponse.data);
    // Ensuring the API was called with the correct endpoint
    expect(apiClient.get).toHaveBeenCalledWith(`api/collaborator/get/id/${collaboratorId}.json`);
  });

  it("should throw an error when the request fails", async () => {
    // Simulating an error response from apiClient
    const mockErrorResponse = {
      data: {
        success: false,
        message: "Collaborator not found",
      },
    };

    // Mocking the resolved value of apiClient.get for this test case
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockErrorResponse);

    const collaboratorId = 999; // Non-existent collaborator ID to trigger the error

    try {
      await getCollaboratorById({id: collaboratorId});
    } catch (error) {
      // Asserting that the error matches the expected message
      expect(error).toEqual(new Error(mockErrorResponse.data.message));
    }

    // Ensuring the API was called with the correct endpoint
    expect(apiClient.get).toHaveBeenCalledWith(`api/collaborator/get/id/${collaboratorId}.json`);
  });

  it("should return null if the collaborator is not found", async () => {
    // Simulating a successful response with null data for the collaborator
    const mockResponse = {
      data: {
        success: true,
        message: "Collaborator found",
        data: null,
      },
    };

    // Mocking the resolved value of apiClient.get for this test case
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const collaboratorId = 1; // The ID of the collaborator to fetch
    const response = await getCollaboratorById({id: collaboratorId});

    // Asserting that the response is null since no collaborator was found
    expect(response).toBeNull();
    // Ensuring the API was called with the correct endpoint
    expect(apiClient.get).toHaveBeenCalledWith(`api/collaborator/get/id/${collaboratorId}.json`);
  });
});
