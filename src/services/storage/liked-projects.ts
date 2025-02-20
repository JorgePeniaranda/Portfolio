import type { Project } from '@prisma/client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { PROJECT_LIKED_STORE_KEY } from '@/constants/common';

// Define the shape of the store's state.
export interface LikedStoreState {
  likedKeyProjects: Project['key'][];
}

// Define the actions available in the store.
export interface LikedStoreActions {
  addLikedProject(key: Project['key']): void;
  removeLikedProject(key: Project['key']): void;
  checkLikedProject(key: Project['key']): boolean;
  resetLikedProjects(): void;
}

// Create the liked projects store using Zustand with persistence enabled.
export const useProjectLikedStore = create(
  persist<LikedStoreState & LikedStoreActions>(
    (set, get) => ({
      likedKeyProjects: [],

      addLikedProject(key: Project['key']) {
        set((state) => ({
          likedKeyProjects: [...state.likedKeyProjects, key],
        }));
      },

      removeLikedProject(key: Project['key']) {
        set((state) => ({
          likedKeyProjects: state.likedKeyProjects.filter((projectKey) => projectKey !== key), // Filter out the key.
        }));
      },

      checkLikedProject(key: Project['key']) {
        return get().likedKeyProjects.includes(key);
      },

      resetLikedProjects() {
        set({ likedKeyProjects: [] });
      },
    }),
    {
      name: PROJECT_LIKED_STORE_KEY,
    },
  ),
);
