import type { TranslationKey } from '@/types/translation';

export const EnvSchemaErrorMessages = {
  appVersion: {
    string: 'error.validation-message.env.appVersion.string',
    required_error: 'error.validation-message.env.appVersion.required_error',
  },
  mode: {
    string: 'error.validation-message.env.mode.string',
    required_error: 'error.validation-message.env.mode.required_error',
  },
  isProduction: {
    boolean: 'error.validation-message.env.isProduction.boolean',
    required_error: 'error.validation-message.env.isProduction.required_error',
  },
  isDevelopment: {
    boolean: 'error.validation-message.env.isDevelopment.boolean',
    required_error: 'error.validation-message.env.isDevelopment.required_error',
  },
  isServerSideEnable: {
    boolean: 'error.validation-message.env.isServerSideEnable.boolean',
    required_error: 'error.validation-message.env.isServerSideEnable.required_error',
  },
  assetsPrefix: {
    string: 'error.validation-message.env.assetsPrefix.string',
  },
  siteUrl: {
    string: 'error.validation-message.env.siteUrl.string',
    url: 'error.validation-message.env.siteUrl.url',
    required_error: 'error.validation-message.env.siteUrl.required_error',
  },
  baseUrl: {
    string: 'error.validation-message.env.baseUrl.string',
    required_error: 'error.validation-message.env.baseUrl.required_error',
  },
  apiUrl: {
    string: 'error.validation-message.env.apiUrl.string',
    url: 'error.validation-message.env.apiUrl.url',
    required_error: 'error.validation-message.env.apiUrl.required_error',
  },
  secretCode: {
    string: 'error.validation-message.env.secretCode.string',
    required_error: 'error.validation-message.env.secretCode.required_error',
  },
} as const satisfies Record<string, Record<string, TranslationKey>>;
