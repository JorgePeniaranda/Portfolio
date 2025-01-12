import type {ErrorResponse} from "@/types/responses";
import type {Collaborator} from "@prisma/client";

import {AxiosError, AxiosHeaders, type AxiosResponse} from "axios";
import {describe, expect, it, vi} from "vitest";

import {TEST_COLLABORATOR_MOCK} from "../../__mock__/collaborator.mock";

import {putCollaborator} from "@/services/collaborator/putCollaborator";
import {apiClient} from "@/helpers/client/axios";

// Mock the apiClient module
vi.mock("@/helpers/client/axios");

describe("putCollaborator", () => {
  // Input data for the tests
  const input = {
    nickname: "John Doe",
  } as const;
  const APIUrl = "/api/collaborator/update";

  it("should return a successful response when the request is correct", async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<Collaborator> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: TEST_COLLABORATOR_MOCK,
    };

    // Simulate a resolved promise for apiClient.put
    vi.mocked(apiClient.put).mockResolvedValueOnce(mockResponse);
    const response = await putCollaborator(input);

    // Validate response and apiClient call
    expect(response).toEqual(mockResponse.data);
    expect(apiClient.put).toHaveBeenCalledWith(APIUrl, input);
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

    // Simulate a rejected promise for apiClient.put
    vi.mocked(apiClient.put).mockRejectedValueOnce(mockError);

    try {
      await putCollaborator(input);
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.error);
      }
    }

    expect(apiClient.put).toHaveBeenCalledWith(APIUrl, input);
  });
});
