import type {ApiResponse} from "@/types/responses";

import {describe, it, expect, vi} from "vitest";
import axios, {AxiosError, AxiosHeaders, type AxiosResponse} from "axios";

import {postStack} from "@/services/stack/postStack";

const APIUrl = "/api/stack/create";

// Mock the axios module
vi.mock("axios");

describe("postStack", () => {
  // Input data for the tests
  const input = {
    name: "John Doe",
  } as const;

  it("should return a successful response when the request is correct", async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<ApiResponse<unknown>> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 201,
      statusText: "OK",
      data: {
        success: true,
        message: "Stack created successfully",
        data: {
          id: "1",
          name: "John Doe",
        },
      },
    };

    // Simulate a resolved promise for axios.post
    vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);
    const response = await postStack(input);

    // Validate response and axios call
    expect(response).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(APIUrl, input);
  });

  it("should handle errors correctly when the request fails", async () => {
    // Mock an error response
    const mockError = {
      response: {
        data: {
          success: false,
        },
      },
    };

    // Simulate a rejected promise for axios.post
    vi.mocked(axios.post).mockRejectedValueOnce(mockError);
    const response = await postStack(input);

    // Validate error handling and axios call
    expect(response).toHaveProperty("success", false);
    expect(axios.post).toHaveBeenCalledWith(APIUrl, input);
  });
});
