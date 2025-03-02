import type { Prisma } from '@prisma/client';

import { z } from 'zod';

import { CollaboratorSchemaErrorMessages } from '@/messages/schemas/collaborator';

export const CollaboratorUpdateSchema = z.object({
  nickname: z
    .string({
      message: CollaboratorSchemaErrorMessages.nickname.string,
      invalid_type_error: CollaboratorSchemaErrorMessages.nickname.string,
    })
    .optional(),
  githubUsername: z
    .string({
      message: CollaboratorSchemaErrorMessages.githubUsername.string,
      invalid_type_error: CollaboratorSchemaErrorMessages.githubUsername.string,
    })
    .optional()
    .nullable(),
  linkedinUsername: z
    .string({
      message: CollaboratorSchemaErrorMessages.linkedinUsername.string,
      invalid_type_error: CollaboratorSchemaErrorMessages.linkedinUsername.string,
    })
    .optional()
    .nullable(),
}) satisfies z.ZodType<Prisma.CollaboratorUpdateInput>;

export type CollaboratorUpdateSchema = z.infer<typeof CollaboratorUpdateSchema>;
