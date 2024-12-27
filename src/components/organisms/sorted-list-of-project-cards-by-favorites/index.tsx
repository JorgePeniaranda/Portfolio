import type {Project} from "@prisma/client";

import {useMemo} from "react";

import {ProjectCard} from "../../molecules/cards/project-card";
import {useProjectLikedStore} from "../../../services/storage/liked-projects";

/**
 * Component that renders a list of project cards, sorted by favorites.
 * The list is sorted such that liked projects appear first.
 *
 * @param {object} props - The component props.
 * @param {Array<Pick<Project, "id" | "key" | "name" | "logoUrl" | "primaryColor">>} props.projects - The list of projects to display.
 * @returns {JSX.Element} A sorted list of project cards.
 */
export function SortedListOfProjectCardsByFavorites({
  projects,
}: {
  projects: Pick<Project, "id" | "key" | "name" | "logoUrl" | "primaryColor">[];
}) {
  // Retrieve the list of liked projects from the store
  const {likedKeyProjects} = useProjectLikedStore();

  // Memoized sorting of projects, ensuring that liked projects are shown first
  const sortedProjects = useMemo(() => {
    return projects.sort((a, b) => {
      const aIsLiked = likedKeyProjects.includes(a.key); // Check if project a is liked
      const bIsLiked = likedKeyProjects.includes(b.key); // Check if project b is liked

      if (aIsLiked && !bIsLiked) {
        return -1; // a should appear before b
      }

      if (!aIsLiked && bIsLiked) {
        return 1; // b should appear before a
      }

      return 0; // Keep the current order if both have the same liked status
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
