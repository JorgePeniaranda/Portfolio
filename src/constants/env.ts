import { version } from '@/../package.json';
import { EnvSchema } from '@/schemas/common/env';

const {
  DEV,
  PROD,
  SITE,
  SSR,
  BASE_URL,
  ASSETS_PREFIX,
  MODE,
  API_URL = 'http://localhost:4321',
  PUBLIC_SECRET_CODE = '7421',
} = import.meta.env;

/**
 * Configuration object for environment-specific values.
 */
const rawEnv = {
  appVersion: version,
  mode: MODE,
  isProduction: PROD,
  isDevelopment: DEV,
  isServerSideEnable: SSR,
  assetsPrefix: ASSETS_PREFIX,
  siteUrl: SITE,
  baseUrl: BASE_URL,
  apiUrl: API_URL,
  secretCode: PUBLIC_SECRET_CODE,
} as const;

// Validated environment values.
export const ENV = EnvSchema.parse(rawEnv);
