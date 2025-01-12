import type {DeleteResponse} from "@/types/responses";

import axios, {AxiosHeaders, type AxiosResponse} from "axios";
import {describe, expect, it, vi} from "vitest";

import {deleteStack} from "@/services/stack/deleteStack";

// Mock the axios module
vi.mock("axios");

describe("deleteStack", () => {
  // Input data for the tests
  const input = [0, 1];

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

    // Simulate a resolved promise for axios.post
    vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);
    const response = await deleteStack(input);

    // Validate response and axios call
    expect(response).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith("/api/stack/delete", input);
  });

  it("should handle errors correctly when the request fails", async () => {
    // Mock an error response
    const mockError = {
      response: {
        data: {
          success: false,
          message: "Error deleting stack",
          error: "An test error occurred",
        },
      },
    };

    // Simulate a rejected promise for axios.post
    vi.mocked(axios.post).mockRejectedValueOnce(mockError);
    const response = await deleteStack(input);

    // Validate error handling and axios call
    expect(response).toHaveProperty("success", false);
    expect(axios.post).toHaveBeenCalledWith("/api/stack/delete", input);
  });
});
