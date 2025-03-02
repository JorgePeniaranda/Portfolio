import type { AvailableLanguages, TranslationKey } from '@/types/translation';

import { isDefined } from '../guards/is-defined';

import { extractTransaction } from './extract-transaction';

import { AVAILABLE_LANGUAGES, DEFAULT_LANG } from '@/constants/common';
import { I18N_TRANSLATIONS } from '@/constants/i18n';

export function useAstroTraslation(lang?: string) {
  const t = (key: TranslationKey, vars?: Record<string, string | number>) => {
    let currentLang: AvailableLanguages = DEFAULT_LANG;

    if (isDefined(lang) && AVAILABLE_LANGUAGES.includes(lang as AvailableLanguages)) {
      currentLang = lang as AvailableLanguages;
    }

    return extractTransaction(key, I18N_TRANSLATIONS[currentLang], vars);
  };

  return { t };
}
