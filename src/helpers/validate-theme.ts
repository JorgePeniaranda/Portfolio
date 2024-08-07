import {themesArray, type ITheme} from "../types/theme.d";

export function isTheme(value: unknown): value is ITheme {
  // @ts-expect-error: this is a custom type guard
  return themesArray.includes(value);
}
