import { ENV } from '@/constants/env';

/**
 * Log message to console in development environment
 * @param type - The type of message to log
 * @param input - The message to log
 */
export function logMessage(type: 'log' | 'info' | 'warn' | 'error', input: unknown[]): void {
  if (ENV.isDevelopment) {
    // eslint-disable-next-line no-console
    console[type](...input);
  }
}

/**
 * Main function that also exposes specific log methods
 */
export const devConsoleLog = Object.assign(
  ({ input, type }: { input: unknown[]; type: 'log' | 'info' | 'warn' | 'error' }): void => {
    logMessage(type, input);
  },
  {
    log: (...input: unknown[]): void => logMessage('log', input),
    info: (...input: unknown[]): void => logMessage('info', input),
    warn: (...input: unknown[]): void => logMessage('warn', input),
    error: (...input: unknown[]): void => logMessage('error', input),
  },
);
