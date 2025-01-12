import type {APIContext} from "astro";

import {describe, it, vi, expect, beforeEach, type Mock} from "vitest";
import {createContext} from "astro/middleware";

import {databaseClient} from "@/helpers/client/prisma";
import {POST} from "@/pages/api/stack/delete";

vi.mock("@/helpers/client/prisma", () => ({
  databaseClient: {
    stack: {
      deleteMany: vi.fn(),
    },
  },
}));

vi.mock("@/helpers/error/api-handler", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  },
}));

describe("GET /stack/delete endpoint", () => {
  const input = [1, 2, 3];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a stack when parameters are valid", async () => {
    // Mock the database response
    const mockStack = {
      count: input.length,
    };

    (databaseClient.stack.deleteMany as unknown as Mock).mockResolvedValue(mockStack);

    // Simulate a request
    const url = "https://example.com/api/stack/delete";
    const request: APIContext = createContext({
      request: new Request(url, {
        method: "POST",
        body: JSON.stringify(input),
      }),
      defaultLocale: "en",
      locals: {},
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(databaseClient.stack.deleteMany).toHaveBeenCalled();
  });

  it("should return a 500 error if an exception occurs", async () => {
    (databaseClient.stack.deleteMany as unknown as Mock).mockRejectedValue(
      new Error("This is a test error"),
    );

    // Simulate a request
    const url = "https://example.com/api/stack/delete";
    const request: APIContext = createContext({
      request: new Request(url, {
        method: "POST",
        body: JSON.stringify(input),
      }),
      defaultLocale: "en",
      locals: {},
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({error: "This is a test error"});
  });
});
