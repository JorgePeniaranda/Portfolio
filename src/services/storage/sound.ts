import type {ISoundState} from "../../types/common.d";

import {create} from "zustand";

import {DEFAULT_SOUND_STATE} from "../../constants/common";
import {isNotDefined} from "../../helpers/guards/is-defined";

export interface ISoundStore {
  isSoundEnabled: ISoundState;
  setSoundEnabled: (newState: ISoundState) => void;
  toggleSound: () => void;
  resetSound: () => void;
}

export const useSoundStore = create<ISoundStore>((set) => ({
  isSoundEnabled: (() => {
    if (typeof window === "undefined") {
      return DEFAULT_SOUND_STATE;
    }

    const storedSound = localStorage.getItem("isSoundEnabled");

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
    localStorage.setItem("isSoundEnabled", JSON.stringify(newState)); // Persist sound state to localStorage
    set({isSoundEnabled: newState});
  },
  toggleSound: () => {
    set((state) => {
      const newSoundState = !state.isSoundEnabled;

      localStorage.setItem("isSoundEnabled", JSON.stringify(newSoundState)); // Persist toggle state

      return {isSoundEnabled: newSoundState};
    });
  },
  resetSound: () => {
    localStorage.setItem("isSoundEnabled", JSON.stringify(true)); // Persist reset to default
    set({isSoundEnabled: DEFAULT_SOUND_STATE});
  },
}));
