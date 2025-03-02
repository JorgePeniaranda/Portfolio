import type { TranslationKey } from '@/types/translation';

import { useTranslations } from '@/hooks/use-translations';

export function TranslateText({
  key,
  vars,
}: {
  key: TranslationKey;
  vars?: Record<string, string | number>;
}): string {
  const { t } = useTranslations();

  return t(key, vars);
}
