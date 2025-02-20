import { z } from 'zod';

export const EnvSchema = z.object({
  appVersion: z.string({
    message: 'appVersion must be a string',
  }),
  mode: z.string({
    message: 'mode must be a string',
  }),
  isProduction: z.boolean({
    message: 'isProduction must be a boolean',
  }),
  isDevelopment: z.boolean({
    message: 'isDevelopment must be a boolean',
  }),
  isServerSideEnable: z.boolean({
    message: 'isServerSideEnable must be a boolean',
  }),
  assetsPrefix: z
    .string({
      message: 'assetsPrefix must be a string',
    })
    .optional()
    .nullable(),
  siteUrl: z
    .string({
      message: 'siteUrl must be a string',
    })
    .url({
      message: 'siteUrl must be a valid URL',
    }),
  baseUrl: z.string({
    message: 'baseUrl must be a string',
  }),
  apiUrl: z
    .string({
      message: 'apiUrl must be a string',
    })
    .url({
      message: 'apiUrl must be a valid URL',
    }),
  secretCode: z.string({
    message: 'secretCode must be a string',
  }),
});

export type EnvSchemaSchema = z.infer<typeof EnvSchema>;
