import {useEffect, useState} from "react";

import {DEFAULT_THEME} from "../constants/common";
import {ChangeTheme} from "../helpers/change-theme";
import {themeStorage} from "../services/theme-storage";
import {themesArray, type ITheme} from "../types/theme.d";

export default function useTheme() {
  const [theme, setTheme] = useState<ITheme>();

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === undefined) {
        return DEFAULT_THEME;
      }

      const currentIndex = themesArray.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themesArray.length;

      return themesArray[nextIndex];
    });
  };

  useEffect(() => {
    setTheme(themeStorage.get());
  }, []);

  useEffect(() => {
    if (theme !== undefined) {
      ChangeTheme(theme);
    }
  }, [theme]);

  return {
    theme,
    toggleTheme,
  };
}
