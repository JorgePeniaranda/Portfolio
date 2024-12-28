export const ProjectSortType = {
  LIKED: "liked",
  A_Z: "A-Z",
  Z_A: "Z-A",
} as const;

export type IProjectSortType = (typeof ProjectSortType)[keyof typeof ProjectSortType];
