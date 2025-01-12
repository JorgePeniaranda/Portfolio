import type {APIContext} from "astro";

import {describe, it, vi, expect, beforeEach, type Mock} from "vitest";
import {createContext} from "astro/middleware";

import {databaseClient} from "@/helpers/client/prisma";
import {BuildPaginationByURL} from "@/helpers/common/build-pagination";
import {GET} from "@/pages/api/collaborator/get/all.json";

vi.mock("@/helpers/client/prisma", () => ({
  databaseClient: {
    collaborator: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock("@/helpers/common/build-pagination", () => ({
  BuildPaginationByURL: vi.fn(),
}));

vi.mock("@/helpers/error/api-handler", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  },
}));

describe("GET /collaborator endpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a paginated list of stacks when parameters are valid", async () => {
    // Mock the pagination utility
    (BuildPaginationByURL as unknown as Mock).mockReturnValue({page: 1, size: 10});

    // Mock the database response
    const mockStacks = [
      {id: 1, name: "collaborator 1"},
      {id: 2, name: "collaborator 2"},
    ];

    (databaseClient.collaborator.findMany as unknown as Mock).mockResolvedValue(mockStacks);

    // Simulate a request
    const url = "https://example.com/api/stacks?page=1&size=10";
    const request: APIContext = createContext({
      request: new Request(url),
      defaultLocale: "en",
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toEqual(mockStacks);

    expect(BuildPaginationByURL).toHaveBeenCalledWith(url);
    expect(databaseClient.collaborator.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
    });
  });

  it("should return an empty list if no stacks are found", async () => {
    (BuildPaginationByURL as unknown as Mock).mockReturnValue({page: 1, limit: 10});
    (databaseClient.collaborator.findMany as unknown as Mock).mockResolvedValue([]);

    // Simulate a request
    const url = "https://example.com/api/stacks?page=1&size=10";
    const request: APIContext = createContext({
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
    (BuildPaginationByURL as unknown as Mock).mockImplementation(() => {
      throw new Error("Invalid URL");
    });

    // Simulate a request
    const url = "https://example.com/api/stacks?page=1&size=10";
    const request: APIContext = createContext({
      request: new Request(url),
      defaultLocale: "en",
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({error: "Invalid URL"});
  });
});
