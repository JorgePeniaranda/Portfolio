import z from 'zod';

import { EntityRelationSchemaErrorMessages } from '@/messages/errors/schemas/entity-relation';

export const EntityRelationSchema = z.object({
  idSource: z.number({
    message: EntityRelationSchemaErrorMessages.idSource.number,
    required_error: EntityRelationSchemaErrorMessages.idSource.required_error,
  }),
  idTarget: z.number({
    message: EntityRelationSchemaErrorMessages.idTarget.number,
    required_error: EntityRelationSchemaErrorMessages.idTarget.required_error,
  }),
});

export type EntityRelationSchema = z.infer<typeof EntityRelationSchema>;
