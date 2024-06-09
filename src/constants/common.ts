import type {ITheme} from "../types/theme";

export const DEFAULT_LANG = "es";

//#region THEME CONFIGURATION
/**
 * if change some value, remember to change the value in theme-preference.astro
 */
export const DEFAULT_THEME: ITheme = "light";

export const THEME_STORAGE_KEY = "theme";

export const THEME_CLASSNAME = "dark";
//#endregion