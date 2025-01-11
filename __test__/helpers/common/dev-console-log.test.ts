import {afterEach, describe, expect, it, vi} from "vitest";

import {devConsoleLog} from "@/helpers/common/dev-console-log";

describe("devConsoleLog", () => {
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should log the message using console.log in development environment", () => {
    process.env.NODE_ENV = "development";

    devConsoleLog({input: ["This is a log message"], type: "log"});

    expect(logSpy).toHaveBeenCalledWith("This is a log message");
  });

  it("should log the message using console.info in development environment", () => {
    process.env.NODE_ENV = "development";

    devConsoleLog({input: ["This is an info message"], type: "info"});

    expect(infoSpy).toHaveBeenCalledWith("This is an info message");
  });

  it("should log the message using console.warn in development environment", () => {
    process.env.NODE_ENV = "development";

    devConsoleLog({input: ["This is a warning message"], type: "warn"});

    expect(warnSpy).toHaveBeenCalledWith("This is a warning message");
  });

  it("should log the message using console.error in development environment", () => {
    process.env.NODE_ENV = "development";

    devConsoleLog({input: ["This is an error message"], type: "error"});

    expect(errorSpy).toHaveBeenCalledWith("This is an error message");
  });

  it("should not log anything in production environment", () => {
    process.env.NODE_ENV = "production";

    devConsoleLog({input: ["This should not be logged"], type: "log"});
    devConsoleLog({input: ["This should not be logged"], type: "info"});
    devConsoleLog({input: ["This should not be logged"], type: "warn"});
    devConsoleLog({input: ["This should not be logged"], type: "error"});

    expect(logSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("should not log anything in test environment", () => {
    process.env.NODE_ENV = "test";

    devConsoleLog({input: ["This should not be logged in test"], type: "log"});
    devConsoleLog({input: ["This should not be logged in test"], type: "info"});
    devConsoleLog({input: ["This should not be logged in test"], type: "warn"});
    devConsoleLog({input: ["This should not be logged in test"], type: "error"});

    expect(logSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
