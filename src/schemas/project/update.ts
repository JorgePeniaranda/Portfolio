import {ProjectStatus, StackCategory} from "@prisma/client";
import {z} from "zod";

const stackCategoryValues = Object.values(StackCategory) as [string, ...string[]];
const projectStatusValues = Object.values(ProjectStatus) as [string, ...string[]];

export const ProjectUpdateSchema = z.object({
  key: z.string(),
  name: z.string(),
  status: z.enum(projectStatusValues),
  stack: z.enum(stackCategoryValues),
  startDate: z.date(),
  endDate: z.date().optional().nullable(),
  description: z.string(),
  goals: z.string().array(),
  contributions: z.string().array(),
  logoURl: z.string(),
  primaryColor: z.string(),
  demoUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
});

export type ProjectUpdateSchema = z.infer<typeof ProjectUpdateSchema>;
