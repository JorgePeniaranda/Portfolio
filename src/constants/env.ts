import packageJson from "../../package.json";
import {getEnvValue} from "../helpers/common/get-env";

// Check if the environment is production based on the `import.meta.env.PROD` value
const isProduction = import.meta.env.PROD;

/**
 * Configuration object for environment-specific values.
 * @constant {object}
 */
export const ENV = {
  base_url: isProduction ? getEnvValue("SITE") : "http://localhost:4321",
  secret_code: getEnvValue("PUBLIC_SECRET_CODE", "7421"),
  appVersion: packageJson.version,
} as const;
