import type { Prisma } from '@prisma/client';

import { ProjectStatus, StackCategory } from '@prisma/client';
import { z } from 'zod';

import { isHexadecimal } from '@/helpers/guards/is-hexadecimal';
import { ProjectSchemaErrorMessages } from '@/messages/schemas/project';

const stackCategoryValues = Object.values(StackCategory) as [
  (typeof StackCategory)[keyof typeof StackCategory],
  ...(typeof StackCategory)[keyof typeof StackCategory][],
];
const projectStatusValues = Object.values(ProjectStatus) as [
  (typeof ProjectStatus)[keyof typeof ProjectStatus],
  ...(typeof ProjectStatus)[keyof typeof ProjectStatus][],
];

export const ProjectCreateSchema = z.object({
  key: z
    .string({
      message: ProjectSchemaErrorMessages.key.string,
      required_error: ProjectSchemaErrorMessages.key.required_error,
    })
    .min(1, {
      message: ProjectSchemaErrorMessages.key.required_error,
    }),
  name: z
    .string({
      message: ProjectSchemaErrorMessages.name.string,
      required_error: ProjectSchemaErrorMessages.name.required_error,
    })
    .min(1, {
      message: ProjectSchemaErrorMessages.name.required_error,
    }),
  status: z.enum(projectStatusValues, {
    message: ProjectSchemaErrorMessages.status.enum,
  }),
  stackCategory: z.enum(stackCategoryValues, {
    message: ProjectSchemaErrorMessages.stackCategory.enum,
  }),
  startDate: z.coerce.date({
    message: ProjectSchemaErrorMessages.startDate.date,
    required_error: ProjectSchemaErrorMessages.startDate.required_error,
  }),
  endDate: z.coerce
    .date({
      message: ProjectSchemaErrorMessages.endDate.date,
    })
    .optional()
    .nullable(),
  description: z
    .string({
      message: ProjectSchemaErrorMessages.description.string,
      required_error: ProjectSchemaErrorMessages.description.required_error,
    })
    .min(1, {
      message: ProjectSchemaErrorMessages.description.required_error,
    }),
  goals: z
    .string({
      message: ProjectSchemaErrorMessages.goals.string,
      required_error: ProjectSchemaErrorMessages.goals.required_error,
    })
    .min(1, {
      message: ProjectSchemaErrorMessages.goals.required_error,
    }),
  contributions: z
    .string({
      message: ProjectSchemaErrorMessages.contributions.string,
      required_error: ProjectSchemaErrorMessages.contributions.required_error,
    })
    .min(1, {
      message: ProjectSchemaErrorMessages.contributions.required_error,
    }),
  logoUrl: z
    .string({
      message: ProjectSchemaErrorMessages.logoUrl.string,
      required_error: ProjectSchemaErrorMessages.logoUrl.required_error,
    })
    .min(1, {
      message: ProjectSchemaErrorMessages.logoUrl.required_error,
    }),
  primaryColor: z
    .string({
      message: ProjectSchemaErrorMessages.primaryColor.string,
      required_error: ProjectSchemaErrorMessages.primaryColor.required_error,
    })
    .refine(isHexadecimal, {
      message: ProjectSchemaErrorMessages.primaryColor.invalid_hex_color,
    }),
  demoUrl: z
    .string({
      message: ProjectSchemaErrorMessages.demoUrl.string,
    })
    .optional()
    .nullable(),
  githubUrl: z
    .string({
      message: ProjectSchemaErrorMessages.githubUrl.string,
    })
    .optional()
    .nullable(),
}) satisfies z.ZodType<Prisma.ProjectCreateInput>;

export type ProjectCreateSchema = z.infer<typeof ProjectCreateSchema>;

export const ProjectCreateDefaultValues: ProjectCreateSchema = {
  key: '',
  name: '',
  status: ProjectStatus.IN_PROGRESS,
  stackCategory: StackCategory.FRONT_END,
  startDate: new Date(),
  endDate: null,
  description: '',
  goals: '',
  contributions: '',
  logoUrl: '',
  primaryColor: '#c05454',
  demoUrl: '',
  githubUrl: '',
};
