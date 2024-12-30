import {ProjectStatus, StackCategory} from "@prisma/client";
import {z} from "zod";

const stackCategoryValues = Object.values(StackCategory) as [
  (typeof StackCategory)[keyof typeof StackCategory],
  ...(typeof StackCategory)[keyof typeof StackCategory][],
];
const projectStatusValues = Object.values(ProjectStatus) as [
  (typeof ProjectStatus)[keyof typeof ProjectStatus],
  ...(typeof ProjectStatus)[keyof typeof ProjectStatus][],
];

export const ProjectCreateSchema = z.object({
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

export type ProjectCreateSchema = z.infer<typeof ProjectCreateSchema>;

export const ProjectCreateDefaultValues: ProjectCreateSchema = {
  key: "",
  name: "",
  status: ProjectStatus.IN_PROGRESS,
  stack: StackCategory.FRONT_END,
  startDate: new Date(),
  endDate: null,
  description: "",
  goals: [],
  contributions: [],
  logoUrl: "",
  primaryColor: "",
  demoUrl: null,
  githubUrl: null,
};
