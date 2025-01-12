import type {APIContext} from "astro";

import {describe, it, vi, expect, beforeEach, type Mock} from "vitest";
import {createContext} from "astro/middleware";
import {TEST_PROJECT_MOCK} from "__test__/services/project/project.mock";

import {databaseClient} from "@/helpers/client/prisma";
import {PUT} from "@/pages/api/project/update";
import {ProjectUpdateSchema} from "@/schemas/project/update";

vi.mock("@/helpers/client/prisma", () => ({
  databaseClient: {
    project: {
      update: vi.fn(),
    },
  },
}));

vi.mock("@/schemas/project/update", () => ({
  ProjectUpdateSchema: {
    parse: vi.fn(),
  },
}));

vi.mock("@/helpers/error/api-handler", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  },
}));

describe("GET /project/update endpoint", () => {
  const input = {
    ...TEST_PROJECT_MOCK,
    startDate: TEST_PROJECT_MOCK.startDate.toISOString(),
    endDate: TEST_PROJECT_MOCK.endDate?.toISOString(),
    updatedAt: TEST_PROJECT_MOCK.updatedAt.toISOString(),
    createdAt: TEST_PROJECT_MOCK.createdAt.toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a project when parameters are valid", async () => {
    // Mock the database response
    const mockProject = TEST_PROJECT_MOCK;

    (databaseClient.project.update as unknown as Mock).mockResolvedValue(mockProject);
    (ProjectUpdateSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = "https://example.com/api/project/update";
    const request: APIContext = createContext({
      request: new Request(url, {
        method: "PUT",
        body: JSON.stringify(input),
      }),
      defaultLocale: "en",
      locals: {},
    });

    const response = await PUT(request);

    expect(response.status).toBe(200);
    expect(databaseClient.project.update).toHaveBeenCalled();
    expect(ProjectUpdateSchema.parse).toHaveBeenCalledWith(input);
  });

  it("should return a 500 error if an exception occurs", async () => {
    (databaseClient.project.update as unknown as Mock).mockRejectedValue(
      new Error("This is a test error"),
    );
    (ProjectUpdateSchema.parse as unknown as Mock).mockResolvedValue(input);

    // Simulate a request
    const url = "https://example.com/api/project/update";
    const request: APIContext = createContext({
      request: new Request(url, {
        method: "PUT",
        body: JSON.stringify(input),
      }),
      defaultLocale: "en",
      locals: {},
    });

    const response = await PUT(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();

    expect(responseBody).toEqual({error: "This is a test error"});
    expect(ProjectUpdateSchema.parse).toHaveBeenCalledWith(input);
  });
});
