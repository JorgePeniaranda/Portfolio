import z from "zod";

export const PaginationParamsSchema = z.object({
  page: z.coerce.number().min(1),
  size: z.coerce.number().min(1),
});

export type RelationshipsSchema = z.infer<typeof PaginationParamsSchema>;
