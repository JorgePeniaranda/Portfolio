import type { TranslationKey } from '@/types/translation';
import type { ProjectStatus, StackCategory, StackType } from '@prisma/client';

export const PROJECT_STATUS_TRANSCRIPTIONS: Record<ProjectStatus, TranslationKey> = {
  FINISHED: 'enums.project-status.finished', // Status for finished projects
  IN_PROGRESS: 'enums.project-status.in-progress', // Status for projects in progress
  STALLED: 'enums.project-status.stalled', // Status for stalled projects
} as const;

export const STACK_CATEGORY_TRANSCRIPTIONS: Record<StackCategory, TranslationKey> = {
  FULL_STACK: 'enums.stack-category.full-stack',
  BACK_END: 'enums.stack-category.back-end',
  FRONT_END: 'enums.stack-category.front-end',
} as const;

export const STACK_TYPE_TRANSCRIPTIONS: Record<StackType, TranslationKey> = {
  DATABASE: 'enums.stack-type.database',
  FRAMEWORK: 'enums.stack-type.framework',
  LANGUAGE: 'enums.stack-type.language',
  LIBRARY: 'enums.stack-type.library',
  TOOL: 'enums.stack-type.tool',
} as const;
