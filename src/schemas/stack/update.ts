import {StackCategory} from "@prisma/client";
import {z} from "zod";

const stackCategoryValues = Object.values(StackCategory) as [string, ...string[]];
const stackTypeValues = Object.values(StackCategory) as [string, ...string[]];

export const StackUpdateSchema = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.enum(stackCategoryValues).optional(),
  type: z.enum(stackTypeValues).optional(),
  iconUrl: z.string(),
});

export type StackUpdateSchema = z.infer<typeof StackUpdateSchema>;
