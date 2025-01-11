import {describe, it, expect, vi, beforeEach} from "vitest";

import {getEnvValue} from "@/helpers/common/get-env";

describe("getEnvValue", () => {
  const originalEnv = {...process.env};
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();

    process.env = {...originalEnv};
  });

  it("should return the value of the environment variable if it exists", () => {
    process.env.TEST_VAR = "testValue";

    const result = getEnvValue("TEST_VAR");

    expect(result).toBe("testValue");
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("should return the default value if the environment variable does not exist", () => {
    const result = getEnvValue("NON_EXISTENT_VAR", "defaultValue");

    expect(result).toBe("defaultValue");
    expect(warnSpy).toHaveBeenCalledWith(
      "Environment variable not found: NON_EXISTENT_VAR, using default value: defaultValue",
    );
  });

  it("should throw an error if the environment variable does not exist and no default value is provided", () => {
    expect(() => getEnvValue("NON_EXISTENT_VAR")).toThrowError(
      "Environment variable not found: NON_EXISTENT_VAR",
    );

    expect(errorSpy).toHaveBeenCalledWith("Environment variable not found: NON_EXISTENT_VAR");
  });
});
