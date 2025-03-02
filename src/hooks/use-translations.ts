import type { TranslationKey } from '@/types/translation';

import { useStore } from '@nanostores/react';
import { useMemo } from 'react';

import { langStore } from '@/services/storage/lang';
import { extractTransaction } from '@/helpers/common/extract-transaction';
import { I18N_TRANSLATIONS } from '@/constants/i18n';

export function useTranslations() {
  const lang = useStore(langStore);

  const currentTranslations = useMemo(() => {
    return I18N_TRANSLATIONS[lang];
  }, [lang]);

  function t(key: TranslationKey, vars?: Record<string, string | number>): string {
    return extractTransaction(key, currentTranslations, vars);
  }

  return {
    currentLang: lang,
    t,
  };
}
