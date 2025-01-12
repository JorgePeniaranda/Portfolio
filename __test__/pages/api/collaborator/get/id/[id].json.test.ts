import type {APIContext} from "astro";

import {describe, it, vi, expect, beforeEach, type Mock} from "vitest";
import {createContext} from "astro/middleware";

import {databaseClient} from "@/helpers/client/prisma";
import {GET} from "@/pages/api/collaborator/get/id/[id].json";

vi.mock("@/helpers/client/prisma", () => ({
  databaseClient: {
    collaborator: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("@/helpers/error/api-handler", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  },
}));

describe("GET /collaborator/id/[id] endpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a collaborator when parameters are valid", async () => {
    // Mock the database response
    const mockStack = {id: 1, name: "collaborator 1"};

    (databaseClient.collaborator.findUnique as unknown as Mock).mockResolvedValue(mockStack);

    // Simulate a request
    const url = "https://example.com/api/collaborator/id/1";
    const request: APIContext = createContext({
      params: {id: "1"},
      request: new Request(url),
      defaultLocale: "en",
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toEqual(mockStack);

    expect(databaseClient.collaborator.findUnique).toHaveBeenCalled();
  });

  it("should return null if no collaborator are found", async () => {
    (databaseClient.collaborator.findUnique as unknown as Mock).mockResolvedValue([]);

    // Simulate a request
    const url = "https://example.com/api/collaborator/id/1";
    const request: APIContext = createContext({
      params: {id: "1"},
      request: new Request(url),
      defaultLocale: "en",
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toEqual([]);
  });

  it("should return a 500 error if an exception occurs", async () => {
    (databaseClient.collaborator.findUnique as unknown as Mock).mockRejectedValue(
      new Error("This is a test error"),
    );

    // Simulate a request
    const url = "https://example.com/api/stacks?page=1&size=10";
    const request: APIContext = createContext({
      params: {id: "1"},
      request: new Request(url),
      defaultLocale: "en",
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({error: "This is a test error"});
  });
});
