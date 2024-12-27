import {create} from "zustand";

export interface IProjectLikedStore {
  likedKeyProjects: string[];
  addLikedProject(key: string): void;
  removeLikedProject(key: string): void;
  checkLikedProject(key: string): boolean;
}

export const useProjectLikedStore = create<IProjectLikedStore>((set, get) => ({
  likedKeyProjects: [],
  addLikedProject(key: string) {
    set((state) => ({likedKeyProjects: [...state.likedKeyProjects, key]}));
  },
  removeLikedProject(key: string) {
    set((state) => ({
      likedKeyProjects: state.likedKeyProjects.filter((likedID) => likedID !== key),
    }));
  },
  checkLikedProject(key: string) {
    return get().likedKeyProjects.includes(key);
  },
}));
