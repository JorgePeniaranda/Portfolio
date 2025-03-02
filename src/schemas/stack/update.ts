import type { Prisma } from '@prisma/client';

import { StackCategory, StackType } from '@prisma/client';
import { z } from 'zod';

import { StackSchemaErrorMessages } from '@/messages/schemas/stack';

const stackCategoryValues = Object.values(StackCategory) as [
  (typeof StackCategory)[keyof typeof StackCategory],
  ...(typeof StackCategory)[keyof typeof StackCategory][],
];
const stackTypeValues = Object.values(StackType) as [
  (typeof StackType)[keyof typeof StackType],
  ...(typeof StackType)[keyof typeof StackType][],
];

export const StackUpdateSchema = z.object({
  key: z
    .string({
      message: StackSchemaErrorMessages.key.string,
      required_error: StackSchemaErrorMessages.key.required_error,
      invalid_type_error: StackSchemaErrorMessages.key.string,
    })
    .min(1, {
      message: StackSchemaErrorMessages.key.required_error,
    }),
  name: z
    .string({
      message: StackSchemaErrorMessages.name.string,
      required_error: StackSchemaErrorMessages.name.required_error,
      invalid_type_error: StackSchemaErrorMessages.name.string,
    })
    .min(1, {
      message: StackSchemaErrorMessages.name.required_error,
    }),
  description: z
    .string({
      message: StackSchemaErrorMessages.description.string,
      required_error: StackSchemaErrorMessages.description.required_error,
      invalid_type_error: StackSchemaErrorMessages.description.string,
    })
    .min(1, {
      message: StackSchemaErrorMessages.description.required_error,
    }),
  category: z
    .enum(stackCategoryValues, {
      message: StackSchemaErrorMessages.category.enum,
      invalid_type_error: StackSchemaErrorMessages.category.enum,
    })
    .optional()
    .nullable(),
  type: z
    .enum(stackTypeValues, {
      message: StackSchemaErrorMessages.type.enum,
      invalid_type_error: StackSchemaErrorMessages.type.enum,
    })
    .optional()
    .nullable(),
  iconUrl: z
    .string({
      message: StackSchemaErrorMessages.iconUrl.string,
      required_error: StackSchemaErrorMessages.iconUrl.required_error,
      invalid_type_error: StackSchemaErrorMessages.iconUrl.string,
    })
    .min(1, {
      message: StackSchemaErrorMessages.iconUrl.required_error,
    }),
}) satisfies z.ZodType<Prisma.StackUpdateInput>;

export type StackUpdateSchema = z.infer<typeof StackUpdateSchema>;
