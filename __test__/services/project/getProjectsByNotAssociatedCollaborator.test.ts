import type {ErrorResponse} from "@/types/responses";
import type {Project} from "@prisma/client";

import {AxiosError, AxiosHeaders, type AxiosResponse} from "axios";
import {describe, expect, it, vi} from "vitest";

import {TEST_PROJECT_MOCK} from "../../__mock__/project.mock";

import {apiClient} from "@/helpers/client/axios";
import {getProjectsByNotAssociatedCollaborator} from "@/services/project/getProjectsByNotAssociatedCollaborator";

// Mocking apiClient to simulate HTTP requests without actually calling the API
vi.mock("@/helpers/client/axios");

describe("getProjectsByNotAssociatedCollaborator", () => {
  const idCollaborator = 1;
  const APIUrl = `/api/project/get/not-related/collaborator/${idCollaborator}.json`;
  const pagination = {page: 1, size: 10};

  it("should return project data when the request is successful", async () => {
    // Simulating a successful response from apiClient
    const mockResponse: AxiosResponse<Project[]> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: [TEST_PROJECT_MOCK, TEST_PROJECT_MOCK, TEST_PROJECT_MOCK],
    };

    // Mocking the resolved value of apiClient.get for this test case
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const response = await getProjectsByNotAssociatedCollaborator({
      idCollaborator,
      pagination,
    });

    // Asserting that the response matches the mock data
    expect(response).toEqual(mockResponse.data);
    // Ensuring the API was called with the correct endpoint
    expect(apiClient.get).toHaveBeenCalledWith(APIUrl, {
      params: pagination,
    });
  });

  it("should handle errors correctly when the request fails", async () => {
    // Mock an error response (axios error)
    const mockError: AxiosError<ErrorResponse> = {
      isAxiosError: true,
      message: "Request failed with status code 500",
      name: "AxiosError",
      toJSON: () => ({}),
      response: {
        config: {
          headers: new AxiosHeaders(),
        },
        headers: {},
        status: 500,
        statusText: "Internal Server Error",
        data: {
          error: "This is an test error message",
        },
      },
    };

    // Simulate a rejected promise for apiClient.get
    vi.mocked(apiClient.get).mockRejectedValueOnce(mockError);

    try {
      await getProjectsByNotAssociatedCollaborator({
        idCollaborator,
        pagination,
      });
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.error);
      }
    }

    expect(apiClient.get).toHaveBeenCalledWith(APIUrl, {
      params: pagination,
    });
  });
});
