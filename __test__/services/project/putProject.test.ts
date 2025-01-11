import type {ApiResponse} from "@/types/responses";

import {describe, it, expect, vi} from "vitest";
import axios, {AxiosHeaders, type AxiosResponse} from "axios";

import {putProject} from "@/services/project/putProject";

// Mock the axios module
vi.mock("axios");

describe("putProject", () => {
  // Input data for the tests
  const input = {
    key: "TP",
    name: "Test Project",
    status: "IN_PROGRESS",
    stackCategory: "FULL_STACK",
    description: "This is a test project",
    contributions: "This is a test contribution",
    goals: "This is a test goal",
    logoUrl: "https://example.com/logo.png",
    primaryColor: "#000000",
    startDate: "2021-01-01",
  } as const;

  it("should return a successful response when the request is correct", async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<ApiResponse<unknown>> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: {
        success: true,
        message: "Project updated successfully",
        data: {
          id: "1",
          name: "John Doe",
        },
      },
    };

    // Simulate a resolved promise for axios.put
    vi.mocked(axios.put).mockResolvedValueOnce(mockResponse);
    const response = await putProject(input);

    // Validate response and axios call
    expect(response).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith("/api/project/update", input);
  });

  it("should handle errors correctly when the request fails", async () => {
    // Mock an error response
    const mockError = {
      response: {
        data: {
          success: false,
          message: "Error updating project",
          error: "An test error occurred",
        },
      },
    };

    // Simulate a rejected promise for axios.put
    vi.mocked(axios.put).mockRejectedValueOnce(mockError);
    const response = await putProject(input);

    // Validate error handling and axios call
    expect(response).toHaveProperty("success", false);
    expect(axios.put).toHaveBeenCalledWith("/api/project/update", input);
  });
});
