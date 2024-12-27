import type {Project} from "@prisma/client";

import {useMemo} from "react";

import {ProjectCard} from "../../molecules/cards/project-card";
import {useProjectLikedStore} from "../../../services/storage/liked-projects";

export function SortedListOfProjectCardsByFavorites({
  projects,
}: {
  projects: Pick<Project, "id" | "key" | "name" | "logoUrl" | "primaryColor">[];
}) {
  const {likedKeyProjects} = useProjectLikedStore();

  const sortedProjects = useMemo(() => {
    return projects.sort((a, b) => {
      const aIsLiked = likedKeyProjects.includes(a.key);
      const bIsLiked = likedKeyProjects.includes(b.key);

      if (aIsLiked && !bIsLiked) {
        return -1;
      }

      if (!aIsLiked && bIsLiked) {
        return 1;
      }

      return 0;
    });
  }, [projects, likedKeyProjects]);

  return (
    <>
      {sortedProjects.map((project) => (
        <ProjectCard
          key={project.key}
          logoURL={project.logoUrl}
          name={project.name}
          primaryColor={project.primaryColor}
          projectKey={project.key}
        />
      ))}
    </>
  );
}
