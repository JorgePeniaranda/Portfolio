import {describe, it, expect, vi, afterEach, type Mock} from "vitest";

import {isErrorResponse} from "@/helpers/guards/is-error-response";
import {isNotDefined} from "@/helpers/guards/is-defined";

vi.mock("@/helpers/guards/is-defined", () => ({
  isNotDefined: vi.fn(),
}));

describe("isErrorResponse", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return false for non-object types", () => {
    const mockError = "This is a string error";

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return false if error is undefined or null", () => {
    const mockError = undefined;

    (isNotDefined as unknown as Mock).mockReturnValue(true);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return true if error has a string 'error' property", () => {
    const mockError = {error: "Some error occurred"};

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });

  it("should return true if error has an 'errors' array of strings", () => {
    const mockError = {errors: ["Error 1", "Error 2"]};

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });

  it("should return false if error has 'errors' but they are not strings", () => {
    const mockError = {errors: [1, 2, 3]};

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return false if error does not have 'error' or 'errors' properties", () => {
    const mockError = {message: "Some other error"};

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return false if 'error' is not a string", () => {
    const mockError = {error: 123};

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return true if both 'error' and 'errors' are valid properties", () => {
    const mockError = {error: "Some error occurred", errors: ["Error 1"]};

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });
});
