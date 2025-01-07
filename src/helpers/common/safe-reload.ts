import {devConsoleLog} from "./dev-console-log";

export function safeReload(): void {
  // Check if we are in a browser environment (with window available)
  if (typeof window !== "undefined" && window.location) {
    // Reload the page safely
    window.location.reload();
  } else {
    devConsoleLog({
      message: "safeReload() was called in a non-browser environment.",
      type: "warn",
    });
  }
}
