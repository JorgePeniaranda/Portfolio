import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { themes, themesArray } from '@/types/common.d'; // Assuming themes are imported like this
import { getNextTheme, useThemeStore } from '@/services/storage/theme';

// Mock the document object
beforeAll(() => {
  global.document = {
    ...global?.document,
    documentElement: {
      ...global?.document?.documentElement,
      classList: {
        ...global?.document?.documentElement?.classList,
        add: vi.fn(),
        remove: vi.fn(),
      },
    },
  };
});

describe('useThemeStore', () => {
  afterEach(() => {
    useThemeStore.getState().resetTheme(); // Reset theme after each test
  });

  it('should toggle theme from default to next theme', () => {
    useThemeStore.getState().toggleTheme();
    const currentTheme = useThemeStore.getState().theme;

    // Check if the theme has been toggled to the next one
    expect(currentTheme).not.toBe(themes.light);
  });

  it('should reset theme to default', () => {
    useThemeStore.getState().toggleTheme();
    useThemeStore.getState().resetTheme();

    const currentTheme = useThemeStore.getState().theme;

    expect(currentTheme).toBe(themes.light);
  });

  it('should cycle through themes when toggle is called multiple times', () => {
    useThemeStore.getState().toggleTheme();
    let currentTheme = useThemeStore.getState().theme;

    expect(currentTheme).not.toBe(themes.light);

    useThemeStore.getState().toggleTheme();
    currentTheme = useThemeStore.getState().theme;
    expect(currentTheme).toBe(themes.light);
  });
});

describe('getNextTheme function', () => {
  it('should return the next theme when the current theme is valid', () => {
    const currentTheme = themes.light;
    const nextTheme = getNextTheme(currentTheme);

    expect(nextTheme).toBe(themes.dark);
  });

  it('should return the first theme if the current theme is not in the list', () => {
    const currentTheme = 'red'; // Not in the list
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nextTheme = getNextTheme(currentTheme as any);

    expect(nextTheme).toBe(themesArray[1]); // Default to the first theme
  });

  it('should cycle to the first theme after the last theme', () => {
    const currentTheme = 'green';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nextTheme = getNextTheme(currentTheme as any);

    expect(nextTheme).toBe(themesArray[1]);
  });
});
