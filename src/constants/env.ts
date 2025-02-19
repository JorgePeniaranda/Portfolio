import { getEnvValue } from '@/helpers/common/get-env';
import { version } from '@/../package.json';

const { DEV, PROD, SITE, SSR, BASE_URL, ASSETS_PREFIX, MODE } = import.meta.env;

/**
 * Configuration object for environment-specific values.
 */
export const ENV = {
  appVersion: version,
  isProduction: PROD,
  isDevelopment: DEV,
  isServerSideEnable: SSR,
  site_url: SITE,
  base_url: BASE_URL,
  assets_prefix: ASSETS_PREFIX,
  mode: MODE,
  api_url: 'http://localhost:4321',
  secret_code: getEnvValue('PUBLIC_SECRET_CODE', '7421'),
} as const;
