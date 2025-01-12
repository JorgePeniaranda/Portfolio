import type {APIContext} from "astro";

import {describe, it, vi, expect, beforeEach, type Mock} from "vitest";
import {createContext} from "astro/middleware";

import {databaseClient} from "@/helpers/client/prisma";
import {PATCH} from "@/pages/api/collaborator/relations/project/add";
import {RelationshipsSchema} from "@/schemas/common/relationships";

vi.mock("@/helpers/client/prisma", () => ({
  databaseClient: {
    collaborator: {
      update: vi.fn(),
    },
  },
}));

vi.mock("@/schemas/common/relationships", () => ({
  RelationshipsSchema: {
    parse: vi.fn(),
  },
}));

vi.mock("@/helpers/error/api-handler", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  },
}));

describe("GET /collaborator/relations/project/add endpoint", () => {
  const input = {idFrom: 1, idTo: 2};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a collaborator when parameters are valid", async () => {
    // Mock the database response
    const mockStack = {id: 1, name: "collaborator 1"};

    (databaseClient.collaborator.update as unknown as Mock).mockResolvedValue(mockStack);
    (RelationshipsSchema.parse as unknown as Mock).mockResolvedValue({
      idFrom: 1,
      idTo: 2,
    });

    // Simulate a request
    const url = "https://example.com/api/id/collaborator/relations/project/add";
    const request: APIContext = createContext({
      request: new Request(url, {
        method: "PATCH",
        body: JSON.stringify(input),
      }),
      defaultLocale: "en",
      locals: {},
    });

    const response = await PATCH(request);

    expect(response.status).toBe(204);
    expect(databaseClient.collaborator.update).toHaveBeenCalled();
    expect(RelationshipsSchema.parse).toHaveBeenCalledWith(input);
  });

  it("should return a 500 error if an exception occurs", async () => {
    (databaseClient.collaborator.update as unknown as Mock).mockRejectedValue(
      new Error("This is a test error"),
    );
    (RelationshipsSchema.parse as unknown as Mock).mockResolvedValue({
      idFrom: 1,
      idTo: 2,
    });

    // Simulate a request
    const url = "https://example.com/api/id/collaborator/relations/project/add";
    const request: APIContext = createContext({
      request: new Request(url, {
        method: "PATCH",
        body: JSON.stringify(input),
      }),
      defaultLocale: "en",
      locals: {},
    });

    const response = await PATCH(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({error: "This is a test error"});
    expect(RelationshipsSchema.parse).toHaveBeenCalledWith(input);
  });
});
