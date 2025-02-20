import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { handleServiceError } from '@/helpers/error/service-handler';
import { isDefined, isNotDefined } from '@/helpers/guards/is-defined';
import { isErrorResponse } from '@/helpers/guards/is-error-response';

vi.mock('@/helpers/guards/is-defined', () => ({
  isDefined: vi.fn(),
  isNotDefined: vi.fn(),
}));

vi.mock('@/helpers/guards/is-error-response', () => ({
  isErrorResponse: vi.fn(),
}));

describe('handleServiceError', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should return a default error message for non-Axios errors', () => {
    const mockError = { message: 'Not an Axios error' };

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(result).toEqual(new Error('An error occurred.'));
  });

  it('should return a default error message if Axios error has no response', () => {
    const mockError = { isAxiosError: true, response: undefined };

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    vi.mocked(isNotDefined).mockReturnValue(true);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(result).toEqual(new Error('An error occurred.'));
  });

  it('should return a default error message if response data is not an error response', () => {
    const mockError = {
      isAxiosError: true,
      response: { data: 'Invalid response' },
    };

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    vi.mocked(isNotDefined).mockReturnValue(false);
    vi.mocked(isErrorResponse).mockReturnValue(false);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(result).toEqual(new Error('An error occurred.'));
  });

  it('should return the `title` property if defined in the response', () => {
    const mockError = {
      isAxiosError: true,
      response: { data: { title: 'Specific error message' } },
    };

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    vi.mocked(isNotDefined).mockReturnValue(false);
    vi.mocked(isErrorResponse).mockReturnValue(true);
    vi.mocked(isDefined).mockImplementation((value) => value !== undefined);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(result).toEqual(new Error('Specific error message'));
  });

  it('should return concatenated `fieldErrors` if defined in the response', () => {
    const mockError = {
      isAxiosError: true,
      response: {
        data: {
          fieldErrors: [
            { field: 'email', message: 'Invalid email' },
            { field: 'password', message: 'Password too short' },
          ],
        },
      },
    };

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    vi.mocked(isNotDefined).mockReturnValue(false);
    vi.mocked(isErrorResponse).mockReturnValue(true);
    vi.mocked(isDefined).mockImplementation((value) => value !== undefined);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(result).toEqual(new Error('email: Invalid email\npassword: Password too short'));
  });

  it('should return a default error message if no `title` or `fieldErrors` are defined', () => {
    const mockError = { isAxiosError: true, response: { data: {} } };

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    vi.mocked(isNotDefined).mockReturnValue(false);
    vi.mocked(isErrorResponse).mockReturnValue(true);
    vi.mocked(isDefined).mockReturnValue(false);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(result).toEqual(new Error('An error occurred.'));
  });
});
