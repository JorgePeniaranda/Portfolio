export const getEnvValue = (envName: string, defaultValue?: string): string => {
  const envValue = import.meta.env[envName];

  if (typeof envValue === "string" && envValue.length > 0) {
    return envValue;
  }

  if (typeof defaultValue === "string") {
    console.warn("Using default value for environment variable", envName, defaultValue);

    return defaultValue;
  }

  console.error("Environment variable not found", envName);
  throw new Error("Environment variable not found: " + envName);
};
