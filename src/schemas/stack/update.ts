import {StackCategory} from "@prisma/client";
import {z} from "zod";

const stackCategoryValues = Object.values(StackCategory) as [string, ...string[]];
const stackTypeValues = Object.values(StackCategory) as [string, ...string[]];

export const StackUpdateSchema = z.object({
  id: z.number(),
  key: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(stackCategoryValues).optional(),
  type: z.enum(stackTypeValues).optional(),
  iconUrl: z.string().min(1),
});

export type StackUpdateSchema = z.infer<typeof StackUpdateSchema>;
