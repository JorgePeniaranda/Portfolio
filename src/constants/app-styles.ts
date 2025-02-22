import type { ProjectStatus, StackCategory } from '@prisma/client';

//#region Navbar
/**
 * Configuration for the Navbar animation, including transform and spring properties.
 *
 * - `transform`: Defines the transformation of the navbar's position based on scroll or other input.
 * - `spring`: Defines the spring physics for the animation, controlling the movement's smoothness and speed.
 */
export const NavbarAnimationConfig = {
  transform: {
    inputRange: [-150, 0, 150], // Defines the input range for the transformation
    outputRange: [40, 100, 40], // Corresponding output range for the transformation
  },
  spring: {
    mass: 0.1, // Defines the mass of the spring
    stiffness: 150, // Defines the stiffness of the spring
    damping: 12, // Controls the damping (smoothness) of the animation
  },
};
//#endregion

//#region Project-Details styles
/**
 * Defines the style for each project status using Tailwind CSS classes.
 * The styles are mapped to the `ProjectStatus` enum values.
 */
const StatusStyle: Record<ProjectStatus, string> = {
  FINISHED: 'text-green-500',
  IN_PROGRESS: 'text-yellow-500',
  STALLED: 'text-red-500',
} as const;

/**
 * Defines the style for each project stack using Tailwind CSS classes.
 * The styles are mapped to the `StackCategory` enum values.
 */
const StackStyle: Record<StackCategory, string> = {
  FULL_STACK: 'bg-red-500/70 text-white dark:bg-red-500',
  BACK_END: 'bg-blue-500/70 text-white dark:bg-blue-500',
  FRONT_END: 'bg-green-500/70 text-white dark:bg-green-500',
} as const;

/**
 * Object containing styles for project status and stack.
 * StatusStyle - Styles for project statuses.
 * StackStyle - Styles for project stacks.
 */
export const ProjectDetailsStyles = {
  StatusStyle,
  StackStyle,
} as const;
//#endregion
