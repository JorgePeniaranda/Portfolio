import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_THEME, THEME_CLASSNAME, THEME_STORE_KEY } from '@/constants/common';
import { themes, themesArray, type theme } from '@/types/common.d';

// Define the shape of the store's state.
export interface IThemeStoreState {
  theme: theme;
}

// Define the actions available in the store.
export interface IThemeStoreActions {
  resetTheme: () => void;
  toggleTheme: () => void;
}

// Create the theme store using Zustand and enable persistence.
export const useThemeStore = create<IThemeStoreState & IThemeStoreActions>()(
  persist(
    (set) => ({
      theme: DEFAULT_THEME,

      toggleTheme: () => {
        set((state) => {
          const nextTheme = getNextTheme(state.theme);

          // Update the HTML element's class to reflect the new theme.
          updateHTMLTheme(nextTheme);

          return { theme: nextTheme };
        });
      },

      resetTheme: () => {
        updateHTMLTheme(DEFAULT_THEME);
        set({ theme: DEFAULT_THEME });
      },
    }),
    { name: THEME_STORE_KEY },
  ),
);

// MARK: Helpers

/**
 * Gets the next theme in the list of available themes.
 * If the current theme is not found, it defaults to the first theme in the list.
 */
export function getNextTheme(currentTheme: theme): theme {
  const currentIndex = themesArray.indexOf(currentTheme);
  const validIndex = currentIndex !== -1 ? currentIndex : 0;

  // Cycle through the themes in a circular manner.
  return themesArray[(validIndex + 1) % themesArray.length];
}

/**
 * Updates the theme class in the `<html>` element.
 * Adds or removes the appropriate class based on the selected theme.
 */
function updateHTMLTheme(theme: theme) {
  const htmlClassList = document.documentElement.classList;

  if (theme === themes.light) {
    htmlClassList.remove(THEME_CLASSNAME);
  } else if (theme === themes.dark) {
    htmlClassList.add(THEME_CLASSNAME);
  }
}
