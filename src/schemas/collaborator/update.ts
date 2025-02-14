import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const CollaboratorUpdateSchema = z.object({
  nickname: z.string().optional(),
  githubUsername: z.string().optional().nullable(),
  linkedinUsername: z.string().optional().nullable(),
}) satisfies z.ZodType<Prisma.CollaboratorUpdateInput>;

export type CollaboratorUpdateSchema = z.infer<typeof CollaboratorUpdateSchema>;
