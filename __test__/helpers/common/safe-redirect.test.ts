import {describe, it, expect, vi, beforeEach, afterEach} from "vitest";

import {safeRedirect} from "@/helpers/common/safe-redirect";
import {devConsoleLog} from "@/helpers/common/dev-console-log";

vi.mock("@/helpers/common/dev-console-log", () => ({
  devConsoleLog: vi.fn(),
}));

describe("safeRedirect", () => {
  let originalWindow: typeof globalThis.window;

  beforeEach(() => {
    vi.clearAllMocks();

    originalWindow = global.window;
    global.window = {
      location: {
        assign: vi.fn(),
        replace: vi.fn(),
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  });

  afterEach(() => {
    global.window = originalWindow;
  });

  it("should throw an error if the URL is invalid", () => {
    expect(() => safeRedirect("")).toThrowError("Invalid URL provided for redirection.");
    expect(() => safeRedirect("   ")).toThrowError("Invalid URL provided for redirection.");
    expect(() => safeRedirect(123 as unknown as string)).toThrowError(
      "Invalid URL provided for redirection.",
    );
  });

  it("should throw an error if the URL is not absolute or relative", () => {
    expect(() => safeRedirect("javascript:alert('XSS')")).toThrowError(
      "URL must be absolute or relative.",
    );
    expect(() => safeRedirect("ftp://example.com")).toThrowError(
      "URL must be absolute or relative.",
    );
  });

  it("should call window.location.assign when keepHistory is true", () => {
    const url = "https://example.com";

    safeRedirect(url, true);
    expect(window.location.assign).toHaveBeenCalledWith(url);
    expect(window.location.replace).not.toHaveBeenCalled();
  });

  it("should call window.location.replace when keepHistory is false", () => {
    const url = "/relative-path";

    safeRedirect(url, false);
    expect(window.location.replace).toHaveBeenCalledWith(url);
    expect(window.location.assign).not.toHaveBeenCalled();
  });

  it("should log a warning if called in a non-browser environment", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.window = undefined as any;

    safeRedirect("/path");
    expect(devConsoleLog).toHaveBeenCalledWith({
      message: "safeRedirect() was called in a non-browser environment.",
      type: "warn",
    });
  });
});
