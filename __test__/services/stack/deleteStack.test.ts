import type {DeleteResponse, ErrorResponse} from "@/types/responses";

import {AxiosError, AxiosHeaders, type AxiosResponse} from "axios";
import {describe, expect, it, vi} from "vitest";

import {apiClient} from "@/helpers/client/axios";
import {deleteStack} from "@/services/stack/deleteStack";

// Mock the apiClient module
vi.mock("@/helpers/client/axios");

describe("deleteStack", () => {
  // Input data for the tests
  const input = [0, 1];
  const APIUrl = "/api/stack/delete";

  it("should return a successful response when the request is correct", async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<DeleteResponse> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: {
        count: input.length,
      },
    };

    // Simulate a resolved promise for apiClient.post
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);
    const response = await deleteStack(input);

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
      await deleteStack(input);
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
