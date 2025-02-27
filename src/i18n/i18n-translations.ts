import type { Translation } from '@/types/translation';

import esJson from './es.json';

export const I18N_TRANSLATIONS = {
  es: esJson,
} as const satisfies Record<string, Translation>;
