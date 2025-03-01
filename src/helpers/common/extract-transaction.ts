import type { Translation } from '@/types/translation';

export function extractTransaction(
  key: string,
  translations: Translation,
  vars?: Record<string, string | number>,
) {
  const extractedTranslation = key.split('.').reduce((acc: object, k) => {
    if (k in acc) {
      return acc[k as keyof typeof acc];
    }

    return {};
  }, translations);

  let translatedText: string = key;

  if (typeof extractedTranslation === 'string') {
    translatedText = extractedTranslation;
  }

  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      translatedText = translatedText.replace(`{{${k}}}`, String(v));
    });
  }

  return translatedText;
}
