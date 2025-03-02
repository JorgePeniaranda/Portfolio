import { z } from 'zod';

import { EnvSchemaErrorMessages } from '@/messages/schemas/env';

export const EnvSchema = z.object({
  appVersion: z.string({
    message: EnvSchemaErrorMessages.appVersion.string,
    required_error: EnvSchemaErrorMessages.appVersion.required_error,
  }),
  mode: z.string({
    message: EnvSchemaErrorMessages.mode.string,
    required_error: EnvSchemaErrorMessages.appVersion.required_error,
  }),
  isProduction: z.boolean({
    message: EnvSchemaErrorMessages.isProduction.boolean,
    required_error: EnvSchemaErrorMessages.isProduction.required_error,
  }),
  isDevelopment: z.boolean({
    message: EnvSchemaErrorMessages.appVersion.string,
    required_error: EnvSchemaErrorMessages.isDevelopment.required_error,
  }),
  isServerSideEnable: z.boolean({
    message: EnvSchemaErrorMessages.appVersion.string,
    required_error: EnvSchemaErrorMessages.isServerSideEnable.required_error,
  }),
  assetsPrefix: z
    .string({
      message: EnvSchemaErrorMessages.appVersion.string,
    })
    .optional()
    .nullable(),
  siteUrl: z
    .string({
      message: EnvSchemaErrorMessages.appVersion.string,
    })
    .url({
      message: EnvSchemaErrorMessages.appVersion.string,
    }),
  baseUrl: z.string({
    message: EnvSchemaErrorMessages.appVersion.string,
    required_error: EnvSchemaErrorMessages.baseUrl.required_error,
  }),
  apiUrl: z
    .string({
      message: EnvSchemaErrorMessages.appVersion.string,
      required_error: EnvSchemaErrorMessages.apiUrl.required_error,
    })
    .url({
      message: EnvSchemaErrorMessages.appVersion.string,
    }),
  secretCode: z.string({
    message: EnvSchemaErrorMessages.appVersion.string,
    required_error: EnvSchemaErrorMessages.secretCode.required_error,
  }),
});

export type EnvSchemaSchema = z.infer<typeof EnvSchema>;
