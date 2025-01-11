import type {Project} from "@prisma/client";

export const TEST_PROJECT_MOCK: Project = {
  id: 1,
  key: "test-project",
  name: "Test Project",
  status: "IN_PROGRESS",
  stackCategory: "FULL_STACK",
  description: "A test project",
  contributions: "A test contribution",
  goals: "A test goal",
  demoUrl: "https://example.com",
  githubUrl: "https://github.com",
  logoUrl: "https://example.com/logo.png",
  primaryColor: "#000000",
  startDate: new Date("2021-01-01T00:00:00.000Z"),
  endDate: new Date("2023-01-01T00:00:00.000Z"),
  createdAt: new Date("2021-01-01T00:00:00.000Z"),
  updatedAt: new Date("2023-01-01T00:00:00.000Z"),
};
