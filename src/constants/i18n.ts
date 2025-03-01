import type { AvailableLanguages, Translation } from '@/types/translation';

import esJson from '@/i18n/es.json';

export const AVAILABLE_LANGUAGES = ['es'] as const;

export const DEFAULT_LANG = 'es' as const;

export const I18N_TRANSLATIONS = {
  es: esJson,
} as const satisfies Record<AvailableLanguages, Translation>;
