import type {Collaborator} from "@prisma/client";

import axios, {AxiosHeaders, type AxiosResponse} from "axios";
import {describe, expect, it, vi} from "vitest";

import {TEST_COLLABORATOR_MOCK} from "./collaborator.mock";

import {putCollaborator} from "@/services/collaborator/putCollaborator";

// Mock the axios module
vi.mock("axios");

describe("putCollaborator", () => {
  // Input data for the tests
  const input = {
    nickname: "John Doe",
  } as const;

  it("should return a successful response when the request is correct", async () => {
    // Mock a successful response
    const mockResponse: AxiosResponse<Collaborator> = {
      config: {
        headers: new AxiosHeaders(),
      },
      headers: {},
      status: 200,
      statusText: "OK",
      data: TEST_COLLABORATOR_MOCK,
    };

    // Simulate a resolved promise for axios.put
    vi.mocked(axios.put).mockResolvedValueOnce(mockResponse);
    const response = await putCollaborator(input);

    // Validate response and axios call
    expect(response).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith("/api/collaborator/update", input);
  });

  it("should handle errors correctly when the request fails", async () => {
    // Mock an error response
    const mockError = {
      response: {
        data: {
          success: false,
          message: "Error updating collaborator",
          error: "An test error occurred",
        },
      },
    };

    // Simulate a rejected promise for axios.put
    vi.mocked(axios.put).mockRejectedValueOnce(mockError);
    const response = await putCollaborator(input);

    // Validate error handling and axios call
    expect(response).toHaveProperty("success", false);
    expect(axios.put).toHaveBeenCalledWith("/api/collaborator/update", input);
  });
});
