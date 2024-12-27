import type {ProjectStack, ProjectStatus} from "@prisma/client";

//#region Navbar

/**
 * Configuration for the Navbar animation, including transform and spring properties.
 *
 * - `transform`: Defines the transformation of the navbar's position based on scroll or other input.
 * - `spring`: Defines the spring physics for the animation, controlling the movement's smoothness and speed.
 *
 * @constant {object}
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
 *
 * @constant {Record<ProjectStatus, string>}
 */
const StatusStyle: Record<ProjectStatus, string> = {
  FINISHED: "text-green-500", // Style for finished projects (green)
  IN_PROGRESS: "text-yellow-500", // Style for in-progress projects (yellow)
  STALLED: "text-red-500", // Style for stalled projects (red)
} as const;

/**
 * Defines the style for each project stack using Tailwind CSS classes.
 * The styles are mapped to the `ProjectStack` enum values.
 *
 * @constant {Record<ProjectStack, string>}
 */
const StackStyle: Record<ProjectStack, string> = {
  FULL_STACK: "bg-red-500/70 text-white dark:bg-red-500", // Full-stack style (red background)
  BACK_END: "bg-blue-500/70 text-white dark:bg-blue-500", // Back-end style (blue background)
  FRONT_END: "bg-green-500/70 text-white dark:bg-green-500", // Front-end style (green background)
} as const;

/**
 * Object containing styles for project status and stack.
 *
 * @constant {object} ProjectDetailsStyles
 * @property {Record<ProjectStatus, string>} StatusStyle - Styles for project statuses.
 * @property {Record<ProjectStack, string>} StackStyle - Styles for project stacks.
 */
export const ProjectDetailsStyles = {
  StatusStyle,
  StackStyle,
};
//#endregion
