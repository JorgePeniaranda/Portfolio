import type {ProjectStack, ProjectStatus} from "@prisma/client";

//#region Navbar
export const NavbarAnimationConfig = {
  transform: {
    inputRange: [-150, 0, 150],
    outputRange: [40, 100, 40],
  },
  spring: {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  },
};
//#endregion

//#region Project-Details styles
const StatusStyle: Record<ProjectStatus, string> = {
  FINISHED: "text-green-500",
  IN_PROGRESS: "text-yellow-500",
  STALLED: "text-red-500",
} as const;

const StackStyle: Record<ProjectStack, string> = {
  FULL_STACK: "bg-red-500/70 text-white dark:bg-red-500",
  BACK_END: "bg-blue-500/70 text-white dark:bg-blue-500",
  FRONT_END: "bg-green-500/70 text-white dark:bg-green-500",
} as const;

export const ProjectDetailsStyles = {
  StatusStyle,
  StackStyle,
};
////#endregion
