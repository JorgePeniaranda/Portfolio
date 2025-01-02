import type {ISoundState} from "@/types/common.d";

import {create} from "zustand";
import {persist} from "zustand/middleware";

import {DEFAULT_SOUND_STATE, SOUND_STORE_KEY} from "@/constants/common";

// Define the shape of the store's state.
export interface ISoundStoreState {
  isSoundEnabled: ISoundState; // Boolean indicating if sound is enabled or not.
}

// Define the actions available in the store.
export interface ISoundStoreActions {
  toggleSound: () => void; // Toggles the sound on or off.
  resetSound: () => void; // Resets the sound state to its default.
}

// Create the sound store using Zustand and enable persistence.
export const useSoundStore = create(
  persist<ISoundStoreState & ISoundStoreActions>(
    (set) => ({
      isSoundEnabled: DEFAULT_SOUND_STATE, // Initial sound state.

      // Toggles the sound state between enabled and disabled.
      toggleSound: () => {
        set((state) => ({
          isSoundEnabled: !state.isSoundEnabled, // Toggle the sound state.
        }));
      },

      // Resets the sound state to the default value.
      resetSound: () => {
        set({isSoundEnabled: DEFAULT_SOUND_STATE});
      },
    }),
    {
      name: SOUND_STORE_KEY, // Persist the store's state under this key.
    },
  ),
);
