import type { TranslationKey } from '@/types/translation';

export const CollaboratorSchemaErrorMessages = {
  nickname: {
    string: 'error.validation-message.collaborator.nickname.string',
    required_error: 'error.validation-message.collaborator.nickname.required_error',
  },
  githubUsername: {
    string: 'error.validation-message.collaborator.githubUsername.string',
  },
  linkedinUsername: {
    string: 'error.validation-message.collaborator.linkedinUsername.string',
  },
} as const satisfies Record<string, Record<string, TranslationKey>>;
