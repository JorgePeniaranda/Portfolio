import { afterEach, describe, expect, it, vi } from 'vitest';

import { devConsoleLog, logMessage } from '@/helpers/common/dev-console-log';

vi.mock('console', () => ({
  log: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}));

describe('logMessage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should log messages to the console in development environment for 'log' type", () => {
    process.env.NODE_ENV = 'development'; // Establece el entorno de desarrollo
    const inputMessage = ['This is a log message'];

    logMessage('log', inputMessage);

    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith(...inputMessage);
  });

  it("should log messages to the console in development environment for 'info' type", () => {
    process.env.NODE_ENV = 'development'; // Establece el entorno de desarrollo
    const inputMessage = ['This is an info message'];

    logMessage('info', inputMessage);

    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledWith(...inputMessage);
  });

  it("should log messages to the console in development environment for 'warn' type", () => {
    process.env.NODE_ENV = 'development'; // Establece el entorno de desarrollo
    const inputMessage = ['This is a warning message'];

    logMessage('warn', inputMessage);

    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledWith(...inputMessage);
  });

  it("should log messages to the console in development environment for 'error' type", () => {
    process.env.NODE_ENV = 'development'; // Establece el entorno de desarrollo
    const inputMessage = ['This is an error message'];

    logMessage('error', inputMessage);

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(...inputMessage);
  });

  it('should not log messages when environment is not development', () => {
    process.env.NODE_ENV = 'production'; // Establece un entorno de producción
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
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should log the message using console.log in development environment', () => {
    process.env.NODE_ENV = 'development';

    devConsoleLog({ input: ['This is a log message'], type: 'log' });

    expect(logSpy).toHaveBeenCalledWith('This is a log message');
  });

  it('should log the message using console.info in development environment', () => {
    process.env.NODE_ENV = 'development';

    devConsoleLog({ input: ['This is an info message'], type: 'info' });

    expect(infoSpy).toHaveBeenCalledWith('This is an info message');
  });

  it('should log the message using console.warn in development environment', () => {
    process.env.NODE_ENV = 'development';

    devConsoleLog({ input: ['This is a warning message'], type: 'warn' });

    expect(warnSpy).toHaveBeenCalledWith('This is a warning message');
  });

  it('should log the message using console.error in development environment', () => {
    process.env.NODE_ENV = 'development';

    devConsoleLog({ input: ['This is an error message'], type: 'error' });

    expect(errorSpy).toHaveBeenCalledWith('This is an error message');
  });

  it('should not log anything in production environment', () => {
    process.env.NODE_ENV = 'production';

    devConsoleLog({ input: ['This should not be logged'], type: 'log' });
    devConsoleLog({ input: ['This should not be logged'], type: 'info' });
    devConsoleLog({ input: ['This should not be logged'], type: 'warn' });
    devConsoleLog({ input: ['This should not be logged'], type: 'error' });

    expect(logSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should not log anything in test environment', () => {
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

    expect(logSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
