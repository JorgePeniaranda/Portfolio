import {devConsoleLog} from "./dev-console-log";

export function safeRedirect(url: string, keepHistory: boolean = true): void {
  // Validate the URL to ensure it's a non-empty string and properly formatted
  if (typeof url !== "string" || url.trim() === "") {
    throw new Error("Invalid URL provided for redirection.");
  }

  // Ensure window is available (only runs in browser environments)
  if (typeof window !== "undefined" && window.location) {
    // Validate that the URL starts with '/' or 'http' to prevent potentially harmful redirects
    if (!/^\/|http(s)?:\/\//.test(url)) {
      throw new Error("URL must be absolute or relative.");
    }

    if (keepHistory) {
      // Use window.location.assign to preserve history
      window.location.assign(url);
    } else {
      // Use window.location.replace to avoid adding the redirect to the history
      window.location.replace(url);
    }
  } else {
    devConsoleLog({
      message: "safeRedirect() was called in a non-browser environment.",
      type: "warn",
    });
  }
}
