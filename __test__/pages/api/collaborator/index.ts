import type {APIContext} from "astro";

import {describe, it, vi, expect, beforeEach, type Mock} from "vitest";
import {createContext} from "astro/middleware";
import {TEST_COLLABORATOR_MOCK} from "__test__/__mock__/collaborator.mock";

import {databaseClient} from "@/helpers/client/prisma";
import {BuildPaginationByURL} from "@/helpers/common/build-pagination";
import {GET, POST, DELETE} from "@/pages/api/collaborator.json";
import {CollaboratorCreateSchema} from "@/schemas/collaborator/create";

vi.mock("@/schemas/collaborator/create", () => ({
  CollaboratorCreateSchema: {
    parse: vi.fn(),
  },
}));

vi.mock("@/helpers/client/prisma", () => ({
  databaseClient: {
    collaborator: {
      create: vi.fn(),
      findMany: vi.fn(),
      deleteMany: vi.fn(),
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

describe("GET /collaborator endpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a paginated list of stacks when parameters are valid", async () => {
    // Mock the pagination utility
    (BuildPaginationByURL as unknown as Mock).mockReturnValue({
      page: 1,
      size: 10,
    });

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
    (BuildPaginationByURL as unknown as Mock).mockReturnValue({
      page: 1,
      limit: 10,
    });
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

describe("DELETE /collaborator endpoint", () => {
  const input = [1, 2, 3];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a collaborator when parameters are valid", async () => {
    // Mock the database response
    const mockCollaborator = {
      count: input.length,
    };

    (databaseClient.collaborator.deleteMany as unknown as Mock).mockResolvedValue(mockCollaborator);

    // Simulate a request
    const url = "https://example.com/api/collaborator/delete";
    const request: APIContext = createContext({
      request: new Request(url, {
        method: "DELETE",
        body: JSON.stringify(input),
      }),
      defaultLocale: "en",
      locals: {},
    });

    const response = await DELETE(request);

    expect(response.status).toBe(200);
    expect(databaseClient.collaborator.deleteMany).toHaveBeenCalled();
  });

  it("should return a 500 error if an exception occurs", async () => {
    (databaseClient.collaborator.deleteMany as unknown as Mock).mockRejectedValue(
      new Error("This is a test error"),
    );

    // Simulate a request
    const url = "https://example.com/api/collaborator/delete";
    const request: APIContext = createContext({
      request: new Request(url, {
        method: "DELETE",
        body: JSON.stringify(input),
      }),
      defaultLocale: "en",
      locals: {},
    });

    const response = await DELETE(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({error: "This is a test error"});
  });
});

describe("GET /collaborator/create endpoint", () => {
  const input = {
    ...TEST_COLLABORATOR_MOCK,
    updatedAt: TEST_COLLABORATOR_MOCK.updatedAt.toISOString(),
    createdAt: TEST_COLLABORATOR_MOCK.createdAt.toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a collaborator when parameters are valid", async () => {
    // Mock the database response
    const mockCollaborator = TEST_COLLABORATOR_MOCK;

    (databaseClient.collaborator.create as unknown as Mock).mockResolvedValue(mockCollaborator);
    (CollaboratorCreateSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = "https://example.com/api/collaborator/delete";
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
    expect(databaseClient.collaborator.create).toHaveBeenCalled();
    expect(CollaboratorCreateSchema.parse).toHaveBeenCalledWith(input);
  });

  it("should return a 500 error if an exception occurs", async () => {
    (databaseClient.collaborator.create as unknown as Mock).mockRejectedValue(
      new Error("This is a test error"),
    );
    (CollaboratorCreateSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = "https://example.com/api/collaborator/delete";
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
    expect(CollaboratorCreateSchema.parse).toHaveBeenCalledWith(input);
  });
});
