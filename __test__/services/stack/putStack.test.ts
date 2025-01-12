import type {Stack} from "@prisma/client";

import axios, {AxiosHeaders, type AxiosResponse} from "axios";
import {describe, expect, it, vi} from "vitest";

import {TEST_STACK_MOCK} from "./stack.mock";

import {putStack} from "@/services/stack/putStack";

// Mock the axios module
vi.mock("axios");

describe("putStack", () => {
  // Input data for the tests
  const input = TEST_STACK_MOCK;

  it("should return a successful response when the request is correct", async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<Stack> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: TEST_STACK_MOCK,
    };

    // Simulate a resolved promise for axios.put
    vi.mocked(axios.put).mockResolvedValueOnce(mockResponse);
    const response = await putStack(input);

    // Validate response and axios call
    expect(response).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith("/api/stack/update", input);
  });

  it("should handle errors correctly when the request fails", async () => {
    // Mock an error response
    const mockError = {
      response: {
        data: {
          success: false,
          message: "Error updating stack",
          error: "An test error occurred",
        },
      },
    };

    // Simulate a rejected promise for axios.put
    vi.mocked(axios.put).mockRejectedValueOnce(mockError);
    const response = await putStack(input);

    // Validate error handling and axios call
    expect(response).toHaveProperty("success", false);
    expect(axios.put).toHaveBeenCalledWith("/api/stack/update", input);
  });
});
