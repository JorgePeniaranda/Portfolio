import type {ITheme} from "../types/common.d";

import {DEFAULT_THEME, THEME_STORE_KEY} from "../constants/common";
import {isTheme} from "../helpers/guards/is-theme";

export const themeStorage = {
  get(): ITheme {
    const localTheme = localStorage.getItem(THEME_STORE_KEY);

    if (!isTheme(localTheme)) {
      localStorage.setItem(THEME_STORE_KEY, DEFAULT_THEME);

      return DEFAULT_THEME;
    }

    return localTheme;
  },
  save(theme: ITheme): void {
    localStorage.setItem(THEME_STORE_KEY, theme);
  },
  delete(): void {
    localStorage.removeItem(THEME_STORE_KEY);
  },
} as const;
