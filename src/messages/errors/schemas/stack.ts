import type { TranslationKey } from '@/types/translation';

export const StackSchemaErrorMessages = {
  key: {
    string: 'error.validation-message.stack.key.string',
    required_error: 'error.validation-message.stack.key.required_error',
  },
  name: {
    string: 'error.validation-message.stack.name.string',
    required_error: 'error.validation-message.stack.name.required_error',
  },
  description: {
    string: 'error.validation-message.stack.description.string',
    required_error: 'error.validation-message.stack.description.required_error',
  },
  category: {
    enum: 'error.validation-message.stack.category.enum',
  },
  type: {
    enum: 'error.validation-message.stack.type.enum',
  },
  iconUrl: {
    string: 'error.validation-message.stack.iconUrl.string',
    required_error: 'error.validation-message.stack.iconUrl.required_error',
  },
} as const satisfies Record<string, Record<string, TranslationKey>>;
