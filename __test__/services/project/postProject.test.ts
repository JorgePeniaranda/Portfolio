import {describe, it, expect, vi} from "vitest";
import axios, {AxiosHeaders, type AxiosResponse} from "axios";

import {TEST_PROJECT_MOCK} from "./project.mock";

import {postProject} from "@/services/project/postProject";

// Mock the axios module
vi.mock("axios");

describe("postProject", () => {
  // Input data for the tests
  const input = TEST_PROJECT_MOCK;

  it("should return a successful response when the request is correct", async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<unknown> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: TEST_PROJECT_MOCK,
    };

    // Simulate a resolved promise for axios.post
    vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);
    const response = await postProject(input);

    // Validate response and axios call
    expect(response).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith("/api/project/create", input);
  });

  it("should handle errors correctly when the request fails", async () => {
    // Mock an error response
    const mockError = {
      response: {
        data: {
          success: false,
          message: "Error creating project",
          error: "An test error occurred",
        },
      },
    };

    // Simulate a rejected promise for axios.post
    vi.mocked(axios.post).mockRejectedValueOnce(mockError);
    const response = await postProject(input);

    // Validate error handling and axios call
    expect(response).toHaveProperty("success", false);
    expect(axios.post).toHaveBeenCalledWith("/api/project/create", input);
  });
});
