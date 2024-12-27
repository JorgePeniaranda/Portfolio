import type {ISoundState} from "../../types/common.d";

import {create} from "zustand";

import {DEFAULT_SOUND_STATE, SOUND_STORE_KEY} from "../../constants/common";
import {isNotDefined} from "../../helpers/guards/is-defined";

export interface ISoundStore {
  isSoundEnabled: ISoundState;
  setSoundEnabled: (newState: ISoundState) => void;
  toggleSound: () => void;
  resetSound: () => void;
}

export const useSoundStore = create<ISoundStore>((set, get) => ({
  isSoundEnabled: (() => {
    if (typeof window === "undefined") {
      return DEFAULT_SOUND_STATE;
    }

    const storedSound = localStorage.getItem(SOUND_STORE_KEY);

    if (isNotDefined(storedSound)) {
      return DEFAULT_SOUND_STATE;
    }

    const storedSoundParsed = JSON.parse(storedSound);

    if (typeof storedSound !== "boolean") {
      return DEFAULT_SOUND_STATE;
    }

    return storedSoundParsed;
  })(),
  setSoundEnabled: (newState: ISoundState) => {
    localStorage.setItem(SOUND_STORE_KEY, JSON.stringify(newState)); // Persist sound state to localStorage
    set({isSoundEnabled: newState});
  },
  toggleSound: () => {
    const newSoundState = !get().isSoundEnabled;

    get().setSoundEnabled(newSoundState);
  },
  resetSound: () => {
    get().setSoundEnabled(DEFAULT_SOUND_STATE);
  },
}));
