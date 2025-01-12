import type {Collaborator} from "@prisma/client";

import {describe, it, expect, vi} from "vitest";
import axios, {AxiosHeaders, type AxiosResponse} from "axios";

import {TEST_COLLABORATOR_MOCK} from "./collaborator.mock";

import {postCollaborator} from "@/services/collaborator/postCollaborator";

// Mock the axios module
vi.mock("axios");

describe("postCollaborator", () => {
  // Input data for the tests
  const input = TEST_COLLABORATOR_MOCK;

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

    // Simulate a resolved promise for axios.post
    vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);
    const response = await postCollaborator(input);

    // Validate response and axios call
    expect(response).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith("/api/collaborator/create", input);
  });

  it("should handle errors correctly when the request fails", async () => {
    // Mock an error response
    const mockError = {
      response: {
        data: {
          success: false,
          message: "Error creating collaborator",
          error: "An test error occurred",
        },
      },
    };

    // Simulate a rejected promise for axios.post
    vi.mocked(axios.post).mockRejectedValueOnce(mockError);
    const response = await postCollaborator(input);

    // Validate error handling and axios call
    expect(response).toHaveProperty("success", false);
    expect(axios.post).toHaveBeenCalledWith("/api/collaborator/create", input);
  });
});
