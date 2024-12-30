import type {StackCategory, ProjectStatus} from "@prisma/client";
import type {IProjectSortType} from "../types/project.d";

/**
 * A record that maps each `ProjectStatus` to a human-readable string translation.
 *
 * @constant {Record<ProjectStatus, string>}
 * @example
 * // Example usage:
 * const status = PROJECT_STATUS_TRANSCRIPTIONS.FINISHED; // "Terminado"
 */
export const PROJECT_STATUS_TRANSCRIPTIONS: Record<ProjectStatus, string> = {
  FINISHED: "Terminado", // Status for finished projects
  IN_PROGRESS: "En Desarrollo", // Status for projects in progress
  STALLED: "Pausado", // Status for stalled projects
} as const;

/**
 * A record that maps each `StackCategory` to a human-readable string translation.
 *
 * @constant {Record<StackCategory, string>}
 * @example
 * // Example usage:
 * const stack = PROJECT_STACK_TRANSCRIPTIONS.FULL_STACK; // "Full-Stack"
 */
export const PROJECT_STACK_TRANSCRIPTIONS: Record<StackCategory, string> = {
  FULL_STACK: "Full-Stack", // Full-stack development
  BACK_END: "Back-End", // Back-end development
  FRONT_END: "Front-End", // Front-end development
} as const;

/**
 * A record that maps each `ProjectSort` to a human-readable string translation.
 *
 * @constant {Record<ProjectSort, string>}
 * @example
 * // Example usage:
 * const sort = PROJECT_SORT_TRANSCRIPTIONS.LIKES; // "Favoritos"
 */
export const PROJECT_SORT_TRANSCRIPTIONS: Record<IProjectSortType, string> = {
  "liked": "Favoritos",
  "A-Z": "A-Z",
  "Z-A": "Z-A",
};
