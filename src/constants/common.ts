import type { ISoundState, theme } from '@/types/common.d';

export const DEFAULT_LANG = 'es';

//#region THEME CONFIGURATION

/**
 * Default theme for the application.
 *
 * If you change any of the theme-related values, make sure to also update the corresponding value in `theme-preference.astro`.
 */
export const DEFAULT_THEME: theme = 'light';

/**
 * Default sound state for the application.
 *
 * The sound state is initially set to `true`, meaning sound is enabled by default.
 */
export const DEFAULT_SOUND_STATE: ISoundState = true;

/**
 * The key used to store the theme preference in the local storage.
 */
export const THEME_STORE_KEY = 'theme';

/**
 * The key used to store the sound state preference in the local storage.
 */
export const SOUND_STORE_KEY = 'isSoundEnabled';

/**
 * The key used to store the secret code in the local storage.
 */
export const SECRET_CODE_STORE_KEY = 'secretCode';

/**
 * The key used to store the list of liked projects in the local storage.
 */
export const PROJECT_LIKED_STORE_KEY = 'likedProjects';

/**
 * The class name used for dark theme in the application.
 */
export const THEME_CLASSNAME = 'dark';

//#endregion

/**
 * The format used for printing dates in the application.
 */
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
};
