import {devConsoleLog} from "@/helpers/common/dev-console-log";

/**
 * Retrieves the value of an environment variable or returns a default value if not found.
 * Logs a warning or error message to the console depending on whether a default value is provided.
 *
 * @param {string} envName - The name of the environment variable to retrieve.
 * @param {string} [defaultValue] - An optional default value to return if the environment variable is not found.
 * @returns {string} The value of the environment variable or the default value.
 * @throws {Error} Throws an error if the environment variable is not found and no default value is provided.
 */
export function getEnvValue(envName: string, defaultValue?: string): string {
  const envValue = import.meta.env[envName];

  // If the environment variable exists and has a non-empty value, return it
  if (typeof envValue === "string" && envValue.length > 0) {
    return envValue;
  }

  // If a default value is provided, log a warning and return the default value
  if (typeof defaultValue === "string") {
    devConsoleLog.warn(
      `Environment variable not found: ${envName}, using default value: ${defaultValue}`,
    );

    return defaultValue;
  }

  // If no default value is provided, log an error and throw an exception
  devConsoleLog.error(`Environment variable not found: ${envName}`);
  throw new Error("Environment variable not found: " + envName);
}
