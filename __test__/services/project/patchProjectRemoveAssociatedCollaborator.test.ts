import type {ErrorResponse} from "@/types/responses";

import {AxiosError, AxiosHeaders, type AxiosResponse} from "axios";
import {describe, expect, it, vi} from "vitest";

import {patchProjectRemoveAssociatedCollaborator} from "@/services/project/patchProjectRemoveAssociatedCollaborator";
import {apiClient} from "@/helpers/client/axios";

// Mock the apiClient module
vi.mock("@/helpers/client/axios");

describe("patchProjectRemoveAssociatedCollaborator", () => {
  // Input data for the tests
  const input = {
    idFrom: 1,
    idTo: 2,
  } as const;
  const APIUrl = "/api/project/relations/collaborator/delete";

  it("should return a successful response when the request is correct", async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<null> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: null,
    };

    // Simulate a resolved promise for apiClient.patch
    vi.mocked(apiClient.patch).mockResolvedValueOnce(mockResponse);
    const response = await patchProjectRemoveAssociatedCollaborator(input);

    // Validate response and apiClient call
    expect(response).toEqual(mockResponse.data);
    expect(apiClient.patch).toHaveBeenCalledWith(APIUrl, input);
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

    // Simulate a rejected promise for apiClient.patch
    vi.mocked(apiClient.patch).mockRejectedValueOnce(mockError);

    try {
      await patchProjectRemoveAssociatedCollaborator(input);
    } catch (error) {
      // Validate error handling and apiClient call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.error);
      }
    }

    expect(apiClient.patch).toHaveBeenCalledWith(APIUrl, input);
  });
});
