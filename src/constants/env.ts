import { getEnvValue } from '@/helpers/common/get-env';
import packageJson from '@/../package.json';

/**
 * Configuration object for environment-specific values.
 * @constant {object}
 */
export const ENV = {
  appVersion: packageJson.version,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  isServerSideEnable: import.meta.env.SSR,
  base_url: import.meta.env.PROD ? import.meta.env.SITE : 'http://localhost:4321',
  secret_code: getEnvValue('PUBLIC_SECRET_CODE', '7421'),
} as const;
