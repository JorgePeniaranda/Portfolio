import type {ISoundState, ITheme} from "../types/common.d";

export const DEFAULT_LANG = "es";

//#region THEME CONFIGURATION
/**
 * if change some value, remember to change the value in theme-preference.astro
 */
export const DEFAULT_THEME: ITheme = "light";

export const DEFAULT_SOUND_STATE: ISoundState = true;

export const THEME_STORE_KEY = "theme";

export const SOUND_STORE_KEY = "isSoundEnabled";

export const PROJECT_LIKED_STORE_KEY = "likedProjects";

export const THEME_CLASSNAME = "dark";
//#endregion
