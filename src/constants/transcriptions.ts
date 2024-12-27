import type {ProjectStack, ProjectStatus} from "@prisma/client";

export const PROJECT_STATUS_TRANSCRIPTIONS: Record<ProjectStatus, string> = {
  FINISHED: "Terminado",
  IN_PROGRESS: "En Desarrollo",
  STALLED: "Pausado",
} as const;

export const PROJECT_STACK_TRANSCRIPTIONS: Record<ProjectStack, string> = {
  FULL_STACK: "Full-Stack",
  BACK_END: "Back-End",
  FRONT_END: "Front-End",
} as const;
