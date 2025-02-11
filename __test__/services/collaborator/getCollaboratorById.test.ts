import type {Collaborator} from "@prisma/client";
import type {ErrorResponse} from "@/types/responses";

import {AxiosError, AxiosHeaders, type AxiosResponse} from "axios";
import {describe, expect, it, vi} from "vitest";

import {TEST_COLLABORATOR_MOCK} from "../../__mock__/collaborator.mock";

import {apiClient} from "@/helpers/client/axios";
import {getCollaboratorById} from "@/services/collaborator/getCollaboratorById";

// Mocking apiClient to simulate HTTP requests without actually calling the API
vi.mock("@/helpers/client/axios");

describe("getCollaboratorById", () => {
  const idCollaborator = TEST_COLLABORATOR_MOCK.id;
  const APIUrl = `/api/collaborator/get/id/${idCollaborator}.json`;

  it("should return collaborator data when the request is successful", async () => {
    // Simulating a successful response from apiClient
    const mockResponse: AxiosResponse<Collaborator> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: TEST_COLLABORATOR_MOCK,
    };

    // Mocking the resolved value of apiClient.get for this test case
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const response = await getCollaboratorById({id: idCollaborator});

    // Asserting that the response matches the mock data
    expect(response).toEqual(mockResponse.data);
    // Ensuring the API was called with the correct endpoint
    expect(apiClient.get).toHaveBeenCalledWith(APIUrl);
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
      await getCollaboratorById({id: idCollaborator});
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.error);
      }
    }

    expect(apiClient.get).toHaveBeenCalledWith(APIUrl);
  });
});
