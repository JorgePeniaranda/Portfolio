import {z} from "zod";

export const CollaboratorUpdateSchema = z.object({
  id: z.number(),
  nickname: z.string().optional(),
  githubUsername: z.string().optional().nullable(),
  linkedinUsername: z.string().optional().nullable(),
});

export type CollaboratorUpdateSchema = z.infer<typeof CollaboratorUpdateSchema>;
