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
  toggleSound: () => void;
  resetSound: () => void;
}

// Create the sound store using Zustand and enable persistence.
export const useSoundStore = create(
  persist<ISoundStoreState & ISoundStoreActions>(
    (set) => ({
      isSoundEnabled: DEFAULT_SOUND_STATE,

      toggleSound: () => {
        set((state) => ({
          isSoundEnabled: !state.isSoundEnabled,
        }));
      },

      resetSound: () => {
        set({isSoundEnabled: DEFAULT_SOUND_STATE});
      },
    }),
    {
      name: SOUND_STORE_KEY,
    },
  ),
);
