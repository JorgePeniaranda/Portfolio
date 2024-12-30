import {ProjectStatus, StackCategory} from "@prisma/client";
import {z} from "zod";

const stackCategoryValues = Object.values(StackCategory) as [string, ...string[]];
const projectStatusValues = Object.values(ProjectStatus) as [string, ...string[]];

export const ProjectUpdateSchema = z.object({
  id: z.number(),
  key: z.string().min(1),
  name: z.string().min(1),
  status: z.enum(projectStatusValues),
  stack: z.enum(stackCategoryValues),
  startDate: z.date(),
  endDate: z.date().optional().nullable(),
  description: z.string().min(1),
  goals: z.string().min(1).array(),
  contributions: z.string().min(1).array(),
  logoUrl: z.string().min(1),
  primaryColor: z.string().min(1),
  demoUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
});

export type ProjectUpdateSchema = z.infer<typeof ProjectUpdateSchema>;
