import type { TranslationKey } from '@/types/translation';

export const ProjectSchemaErrorMessages = {
  key: {
    string: 'error.validation-message.project.key.string',
    required_error: 'error.validation-message.project.key.required_error',
  },
  name: {
    string: 'error.validation-message.project.name.string',
    required_error: 'error.validation-message.project.name.required_error',
  },
  status: {
    enum: 'error.validation-message.project.status.enum',
  },
  stackCategory: {
    enum: 'error.validation-message.project.stackCategory.enum',
  },
  startDate: {
    date: 'error.validation-message.project.startDate.date',
    required_error: 'error.validation-message.project.startDate.required_error',
  },
  endDate: {
    date: 'error.validation-message.project.endDate.date',
  },
  description: {
    string: 'error.validation-message.project.description.string',
    required_error: 'error.validation-message.project.description.required_error',
  },
  goals: {
    string: 'error.validation-message.project.goals.string',
    required_error: 'error.validation-message.project.goals.required_error',
  },
  contributions: {
    string: 'error.validation-message.project.contributions.string',
    required_error: 'error.validation-message.project.contributions.required_error',
  },
  logoUrl: {
    string: 'error.validation-message.project.logoUrl.string',
    required_error: 'error.validation-message.project.logoUrl.required_error',
  },
  primaryColor: {
    string: 'error.validation-message.project.primaryColor.string',
    required_error: 'error.validation-message.project.primaryColor.required_error',
    invalid_hex_color: 'error.validation-message.project.primaryColor.invalid_hex_color',
  },
  demoUrl: {
    string: 'error.validation-message.project.demoUrl.string',
  },
  githubUrl: {
    string: 'error.validation-message.project.githubUrl.string',
  },
} as const satisfies Record<string, Record<string, TranslationKey>>;
