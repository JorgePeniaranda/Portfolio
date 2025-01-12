import type {APIContext} from "astro";

import {describe, it, vi, expect, beforeEach, type Mock} from "vitest";
import {createContext} from "astro/middleware";

import {databaseClient} from "@/helpers/client/prisma";
import {BuildPaginationByURL} from "@/helpers/common/build-pagination";
import {GET} from "@/pages/api/project/get/min/all.json";

vi.mock("@/helpers/client/prisma", () => ({
  databaseClient: {
    project: {
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
    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
    });
  },
}));

describe("GET /project/min/all endpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a paginated list of Projects when parameters are valid", async () => {
    // Mock the pagination utility
    (BuildPaginationByURL as unknown as Mock).mockReturnValue({
      page: 1,
      size: 10,
    });

    // Mock the database response
    const mockProjects = [
      {id: 1, name: "project 1"},
      {id: 2, name: "project 2"},
    ];

    (databaseClient.project.findMany as unknown as Mock).mockResolvedValue(mockProjects);

    // Simulate a request
    const url = "https://example.com/api/project/min/all";
    const request: APIContext = createContext({
      request: new Request(url),
      defaultLocale: "en",
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toEqual(mockProjects);

    expect(BuildPaginationByURL).toHaveBeenCalledWith(url);
    expect(databaseClient.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 0,
        take: 10,
      }),
    );
  });

  it("should return an empty list if no Projects are found", async () => {
    (BuildPaginationByURL as unknown as Mock).mockReturnValue({
      page: 1,
      limit: 10,
    });
    (databaseClient.project.findMany as unknown as Mock).mockResolvedValue([]);

    // Simulate a request
    const url = "https://example.com/api/project/min/all";
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
    const url = "https://example.com/api/project/min/all";
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
