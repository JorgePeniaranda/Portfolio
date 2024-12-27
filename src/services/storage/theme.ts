import {create} from "zustand";

import {DEFAULT_THEME, THEME_CLASSNAME, THEME_STORE_KEY} from "../../constants/common";
import {isTheme} from "../../helpers/guards/is-theme";
import {themes, themesArray, type ITheme} from "../../types/common.d";

export interface IThemeStore {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
  resetTheme: () => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<IThemeStore>((set, get) => ({
  theme: (() => {
    if (typeof window === "undefined") {
      return DEFAULT_THEME;
    }

    const localTheme = localStorage.getItem(THEME_STORE_KEY);

    // Check if the value in localStorage is a valid theme
    if (localTheme && isTheme(localTheme)) {
      return localTheme; // If valid, return the theme from localStorage
    } else {
      return DEFAULT_THEME; // If not valid or doesn't exist, use the default theme
    }
  })(),
  setTheme: (theme: ITheme) => {
    const htmlClassList = document.documentElement.classList;

    if (theme === themes.light) {
      htmlClassList.remove(THEME_CLASSNAME);
    }

    if (theme === themes.dark) {
      htmlClassList.add(THEME_CLASSNAME);
    }

    localStorage.setItem(THEME_STORE_KEY, theme);
    set({theme});
  },
  resetTheme: () => {
    get().setTheme(DEFAULT_THEME);
  },
  toggleTheme: () => {
    const store = get();
    const currentIndex = themesArray.indexOf(store.theme);
    const validIndex = currentIndex !== -1 ? currentIndex : 0;

    const nextIndex = (validIndex + 1) % themesArray.length;

    store.setTheme(themesArray[nextIndex]);
  },
}));
