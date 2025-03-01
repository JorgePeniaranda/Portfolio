import type { AvailableLanguages, Translation } from '@/types/translation';

import esJson from '@/i18n/es.json';
import enJson from '@/i18n/en.json';

export const AVAILABLE_LANGUAGES = ['es', 'en'] as const;

export const I18N_TRANSLATIONS = {
  es: esJson,
  en: enJson,
} as const satisfies Record<AvailableLanguages, Translation>;
