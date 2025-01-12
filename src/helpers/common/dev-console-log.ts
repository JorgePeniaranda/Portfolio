/**
 * Log message to console in development environment
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function logMessage(type: "log" | "info" | "warn" | "error", input: any[]): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console[type](...input);
  }
}

/**
 * Main function that also exposes specific log methods
 */
export const devConsoleLog = Object.assign(
  ({input, type}: {input: unknown[]; type: "log" | "info" | "warn" | "error"}): void => {
    logMessage(type, input);
  },
  {
    log: (...input: unknown[]): void => logMessage("log", input),
    info: (...input: unknown[]): void => logMessage("info", input),
    warn: (...input: unknown[]): void => logMessage("warn", input),
    error: (...input: unknown[]): void => logMessage("error", input),
  },
);
