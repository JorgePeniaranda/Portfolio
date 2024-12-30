import {StackCategory} from "@prisma/client";
import {z} from "zod";

const stackCategoryValues = Object.values(StackCategory) as [string, ...string[]];
const stackTypeValues = Object.values(StackCategory) as [string, ...string[]];

export const StackCreateSchema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(stackCategoryValues).optional().nullable(),
  type: z.enum(stackTypeValues).optional().nullable(),
  iconUrl: z.string().min(1),
});

export type StackCreateSchema = z.infer<typeof StackCreateSchema>;

export const StackCreateDefaultValues: StackCreateSchema = {
  key: "",
  name: "",
  description: "",
  category: null,
  type: null,
  iconUrl: "",
};
