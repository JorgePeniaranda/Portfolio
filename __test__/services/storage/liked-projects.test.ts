import { afterEach, describe, expect, it } from 'vitest';

import { useProjectLikedStore } from '@/services/storage/liked-projects';

describe('useProjectLikedStore', () => {
  afterEach(() => {
    useProjectLikedStore.getState().resetLikedProjects();
  });

  it('should add a liked project', () => {
    useProjectLikedStore.getState().addLikedProject('project1');

    expect(useProjectLikedStore.getState().likedKeyProjects).toEqual(['project1']);
  });

  it('should remove a liked project', () => {
    useProjectLikedStore.getState().addLikedProject('project5');
    useProjectLikedStore.getState().removeLikedProject('project5');

    expect(useProjectLikedStore.getState().likedKeyProjects).toEqual([]);
  });

  it('should check if a project is liked', () => {
    useProjectLikedStore.getState().addLikedProject('project1');
    const isLiked = useProjectLikedStore.getState().checkLikedProject('project1');

    expect(isLiked).toBe(true);
  });

  it('should return false if the project is not liked', () => {
    const isLiked = useProjectLikedStore.getState().checkLikedProject('project2');

    expect(isLiked).toBe(false);
  });
});
