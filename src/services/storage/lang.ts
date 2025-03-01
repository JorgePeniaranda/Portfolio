import type { AvailableLanguages } from '@/types/translation';

import { atom } from 'nanostores';

export const langStore = atom<AvailableLanguages>('es');
