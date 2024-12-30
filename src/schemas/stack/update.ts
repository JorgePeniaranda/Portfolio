import {StackCategory, StackType} from "@prisma/client";
import {z} from "zod";

const stackCategoryValues = Object.values(StackCategory) as [
  (typeof StackCategory)[keyof typeof StackCategory],
  ...(typeof StackCategory)[keyof typeof StackCategory][],
];
const stackTypeValues = Object.values(StackType) as [
  (typeof StackType)[keyof typeof StackType],
  ...(typeof StackType)[keyof typeof StackType][],
];

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
