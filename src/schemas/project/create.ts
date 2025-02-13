import { ProjectStatus, StackCategory } from '@prisma/client';
import { z } from 'zod';

import { isHexadecimal } from '@/helpers/guards/is-hexadecimal';

const stackCategoryValues = Object.values(StackCategory) as [
  (typeof StackCategory)[keyof typeof StackCategory],
  ...(typeof StackCategory)[keyof typeof StackCategory][],
];
const projectStatusValues = Object.values(ProjectStatus) as [
  (typeof ProjectStatus)[keyof typeof ProjectStatus],
  ...(typeof ProjectStatus)[keyof typeof ProjectStatus][],
];

export const ProjectCreateSchema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
  status: z.enum(projectStatusValues),
  stackCategory: z.enum(stackCategoryValues),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  description: z.string().min(1),
  goals: z.string().min(1),
  contributions: z.string().min(1),
  logoUrl: z.string().min(1),
  primaryColor: z.string().refine(isHexadecimal, {
    message: 'Invalid hex color format. Expected format: #RRGGBB or #RGB',
  }),
  demoUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
});

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
