import {devConsoleLog} from "./dev-console-log";

export const getEnvValue = (envName: string, defaultValue?: string): string => {
  const envValue = import.meta.env[envName];

  if (typeof envValue === "string" && envValue.length > 0) {
    return envValue;
  }

  if (typeof defaultValue === "string") {
    devConsoleLog({
      message: `Environment variable not found: ${envName}, using default value: ${defaultValue}`,
      type: "warn",
    });

    return defaultValue;
  }

  devConsoleLog({
    message: `Environment variable not found: ${envName}`,
    type: "error",
  });
  throw new Error("Environment variable not found: " + envName);
};
