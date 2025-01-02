import type {Project} from "@prisma/client";

import {create} from "zustand";
import {persist} from "zustand/middleware";

import {PROJECT_LIKED_STORE_KEY} from "@/constants/common";

// Define the shape of the store's state.
export interface ILikedStoreState {
  likedKeyProjects: Project["key"][]; // Array of project keys that are marked as liked.
}

// Define the actions available in the store.
export interface ILikedStoreActions {
  addLikedProject(key: Project["key"]): void; // Adds a project key to the liked list.
  removeLikedProject(key: Project["key"]): void; // Removes a project key from the liked list.
  checkLikedProject(key: Project["key"]): boolean; // Checks if a project is in the liked list.
}

// Create the liked projects store using Zustand with persistence enabled.
export const useProjectLikedStore = create(
  persist<ILikedStoreState & ILikedStoreActions>(
    (set, get) => ({
      likedKeyProjects: [], // Initial empty array for storing liked project keys.

      // Adds a project key to the liked projects array.
      addLikedProject(key: Project["key"]) {
        set((state) => ({
          likedKeyProjects: [...state.likedKeyProjects, key], // Add the key to the list.
        }));
      },

      // Removes a project key from the liked projects array.
      removeLikedProject(key: Project["key"]) {
        set((state) => ({
          likedKeyProjects: state.likedKeyProjects.filter((projectKey) => projectKey !== key), // Filter out the key.
        }));
      },

      // Checks if a project key is in the liked projects array.
      checkLikedProject(key: Project["key"]) {
        return get().likedKeyProjects.includes(key); // Return true if the key is in the array.
      },
    }),
    {
      name: PROJECT_LIKED_STORE_KEY, // Persist the store's state under this key.
    },
  ),
);
