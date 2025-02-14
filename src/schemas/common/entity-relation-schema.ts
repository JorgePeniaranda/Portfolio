import z from 'zod';

export const EntityRelationSchema = z.object({
  idSource: z.number(),
  idTarget: z.number(),
});

export type EntityRelationSchema = z.infer<typeof EntityRelationSchema>;
