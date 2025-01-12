import type {ErrorResponse} from "@/types/responses";

import {describe, it, expect, vi} from "vitest";
import axios, {AxiosError, AxiosHeaders, type AxiosResponse} from "axios";

import {patchProjectRemoveAssociatedStack} from "@/services/project/patchProjectRemoveAssociatedStack";

// Mock the axios module
vi.mock("axios");

describe("patchProjectRemoveAssociatedStack", () => {
  // Input data for the tests
  const input = {
    idFrom: 1,
    idTo: 2,
  } as const;

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

    // Simulate a resolved promise for axios.patch
    vi.mocked(axios.patch).mockResolvedValueOnce(mockResponse);
    const response = await patchProjectRemoveAssociatedStack(input);

    // Validate response and axios call
    expect(response).toEqual(mockResponse.data);
    expect(axios.patch).toHaveBeenCalledWith("/api/project/relations/stack/delete", input);
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

    // Simulate a rejected promise for axios.patch
    vi.mocked(axios.patch).mockRejectedValueOnce(mockError);

    try {
      await patchProjectRemoveAssociatedStack(input);
    } catch (error) {
      // Validate error handling and axios call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.error);
      }
    }

    expect(axios.patch).toHaveBeenCalledWith("/api/project/relations/stack/delete", input);
  });
});
