import { afterEach, describe, expect, it } from 'vitest';

import { DEFAULT_SOUND_STATE } from '@/constants/common';
import { useSoundStore } from '@/services/storage/sound';

describe('useSoundStore', () => {
  afterEach(() => {
    useSoundStore.getState().resetSound();
  });

  it('should toggle the sound state', () => {
    // Initial state should be the default
    expect(useSoundStore.getState().isSoundEnabled).toBe(DEFAULT_SOUND_STATE);

    // Toggle sound state
    useSoundStore.getState().toggleSound();
    expect(useSoundStore.getState().isSoundEnabled).toBe(!DEFAULT_SOUND_STATE);

    // Toggle back to default state
    useSoundStore.getState().toggleSound();
    expect(useSoundStore.getState().isSoundEnabled).toBe(DEFAULT_SOUND_STATE);
  });

  it('should reset the sound state to default', () => {
    // Change the sound state
    useSoundStore.getState().toggleSound();
    expect(useSoundStore.getState().isSoundEnabled).not.toBe(DEFAULT_SOUND_STATE);

    // Reset the sound state
    useSoundStore.getState().resetSound();
    expect(useSoundStore.getState().isSoundEnabled).toBe(DEFAULT_SOUND_STATE);
  });
});
