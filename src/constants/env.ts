import packageJson from "../../package.json";
import {getEnvValue} from "../helpers/common/get-env";

// Check if the environment is production based on the `import.meta.env.PROD` value
const isProduction = import.meta.env.PROD;

// Check if the environment is development based on the `import.meta.env.DEV` value
const isDevelopment = import.meta.env.DEV;

/**
 * Configuration object for environment-specific values.
 * @constant {object}
 */
export const ENV = {
  isProduction,
  isDevelopment,
  base_url: isProduction ? getEnvValue("SITE") : "http://localhost:4321",
  secret_code: getEnvValue("PUBLIC_SECRET_CODE", "7421"),
  appVersion: packageJson.version,
  isServerSideEnable: isDevelopment,
} as const;
