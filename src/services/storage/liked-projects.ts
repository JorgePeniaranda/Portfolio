import type {Project} from "@prisma/client";

import {create} from "zustand";

import {PROJECT_LIKED_STORE_KEY} from "../../constants/common";
import {isNotDefined} from "../../helpers/guards/is-defined";

export interface IProjectLikedStore {
  likedKeyProjects: Project["key"][];
  setLikedProjects(likedProjects: Project["key"][]): void;
  addLikedProject(key: Project["key"]): void;
  removeLikedProject(key: Project["key"]): void;
  checkLikedProject(key: Project["key"]): boolean;
}

export const useProjectLikedStore = create<IProjectLikedStore>((set, get) => ({
  likedKeyProjects: (() => {
    if (typeof window === "undefined") {
      return [];
    }

    const storedProjectLiked = localStorage.getItem(PROJECT_LIKED_STORE_KEY);

    if (isNotDefined(storedProjectLiked)) {
      return [];
    }

    const storedProjectLikedParsed = JSON.parse(storedProjectLiked);

    if (!Array.isArray(storedProjectLikedParsed)) {
      return [];
    }

    return storedProjectLikedParsed;
  })(),
  setLikedProjects(likedProjects: Project["key"][]) {
    set(() => ({likedKeyProjects: likedProjects}));
    localStorage.setItem(PROJECT_LIKED_STORE_KEY, JSON.stringify(likedProjects));
  },
  addLikedProject(key: Project["key"]) {
    const store = get();

    store.setLikedProjects([...store.likedKeyProjects, key]);
  },
  removeLikedProject(key: Project["key"]) {
    const store = get();
    const newLikedProjects = store.likedKeyProjects.filter((projectKey) => projectKey !== key);

    store.setLikedProjects(newLikedProjects);
  },
  checkLikedProject(key: Project["key"]) {
    return get().likedKeyProjects.includes(key);
  },
}));
