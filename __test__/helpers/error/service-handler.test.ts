import type {ApiResponse} from "@/types/responses";

import {describe, it, expect, vi} from "vitest";

import {serviceErrorHandler} from "@/helpers/error/service-handler";

vi.mock("axios", async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await importOriginal();

  return {
    ...actual,
    isAxiosError: (error: unknown) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Boolean(error && typeof error === "object" && (error as any).isAxiosError),
  };
});

describe("serviceErrorHandler", () => {
  it("should return the error message from Axios response if it's an Axios error with a response", () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        status: 404,
        data: {
          success: false,
          message: "Resource not found",
          error: "Resource not found",
        } satisfies ApiResponse,
      },
    };
    const result = serviceErrorHandler(axiosError);

    expect(result).toBe("Resource not found");
  });

  it("should return the error message from a generic Error object", () => {
    const genericError = new Error("Something went wrong");
    const result = serviceErrorHandler(genericError);

    expect(result).toBe("Something went wrong");
  });

  it("should return a default error message for unknown errors", () => {
    const unknownError = {someProperty: "unexpected value"};
    const result = serviceErrorHandler(unknownError);

    expect(result).toBe("Ha ocurrido un error inesperado");
  });

  it("should return a default error message for undefined errors", () => {
    const result = serviceErrorHandler(undefined);

    expect(result).toBe("Ha ocurrido un error inesperado");
  });

  it("should return a default error message for null errors", () => {
    const result = serviceErrorHandler(null);

    expect(result).toBe("Ha ocurrido un error inesperado");
  });
});
