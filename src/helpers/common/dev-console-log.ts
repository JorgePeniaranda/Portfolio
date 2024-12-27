/**
 * Log message to console in development environment
 * @param message
 * @param type - The type of console method to use (log, info, warn, error)
 */
export function devConsoleLog({
  message,
  type,
}: {
  message: string;
  type: "log" | "info" | "warn" | "error";
}): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console[type](message);
  }
}
