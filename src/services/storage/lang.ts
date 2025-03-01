import type { AvailableLanguages } from '@/types/translation';

import { atom } from 'nanostores';

import { DEFAULT_LANG } from '@/constants/common';

export const langStore = atom<AvailableLanguages>(DEFAULT_LANG);
