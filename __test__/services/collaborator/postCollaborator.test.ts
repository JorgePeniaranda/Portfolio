import type {ErrorResponse} from "@/types/responses";
import type {Collaborator} from "@prisma/client";

import {AxiosError, AxiosHeaders, type AxiosResponse} from "axios";
import {describe, expect, it, vi} from "vitest";

import {TEST_COLLABORATOR_MOCK} from "../../__mock__/collaborator.mock";

import {apiClient} from "@/helpers/client/axios";
import {postCollaborator} from "@/services/collaborator/postCollaborator";

// Mock the apiClient module
vi.mock("@/helpers/client/axios");

describe("postCollaborator", () => {
  // Input data for the tests
  const input = TEST_COLLABORATOR_MOCK;
  const APIUrl = "/api/collaborator/create";

  it("should return a successful response when the request is correct", async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<Collaborator> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 201,
      statusText: "OK",
      data: TEST_COLLABORATOR_MOCK,
    };

    // Simulate a resolved promise for apiClient.post
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);
    const response = await postCollaborator(input);

    // Validate response and apiClient call
    expect(response).toEqual(mockResponse.data);
    expect(apiClient.post).toHaveBeenCalledWith(APIUrl, input);
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

    // Simulate a rejected promise for apiClient.post
    vi.mocked(apiClient.post).mockRejectedValueOnce(mockError);

    try {
      await postCollaborator(input);
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.error);
      }
    }

    expect(apiClient.post).toHaveBeenCalledWith(APIUrl, input);
  });
});
