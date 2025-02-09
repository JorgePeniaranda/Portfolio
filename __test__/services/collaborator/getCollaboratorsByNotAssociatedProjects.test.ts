import type {Collaborator} from "@prisma/client";
import type {ErrorResponse} from "@/types/responses";

import {AxiosError, AxiosHeaders, type AxiosResponse} from "axios";
import {describe, expect, it, vi} from "vitest";

import {TEST_COLLABORATOR_MOCK} from "../../__mock__/collaborator.mock";

import {apiClient} from "@/helpers/client/axios";
import {getCollaboratorsByNotAssociatedProjects} from "@/services/collaborator/getCollaboratorsByNotAssociatedProjects";

// Mocking apiClient to simulate HTTP requests without actually calling the API
vi.mock("@/helpers/client/axios");

describe("getCollaboratorsByNotAssociatedProjects", () => {
  const idCollaborator = TEST_COLLABORATOR_MOCK.id;
  const APIUrl = `/api/collaborator/get/not-related/project/${idCollaborator}.json`;
  const idProject = 1;
  const pagination = {page: 1, size: 10};

  it("should return collaborator data when the request is successful", async () => {
    // Simulating a successful response from apiClient
    const mockResponse: AxiosResponse<Collaborator[]> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: [TEST_COLLABORATOR_MOCK, TEST_COLLABORATOR_MOCK, TEST_COLLABORATOR_MOCK],
    };

    // Mocking the resolved value of apiClient.get for this test case
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const response = await getCollaboratorsByNotAssociatedProjects({
      idProject,
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
          status: 500,
          title: "An internal server error occurred.",
          type: "InternalServerError",
          detail: "This is an test error message",
        },
      },
    };

    // Simulate a rejected promise for apiClient.get
    vi.mocked(apiClient.get).mockRejectedValueOnce(mockError);

    try {
      await getCollaboratorsByNotAssociatedProjects({idProject, pagination});
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.title);
      }
    }

    expect(apiClient.get).toHaveBeenCalledWith(APIUrl, {
      params: pagination,
    });
  });
});
