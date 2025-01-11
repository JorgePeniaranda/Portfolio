import type {ApiResponse} from "@/types/responses";

import {describe, it, expect, vi} from "vitest";
import axios, {AxiosHeaders, type AxiosResponse} from "axios";

import {patchProjectAddAssociatedCollaborator} from "@/services/project/patchProjectAddAssociatedCollaborator";

// Mock the axios module
vi.mock("axios");

describe("patchProjectAddAssociatedCollaborator", () => {
  // Input data for the tests
  const input = {
    idFrom: 1,
    idTo: 2,
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

    // Simulate a resolved promise for axios.patch
    vi.mocked(axios.patch).mockResolvedValueOnce(mockResponse);
    const response = await patchProjectAddAssociatedCollaborator(input);

    // Validate response and axios call
    expect(response).toEqual(mockResponse.data);
    expect(axios.patch).toHaveBeenCalledWith("/api/project/relations/collaborator/add", input);
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

    // Simulate a rejected promise for axios.patch
    vi.mocked(axios.patch).mockRejectedValueOnce(mockError);
    const response = await patchProjectAddAssociatedCollaborator(input);

    // Validate error handling and axios call
    expect(response).toHaveProperty("success", false);
    expect(axios.patch).toHaveBeenCalledWith("/api/project/relations/collaborator/add", input);
  });
});
