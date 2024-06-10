import type { ITheme } from '../types/theme.d'

import { DEFAULT_THEME, THEME_STORAGE_KEY } from '../constants/common'
import { isTheme } from '../helpers/validate-theme'

export const themeStorage = {
  get(): ITheme {
    const localTheme = localStorage.getItem(THEME_STORAGE_KEY)

    if (!isTheme(localTheme)) {
      localStorage.setItem(THEME_STORAGE_KEY, DEFAULT_THEME)

      return DEFAULT_THEME
    }

    return localTheme
  },
  save(theme: ITheme): void {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  },
  delete(): void {
    localStorage.removeItem(THEME_STORAGE_KEY)
  }
} as const
