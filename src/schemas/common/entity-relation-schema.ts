import z from 'zod';

import { EntityRelationSchemaErrorMessages } from '@/messages/schemas/entity-relation';

export const EntityRelationSchema = z.object({
  idSource: z.number({
    message: EntityRelationSchemaErrorMessages.idSource.number,
    required_error: EntityRelationSchemaErrorMessages.idSource.required_error,
    invalid_type_error: EntityRelationSchemaErrorMessages.idSource.number,
  }),
  idTarget: z.number({
    message: EntityRelationSchemaErrorMessages.idTarget.number,
    required_error: EntityRelationSchemaErrorMessages.idTarget.required_error,
    invalid_type_error: EntityRelationSchemaErrorMessages.idTarget.number,
  }),
});

export type EntityRelationSchema = z.infer<typeof EntityRelationSchema>;
