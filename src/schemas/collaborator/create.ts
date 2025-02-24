import type { Prisma } from '@prisma/client';

import { z } from 'zod';

import { CollaboratorSchemaErrorMessages } from '@/messages/errors/schemas/collaborator';

export const CollaboratorCreateSchema = z.object({
  nickname: z
    .string({
      message: CollaboratorSchemaErrorMessages.nickname.string,
      required_error: CollaboratorSchemaErrorMessages.nickname.required_error,
    })
    .min(1, {
      message: CollaboratorSchemaErrorMessages.nickname.required_error,
    }),
  githubUsername: z
    .string({
      message: CollaboratorSchemaErrorMessages.githubUsername.string,
    })
    .optional()
    .nullable(),
  linkedinUsername: z
    .string({
      message: CollaboratorSchemaErrorMessages.linkedinUsername.string,
    })
    .optional()
    .nullable(),
}) satisfies z.ZodType<Prisma.CollaboratorCreateInput>;

export type CollaboratorCreateSchema = z.infer<typeof CollaboratorCreateSchema>;

export const CollaboratorCreateDefaultValues: CollaboratorCreateSchema = {
  nickname: '',
  githubUsername: null,
  linkedinUsername: null,
};
