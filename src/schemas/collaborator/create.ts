import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const CollaboratorCreateSchema = z.object({
  nickname: z.string().min(1),
  githubUsername: z.string().optional().nullable(),
  linkedinUsername: z.string().optional().nullable(),
}) satisfies z.ZodType<Prisma.CollaboratorCreateInput>;

export type CollaboratorCreateSchema = z.infer<typeof CollaboratorCreateSchema>;

export const CollaboratorCreateDefaultValues: CollaboratorCreateSchema = {
  nickname: '',
  githubUsername: null,
  linkedinUsername: null,
};
