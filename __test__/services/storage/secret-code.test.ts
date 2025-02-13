import { afterEach, describe, expect, it } from 'vitest';

import { ENV } from '@/constants/env';
import { useSecretCodeStore } from '@/services/storage/secret-code';

describe('useSecretCodeStore', () => {
  afterEach(() => {
    useSecretCodeStore.getState().resetSecretCode();
  });

  it('should unlock the first number', () => {
    useSecretCodeStore.getState().unlockOneNumber(1);

    expect(useSecretCodeStore.getState().unlockedNumbers).toEqual([0, 1]);
  });

  it('should not unlock the same number twice', () => {
    useSecretCodeStore.getState().unlockOneNumber(1);
    useSecretCodeStore.getState().unlockOneNumber(1);

    expect(useSecretCodeStore.getState().unlockedNumbers).toEqual([0, 1]);
  });

  it('should not unlock a number out of bounds', () => {
    // Try unlocking a number out of bounds
    useSecretCodeStore.getState().unlockOneNumber(-1); // Invalid index
    useSecretCodeStore.getState().unlockOneNumber(ENV.secret_code.length); // Invalid index

    expect(useSecretCodeStore.getState().unlockedNumbers).toEqual([0]);
  });

  it('should mark the code as complete when all numbers are unlocked', () => {
    // Unlock all numbers in the secret code
    ENV.secret_code.split('').forEach((_, index) => {
      useSecretCodeStore.getState().unlockOneNumber(index);
    });

    expect(useSecretCodeStore.getState().isComplete).toBe(true);
  });

  it('should check if the secret code is complete with new index', () => {
    // Unlock part of the code
    useSecretCodeStore.getState().unlockOneNumber(1);

    const isComplete = useSecretCodeStore.getState().checkIfCodeIsCompleteWithNewIndex(2);

    expect(isComplete).toBe(false);
  });

  it('should reset the secret code', () => {
    // Unlock some numbers
    useSecretCodeStore.getState().unlockOneNumber(1);
    useSecretCodeStore.getState().unlockOneNumber(2);

    // Reset the code
    useSecretCodeStore.getState().resetSecretCode();

    expect(useSecretCodeStore.getState().unlockedNumbers).toEqual([0]);
    expect(useSecretCodeStore.getState().isComplete).toBe(false);
  });
});
