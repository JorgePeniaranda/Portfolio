import { beforeEach, describe, expect, it, vi } from 'vitest';

import { devConsoleLog, logMessage } from '@/helpers/common/dev-console-log';

describe('logMessage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("should log messages to the console in development environment for 'log' type", () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    process.env.NODE_ENV = 'development';
    const inputMessage = ['This is a log message'];

    logMessage('log', inputMessage);

    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith(...inputMessage);
  });

  it("should log messages to the console in development environment for 'info' type", () => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    process.env.NODE_ENV = 'development';
    const inputMessage = ['This is an info message'];

    logMessage('info', inputMessage);

    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledWith(...inputMessage);
  });

  it("should log messages to the console in development environment for 'warn' type", () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    process.env.NODE_ENV = 'development';
    const inputMessage = ['This is a warning message'];

    logMessage('warn', inputMessage);

    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledWith(...inputMessage);
  });

  it("should log messages to the console in development environment for 'error' type", () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    process.env.NODE_ENV = 'development';
    const inputMessage = ['This is an error message'];

    logMessage('error', inputMessage);

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(...inputMessage);
  });

  it('should not log messages when environment is not development', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    process.env.NODE_ENV = 'production';
    const inputMessage = ['This message should not be logged'];

    logMessage('log', inputMessage);

    // eslint-disable-next-line no-console
    expect(console.log).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.info).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.warn).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.error).not.toHaveBeenCalled();
  });
});

describe('devConsoleLog', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should log the message using console.log in development environment', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    process.env.NODE_ENV = 'development';

    devConsoleLog({ input: ['This is a log message'], type: 'log' });

    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith('This is a log message');
  });

  it('should log the message using console.info in development environment', () => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    process.env.NODE_ENV = 'development';

    devConsoleLog({ input: ['This is an info message'], type: 'info' });

    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledWith('This is an info message');
  });

  it('should log the message using console.warn in development environment', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    process.env.NODE_ENV = 'development';

    devConsoleLog({ input: ['This is a warning message'], type: 'warn' });

    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledWith('This is a warning message');
  });

  it('should log the message using console.error in development environment', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    process.env.NODE_ENV = 'development';

    devConsoleLog({ input: ['This is an error message'], type: 'error' });

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith('This is an error message');
  });

  it('should not log anything in production environment', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    process.env.NODE_ENV = 'production';

    devConsoleLog({ input: ['This should not be logged'], type: 'log' });
    devConsoleLog({ input: ['This should not be logged'], type: 'info' });
    devConsoleLog({ input: ['This should not be logged'], type: 'warn' });
    devConsoleLog({ input: ['This should not be logged'], type: 'error' });

    // eslint-disable-next-line no-console
    expect(console.log).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.info).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.warn).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log anything in test environment', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    process.env.NODE_ENV = 'test';

    devConsoleLog({
      input: ['This should not be logged in test'],
      type: 'log',
    });
    devConsoleLog({
      input: ['This should not be logged in test'],
      type: 'info',
    });
    devConsoleLog({
      input: ['This should not be logged in test'],
      type: 'warn',
    });
    devConsoleLog({
      input: ['This should not be logged in test'],
      type: 'error',
    });

    // eslint-disable-next-line no-console
    expect(console.log).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.info).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.warn).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.error).not.toHaveBeenCalled();
  });
});
