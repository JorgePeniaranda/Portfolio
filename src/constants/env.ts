import { getEnvValue } from '@/helpers/common/get-env';
import { version } from '@/../package.json';

const { DEV, PROD, SITE, SSR, BASE_URL, ASSETS_PREFIX, MODE } = import.meta.env;

/**
 * Configuration object for environment-specific values.
 */
export const ENV = {
  appVersion: version,
  mode: MODE,
  isProduction: PROD,
  isDevelopment: DEV,
  isServerSideEnable: SSR,
  assetsPrefix: ASSETS_PREFIX,
  siteUrl: SITE,
  baseUrl: BASE_URL,
  apiUrl: 'http://localhost:4321',
  secret_code: getEnvValue('PUBLIC_SECRET_CODE', '7421'),
} as const;
