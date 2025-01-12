import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

import {SECRET_CODE_STORE_KEY} from "@/constants/common";
import {ENV} from "@/constants/env";

export interface ISecretCodeStoreState {
  secretCode: string;
  unlockedNumbers: number[];
  isComplete: boolean;
}

export interface ISecretCodeStoreActions {
  unlockOneNumber: (index: number) => void;
  resetSecretCode: () => void;
  checkIfCodeIsCompleteWithNewIndex: (index: number) => boolean;
}

/**
 * Secret code store using Zustand with persistence.
 */
export const useSecretCodeStore = create<ISecretCodeStoreState & ISecretCodeStoreActions>()(
  persist(
    (set, get) => ({
      secretCode: ENV.secret_code,
      unlockedNumbers: [0], // Start with the first number unlocked.
      isComplete: false,

      /**
       * Unlocks the next number in the secret code if conditions are met:
       * - The index must be within the bounds of the secret code.
       * - The index must not already be unlocked.
       *
       * @param index - The index of the number to unlock.
       */
      unlockOneNumber: (index: number) => {
        const {unlockedNumbers} = get();

        // Check if the index is out of bounds for the secret code.
        if (index >= ENV.secret_code.length || index < 0) {
          return;
        }

        // Make sure the index has not been unlocked.
        if (unlockedNumbers.includes(index)) {
          return;
        }

        set((state) => {
          const newUnlockedNumbers = [...state.unlockedNumbers, index];

          // Mark the state as complete if all numbers are unlocked.
          if (newUnlockedNumbers.length === ENV.secret_code.length) {
            return {unlockedNumbers: newUnlockedNumbers, isComplete: true};
          }

          return {unlockedNumbers: newUnlockedNumbers};
        });
      },

      /**
       * Checks if the secret code is complete with the new index.
       *
       * @param index - The index of the number to check.
       * @returns {boolean} True if the secret code is complete, false otherwise.
       */
      checkIfCodeIsCompleteWithNewIndex: (index: number): boolean => {
        const {unlockedNumbers} = get();

        if (unlockedNumbers.includes(index)) {
          return false;
        }

        const newUnlockedNumbers = [...unlockedNumbers, index];

        return newUnlockedNumbers.length === ENV.secret_code.length;
      },

      resetSecretCode: () => {
        set({unlockedNumbers: [0], isComplete: false});
      },
    }),
    {
      name: SECRET_CODE_STORE_KEY,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
