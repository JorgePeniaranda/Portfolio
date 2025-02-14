import { beforeEach, describe, expect, it, vi } from 'vitest';

import { isNotDefined } from '@/helpers/guards/is-defined';
import { isErrorResponse } from '@/helpers/guards/is-error-response';

vi.mock('@/helpers/guards/is-defined', () => ({
  isNotDefined: vi.fn(),
}));

describe('isErrorResponse', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should return false for non-object types', () => {
    const mockError = 'This is a string error';

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it('should return false if error is undefined or null', () => {
    const mockError = undefined;

    vi.mocked(isNotDefined).mockReturnValue(true);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return true if error has a valid 'type' property", () => {
    const mockError = { type: 'validation_error' };

    vi.mocked(isNotDefined).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });

  it("should return true if error has a valid 'title' property", () => {
    const mockError = { title: 'Invalid request' };

    vi.mocked(isNotDefined).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });

  it("should return true if error has a valid 'status' property", () => {
    const mockError = { status: '400' };

    vi.mocked(isNotDefined).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });

  it("should return false if 'type', 'title', and 'status' are missing", () => {
    const mockError = { message: 'Some error message' };

    vi.mocked(isNotDefined).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return false if 'type' is not a string", () => {
    const mockError = { type: 123 };

    vi.mocked(isNotDefined).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return false if 'title' is not a string", () => {
    const mockError = { title: 404 };

    vi.mocked(isNotDefined).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return false if 'status' is not a string", () => {
    const mockError = { status: 500 };

    vi.mocked(isNotDefined).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(false);
  });

  it("should return true if at least one of 'type', 'title', or 'status' is valid", () => {
    const mockError = { type: 'server_error', status: 500 };

    vi.mocked(isNotDefined).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });

  it("should return true if all 'type', 'title', and 'status' properties are valid", () => {
    const mockError = {
      type: 'server_error',
      title: 'Internal Server Error',
      status: '500',
    };

    vi.mocked(isNotDefined).mockReturnValue(false);

    const result = isErrorResponse(mockError);

    expect(result).toBe(true);
  });
});
