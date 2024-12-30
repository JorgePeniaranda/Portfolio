import z from "zod";

export const RelationshipsSchema = z.object({
  from: z.number(),
  to: z.number(),
});
