// Defines an object with possible themes, restricted to 'light' and 'dark'
export const themes = {
  light: "light",
  dark: "dark",
} as const;

export const themesArray = Object.values(themes); // Extracts the values from the themes object into an array

// Type representing the possible values of themes ('light' or 'dark')
export type theme = (typeof themes)[keyof typeof themes];

// Type representing a boolean value for the sound state
export type ISoundState = boolean;
