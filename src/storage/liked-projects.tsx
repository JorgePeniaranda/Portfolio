import type {IProjectLikedStorage} from "./liked-projects.d";

import {create} from "zustand";

export const useProjectLikedStorage = create<IProjectLikedStorage>((set, get) => ({
  likedKeyProjects: [],
  addLikedProject(key: string) {
    console.log(get().likedKeyProjects);
    set((state) => ({likedKeyProjects: [...state.likedKeyProjects, key]}));
  },
  removeLikedProject(key: string) {
    console.log(get().likedKeyProjects);
    set((state) => ({
      likedKeyProjects: state.likedKeyProjects.filter((likedID) => likedID !== key),
    }));
  },
  checkLikedProject(key: string) {
    return get().likedKeyProjects.includes(key);
  },
}));
