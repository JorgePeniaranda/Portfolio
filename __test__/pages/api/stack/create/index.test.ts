import type {APIContext} from "astro";

import {describe, it, vi, expect, beforeEach, type Mock} from "vitest";
import {createContext} from "astro/middleware";
import {TEST_STACK_MOCK} from "__test__/services/stack/stack.mock";

import {databaseClient} from "@/helpers/client/prisma";
import {POST} from "@/pages/api/stack/create";
import {StackCreateSchema} from "@/schemas/stack/create";

vi.mock("@/helpers/client/prisma", () => ({
  databaseClient: {
    stack: {
      create: vi.fn(),
    },
  },
}));

vi.mock("@/schemas/stack/create", () => ({
  StackCreateSchema: {
    parse: vi.fn(),
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

describe("GET /stack/create endpoint", () => {
  const input = {
    ...TEST_STACK_MOCK,
    updatedAt: TEST_STACK_MOCK.updatedAt.toISOString(),
    createdAt: TEST_STACK_MOCK.createdAt.toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a stack when parameters are valid", async () => {
    // Mock the database response
    const mockStack = TEST_STACK_MOCK;

    (databaseClient.stack.create as unknown as Mock).mockResolvedValue(mockStack);
    (StackCreateSchema.parse as unknown as Mock).mockResolvedValue(input);

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

    expect(response.status).toBe(201);
    expect(databaseClient.stack.create).toHaveBeenCalled();
    expect(StackCreateSchema.parse).toHaveBeenCalledWith(input);
  });

  it("should return a 500 error if an exception occurs", async () => {
    (databaseClient.stack.create as unknown as Mock).mockRejectedValue(
      new Error("This is a test error"),
    );
    (StackCreateSchema.parse as unknown as Mock).mockResolvedValue(input);

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
    expect(StackCreateSchema.parse).toHaveBeenCalledWith(input);
  });
});
