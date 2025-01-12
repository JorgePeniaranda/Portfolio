import type {APIContext} from "astro";

import {describe, it, vi, expect, beforeEach, type Mock} from "vitest";
import {createContext} from "astro/middleware";

import {databaseClient} from "@/helpers/client/prisma";
import {GET, getStaticPaths} from "@/pages/api/stack/get/key/[key].json";

vi.mock("@/helpers/client/prisma", () => ({
  databaseClient: {
    stack: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

vi.mock("@/helpers/error/api-handler", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
    });
  },
}));

describe("GET /stack/key/[key] endpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a stack when parameters are valid", async () => {
    // Mock the database response
    const mockStack = {id: 1, key: "stack-1", name: "stack 1"};

    (databaseClient.stack.findUnique as unknown as Mock).mockResolvedValue(mockStack);

    // Simulate a request
    const url = "https://example.com/api/id/1";
    const request: APIContext = createContext({
      params: {key: "stack-1"},
      request: new Request(url),
      defaultLocale: "en",
      locals: {},
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toEqual(mockStack);

    expect(databaseClient.stack.findUnique).toHaveBeenCalled();
  });

  it("should return null if no stack are found", async () => {
    (databaseClient.stack.findUnique as unknown as Mock).mockResolvedValue([]);

    // Simulate a request
    const url = "https://example.com/api/key/stack-1";
    const request: APIContext = createContext({
      params: {key: "stack-1"},
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
    (databaseClient.stack.findUnique as unknown as Mock).mockRejectedValue(
      new Error("This is a test error"),
    );

    // Simulate a request
    const url = "https://example.com/api/key/stack-1";
    const request: APIContext = createContext({
      params: {key: "stack-1"},
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

describe("getStaticPaths", () => {
  it("should return a list of paths", async () => {
    const mockStacks = [{key: "1"}, {key: "2"}, {key: "3"}];

    (databaseClient.stack.findMany as unknown as Mock).mockResolvedValue(mockStacks);
    const paths = await getStaticPaths();

    expect(paths).toEqual(
      mockStacks.map((stack) => ({
        params: {key: stack.key.toString()},
      })),
    );
  });
});
