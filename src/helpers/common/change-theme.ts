import {THEME_CLASSNAME} from "../../constants/common";
import {themeStorage} from "../../services/storage/theme-storage";
import {themes, type ITheme} from "../../types/theme";

export function ChangeTheme(theme: ITheme): void {
  const htmlClassList = document.documentElement.classList;

  if (theme === themes.light) {
    htmlClassList.remove(THEME_CLASSNAME);
  }

  if (theme === themes.dark) {
    htmlClassList.add(THEME_CLASSNAME);
  }

  themeStorage.save(theme);
}
