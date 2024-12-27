export interface IProjectLikedStorage {
  likedKeyProjects: string[];
  addLikedProject(key: string): void;
  removeLikedProject(key: string): void;
  checkLikedProject(key: string): boolean;
}
