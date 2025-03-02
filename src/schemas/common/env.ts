import { z } from 'zod';

import { EnvSchemaErrorMessages } from '@/messages/schemas/env';

export const EnvSchema = z.object({
  appVersion: z.string({
    message: EnvSchemaErrorMessages.appVersion.string,
    required_error: EnvSchemaErrorMessages.appVersion.required_error,
    invalid_type_error: EnvSchemaErrorMessages.appVersion.string,
  }),
  mode: z.string({
    message: EnvSchemaErrorMessages.mode.string,
    required_error: EnvSchemaErrorMessages.mode.required_error,
    invalid_type_error: EnvSchemaErrorMessages.mode.string,
  }),
  isProduction: z.boolean({
    message: EnvSchemaErrorMessages.isProduction.boolean,
    required_error: EnvSchemaErrorMessages.isProduction.required_error,
    invalid_type_error: EnvSchemaErrorMessages.isProduction.boolean,
  }),
  isDevelopment: z.boolean({
    message: EnvSchemaErrorMessages.isDevelopment.boolean,
    required_error: EnvSchemaErrorMessages.isDevelopment.required_error,
    invalid_type_error: EnvSchemaErrorMessages.isDevelopment.boolean,
  }),
  isServerSideEnable: z.boolean({
    message: EnvSchemaErrorMessages.isServerSideEnable.boolean,
    required_error: EnvSchemaErrorMessages.isServerSideEnable.required_error,
    invalid_type_error: EnvSchemaErrorMessages.isServerSideEnable.boolean,
  }),
  assetsPrefix: z
    .string({
      message: EnvSchemaErrorMessages.assetsPrefix.string,
    })
    .optional()
    .nullable(),
  siteUrl: z
    .string({
      message: EnvSchemaErrorMessages.siteUrl.string,
      required_error: EnvSchemaErrorMessages.siteUrl.required_error,
      invalid_type_error: EnvSchemaErrorMessages.siteUrl.string,
    })
    .url({
      message: EnvSchemaErrorMessages.siteUrl.url,
    }),
  baseUrl: z.string({
    message: EnvSchemaErrorMessages.baseUrl.string,
    required_error: EnvSchemaErrorMessages.baseUrl.required_error,
    invalid_type_error: EnvSchemaErrorMessages.baseUrl.string,
  }),
  apiUrl: z
    .string({
      message: EnvSchemaErrorMessages.apiUrl.string,
      required_error: EnvSchemaErrorMessages.apiUrl.required_error,
      invalid_type_error: EnvSchemaErrorMessages.apiUrl.string,
    })
    .url({
      message: EnvSchemaErrorMessages.apiUrl.url,
    }),
  secretCode: z.string({
    message: EnvSchemaErrorMessages.secretCode.string,
    required_error: EnvSchemaErrorMessages.secretCode.required_error,
    invalid_type_error: EnvSchemaErrorMessages.secretCode.string,
  }),
});

export type EnvSchemaSchema = z.infer<typeof EnvSchema>;
