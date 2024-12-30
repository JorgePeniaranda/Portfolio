import {themesArray, type theme} from "../../types/common.d";

export function isTheme(value: unknown): value is theme {
  // @ts-expect-error: this is a custom type guard
  return themesArray.includes(value);
}
