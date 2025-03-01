import type { SoundState, theme } from '@/types/common.d';

// MARK: default values
export const DEFAULT_LANG = 'es';

export const DEFAULT_THEME: theme = 'light';

export const DEFAULT_SOUND_STATE: SoundState = true;

// MARK: storage keys
export const THEME_STORE_KEY = 'theme';

export const SOUND_STORE_KEY = 'isSoundEnabled';

export const SECRET_CODE_STORE_KEY = 'secretCode';

export const PROJECT_LIKED_STORE_KEY = 'likedProjects';

// MARK: constants
export const THEME_CLASSNAME = 'dark';

export const DATA_FORMAT = 'DD-MM-YYYY';

/**
 * Constants for Prisma error codes and their corresponding HTTP status codes.
 */
export const PRISMA_STATUS_CODE_STATUS_CATEGORY = {
  400: ['P2000', 'P2006', 'P2009', 'P2013', 'P2019', 'P2020', 'P2026'],
  404: ['P2001', 'P2015', 'P2018', 'P2021', 'P2022', 'P2025'],
  409: ['P2002', 'P2014'],
  422: ['P2003', 'P2005', 'P2011', 'P2012', 'P2023'],
  500: [
    'P1000',
    'P1001',
    'P1002',
    'P1003',
    'P1008',
    'P1010',
    'P1011',
    'P1015',
    'P1016',
    'P2024',
    'P2028',
    'P2034',
    'P2035',
    'P2036',
    'P2037',
  ],
} as Readonly<Record<string, string[]>>;
