import type {Collaborator} from "@prisma/client";
import type {ErrorResponse} from "@/types/responses";

import {describe, it, expect, vi} from "vitest";
import axios, {AxiosError, AxiosHeaders, type AxiosResponse} from "axios";

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

    // Simulate a rejected promise for axios.post
    vi.mocked(axios.post).mockRejectedValueOnce(mockError);

    try {
      await postCollaborator(input);
    } catch (error) {
      // Validate error handling and axios call
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe(mockError.response?.data.error);
      }
    }

    expect(axios.post).toHaveBeenCalledWith("/api/collaborator/create", input);
  });
});
