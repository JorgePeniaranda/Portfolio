import { describe, it, expect, vi, afterEach, type Mock } from 'vitest';

import { isErrorResponse } from '@/helpers/guards/is-error-response';
import { isNotDefined } from '@/helpers/guards/is-defined';

vi.mock('@/helpers/guards/is-defined', () => ({
  isNotDefined: vi.fn(),
}));

describe('isErrorResponse', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return false for non-object types', () => {
    const mockError = 'This is a string error';

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it('should return false if error is undefined or null', () => {
    const mockError = undefined;

    (isNotDefined as unknown as Mock).mockReturnValue(true);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return true if error has a valid 'type' property", () => {
    const mockError = { type: 'validation_error' };

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });

  it("should return true if error has a valid 'title' property", () => {
    const mockError = { title: 'Invalid request' };

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });

  it("should return true if error has a valid 'status' property", () => {
    const mockError = { status: '400' };

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });

  it("should return false if 'type', 'title', and 'status' are missing", () => {
    const mockError = { message: 'Some error message' };

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return false if 'type' is not a string", () => {
    const mockError = { type: 123 };

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return false if 'title' is not a string", () => {
    const mockError = { title: 404 };

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return false if 'status' is not a string", () => {
    const mockError = { status: 500 };

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return true if at least one of 'type', 'title', or 'status' is valid", () => {
    const mockError = { type: 'server_error', status: 500 };

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });

  it("should return true if all 'type', 'title', and 'status' properties are valid", () => {
    const mockError = {
      type: 'server_error',
      title: 'Internal Server Error',
      status: '500',
    };

    (isNotDefined as unknown as Mock).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });
});
