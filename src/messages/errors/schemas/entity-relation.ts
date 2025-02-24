import type { TranslationKey } from '@/types/translation';

export const EntityRelationSchemaErrorMessages = {
  idSource: {
    number: 'error.validation-message.entity-relation.idSource.number',
    required_error: 'error.validation-message.entity-relation.idSource.required_error',
  },
  idTarget: {
    number: 'error.validation-message.entity-relation.idTarget.number',
    required_error: 'error.validation-message.entity-relation.idTarget.required_error',
  },
} as const satisfies Record<string, Record<string, TranslationKey>>;
