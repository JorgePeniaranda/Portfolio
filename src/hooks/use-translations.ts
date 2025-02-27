import type { TranslationKey } from '@/types/translation';

import { useStore } from '@nanostores/react';

import { langStore } from '@/services/storage/lang';

export default function useTranslations() {
  const lang = useStore(langStore);

  function t(key: TranslationKey, vars?: Record<string, string | number>): string {
    let translatedText: string = key;

    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        translatedText = translatedText.replace(`{{${k}}}`, String(v));
      });
    }

    return translatedText;
  }

  return {
    currentLang: lang,
    t,
  };
}
