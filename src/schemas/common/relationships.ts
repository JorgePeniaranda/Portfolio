import z from "zod";

export const RelationshipsSchema = z.object({
  idFrom: z.number(),
  idTo: z.number(),
});

export type RelationshipsSchema = z.infer<typeof RelationshipsSchema>;
