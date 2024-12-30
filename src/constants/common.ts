import type {ISoundState, theme} from "../types/common.d";

export const DEFAULT_LANG = "es";

//#region THEME CONFIGURATION

/**
 * Default theme for the application.
 *
 * If you change any of the theme-related values, make sure to also update the corresponding value in `theme-preference.astro`.
 *
 * @constant {ITheme}
 */
export const DEFAULT_THEME: theme = "light";

/**
 * Default sound state for the application.
 *
 * The sound state is initially set to `true`, meaning sound is enabled by default.
 *
 * @constant {ISoundState}
 */
export const DEFAULT_SOUND_STATE: ISoundState = true;

/**
 * The key used to store the theme preference in the local storage.
 *
 * @constant {string}
 */
export const THEME_STORE_KEY = "theme";

/**
 * The key used to store the sound state preference in the local storage.
 *
 * @constant {string}
 */
export const SOUND_STORE_KEY = "isSoundEnabled";

/**
 * The key used to store the secret code in the local storage.
 *
 * @constant {string}
 */
export const SECRET_CODE_STORE_KEY = "secretCode";

/**
 * The key used to store the list of liked projects in the local storage.
 *
 * @constant {string}
 */
export const PROJECT_LIKED_STORE_KEY = "likedProjects";

/**
 * The class name used for dark theme in the application.
 *
 * @constant {string}
 */
export const THEME_CLASSNAME = "dark";

//#endregion

export const MIN_DATA_FORMAT = "DD-MM-YYYY";
