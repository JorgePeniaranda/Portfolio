import type { Prisma } from '@prisma/client';

import { StackCategory, StackType } from '@prisma/client';
import { z } from 'zod';

import { StackSchemaErrorMessages } from '@/messages/errors/schemas/stack';

const stackCategoryValues = Object.values(StackCategory) as [
  (typeof StackCategory)[keyof typeof StackCategory],
  ...(typeof StackCategory)[keyof typeof StackCategory][],
];
const stackTypeValues = Object.values(StackType) as [
  (typeof StackType)[keyof typeof StackType],
  ...(typeof StackType)[keyof typeof StackType][],
];

export const StackCreateSchema = z.object({
  key: z
    .string({
      message: StackSchemaErrorMessages.key.string,
      required_error: StackSchemaErrorMessages.key.required_error,
    })
    .min(1, {
      message: StackSchemaErrorMessages.key.required_error,
    }),
  name: z
    .string({
      message: StackSchemaErrorMessages.name.string,
      required_error: StackSchemaErrorMessages.name.required_error,
    })
    .min(1, {
      message: StackSchemaErrorMessages.name.required_error,
    }),
  description: z
    .string({
      message: StackSchemaErrorMessages.description.string,
      required_error: StackSchemaErrorMessages.description.required_error,
    })
    .min(1, {
      message: StackSchemaErrorMessages.description.required_error,
    }),
  category: z
    .enum(stackCategoryValues, {
      message: StackSchemaErrorMessages.category.enum,
    })
    .optional()
    .nullable(),
  type: z
    .enum(stackTypeValues, {
      message: StackSchemaErrorMessages.type.enum,
    })
    .optional()
    .nullable(),
  iconUrl: z
    .string({
      message: StackSchemaErrorMessages.iconUrl.string,
      required_error: StackSchemaErrorMessages.iconUrl.required_error,
    })
    .min(1, {
      message: StackSchemaErrorMessages.iconUrl.required_error,
    }),
}) satisfies z.ZodType<Prisma.StackCreateInput>;

export type StackCreateSchema = z.infer<typeof StackCreateSchema>;

export const StackCreateDefaultValues: StackCreateSchema = {
  key: '',
  name: '',
  description: '',
  category: null,
  type: null,
  iconUrl: '',
};
