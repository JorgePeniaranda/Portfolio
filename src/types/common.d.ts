export const themes = {
  light: "light",
  dark: "dark",
} as const;

export const themesArray = Object.values(themes);

export type ITheme = (typeof themes)[keyof typeof themes];

export type ISoundState = boolean;
