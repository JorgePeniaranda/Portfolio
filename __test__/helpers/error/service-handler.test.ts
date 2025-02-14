import { describe, it, expect, vi, afterEach, type Mock } from 'vitest';
import axios from 'axios';

import { handleServiceError } from '@/helpers/error/service-handler';
import { devConsoleLog } from '@/helpers/common/dev-console-log';
import { isDefined, isNotDefined } from '@/helpers/guards/is-defined';
import { isErrorResponse } from '@/helpers/guards/is-error-response';

vi.mock('axios', () => ({
  default: {
    isAxiosError: vi.fn(),
  },
}));

vi.mock('@/helpers/common/dev-console-log', () => ({
  devConsoleLog: {
    log: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/helpers/guards/is-defined', () => ({
  isDefined: vi.fn(),
  isNotDefined: vi.fn(),
}));

vi.mock('@/helpers/guards/is-error-response', () => ({
  isErrorResponse: vi.fn(),
}));

describe('handleServiceError', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return a default error message for non-Axios errors', () => {
    const mockError = { message: 'Not an Axios error' };

    (axios.isAxiosError as unknown as Mock).mockReturnValue(false);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(devConsoleLog.log).toHaveBeenCalledWith('Error in service: ', mockError);
    expect(result).toEqual(new Error('An error occurred.'));
  });

  it('should return a default error message if Axios error has no response', () => {
    const mockError = { isAxiosError: true, response: undefined };

    (axios.isAxiosError as unknown as Mock).mockReturnValue(true);
    (isNotDefined as unknown as Mock).mockReturnValue(true);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(devConsoleLog.log).toHaveBeenCalledWith('Error in service: ', mockError);
    expect(result).toEqual(new Error('An error occurred.'));
  });

  it('should return a default error message if response data is not an error response', () => {
    const mockError = {
      isAxiosError: true,
      response: { data: 'Invalid response' },
    };

    (axios.isAxiosError as unknown as Mock).mockReturnValue(true);
    (isNotDefined as unknown as Mock).mockReturnValue(false);
    (isErrorResponse as unknown as Mock).mockReturnValue(false);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(devConsoleLog.log).toHaveBeenCalledWith('Error in service: ', mockError);
    expect(result).toEqual(new Error('An error occurred.'));
  });

  it('should return the `title` property if defined in the response', () => {
    const mockError = {
      isAxiosError: true,
      response: { data: { title: 'Specific error message' } },
    };

    (axios.isAxiosError as unknown as Mock).mockReturnValue(true);
    (isNotDefined as unknown as Mock).mockReturnValue(false);
    (isErrorResponse as unknown as Mock).mockReturnValue(true);
    (isDefined as unknown as Mock).mockImplementation((value) => value !== undefined);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(devConsoleLog.log).toHaveBeenCalledWith('Error in service: ', mockError);
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

    (axios.isAxiosError as unknown as Mock).mockReturnValue(true);
    (isNotDefined as unknown as Mock).mockReturnValue(false);
    (isErrorResponse as unknown as Mock).mockReturnValue(true);
    (isDefined as unknown as Mock).mockImplementation((value) => value !== undefined);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(devConsoleLog.log).toHaveBeenCalledWith('Error in service: ', mockError);
    expect(result).toEqual(new Error('email: Invalid email\npassword: Password too short'));
  });

  it('should return a default error message if no `title` or `fieldErrors` are defined', () => {
    const mockError = { isAxiosError: true, response: { data: {} } };

    (axios.isAxiosError as unknown as Mock).mockReturnValue(true);
    (isNotDefined as unknown as Mock).mockReturnValue(false);
    (isErrorResponse as unknown as Mock).mockReturnValue(true);
    (isDefined as unknown as Mock).mockReturnValue(false);

    const result = handleServiceError({
      error: mockError,
      defaultErrorMessage: 'An error occurred.',
    });

    expect(devConsoleLog.log).toHaveBeenCalledWith('Error in service: ', mockError);
    expect(result).toEqual(new Error('An error occurred.'));
  });
});
