// Type representing the possible values of themes ('light' or 'dark')
export const themes = {
  light: 'light',
  dark: 'dark',
} as const;

export type theme = (typeof themes)[keyof typeof themes];

export const themesArray = Object.values(themes);

// Type representing a boolean value for the sound state
export type ISoundState = boolean;

export interface IBreadCrumb {
  label: string;
  href?: string;
}
