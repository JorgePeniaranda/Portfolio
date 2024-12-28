import React from "react";
import {Heart, HeartOff} from "lucide-react";

// Importing custom hook for managing the liked projects state
import {useProjectLikedStore} from "../../../services/storage/liked-projects";

/**
 * Props for the ProjectCard component.
 * @typedef {Object} Props
 * @property {string} projectKey - The unique identifier for the project.
 * @property {string} name - The name of the project.
 * @property {string} logoURL - The URL of the project's logo image.
 * @property {string} primaryColor - The primary color for the card's background.
 */
export interface Props {
  projectKey: string;
  name: string;
  logoURL: string;
}

/**
 * ProjectCard component displays project details, allows the user to like/unlike it, and navigate to the project page.
 * @param {Props} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export function ProjectCard({projectKey, name, logoURL}: Props) {
  // Destructure functions for managing the liked projects state
  const {addLikedProject, checkLikedProject, removeLikedProject} = useProjectLikedStore();

  // Check if the project is already liked
  const isLiked = checkLikedProject(projectKey);

  // Function to toggle the liked state when the heart icon is clicked
  const handleClickHeart = () => {
    if (isLiked) {
      removeLikedProject(projectKey);
    } else {
      addLikedProject(projectKey);
    }
  };

  return (
    <article className="group flex flex-col justify-between rounded-lg shadow-sm">
      <a
        className="relative aspect-video overflow-hidden rounded-t-lg bg-black"
        href={`/projects/${projectKey}`}
      >
        <span className="sr-only">{`${name} details`}</span>
        <img alt={name} className="size-full" src={logoURL} />
      </a>
      <div className="flex h-1/5 items-center justify-between rounded-b-lg bg-gray-200 p-4">
        <h3 className="font-medium tracking-tight text-gray-500">{name}</h3>{" "}
        <button aria-label={isLiked ? "Remove from liked" : "Add to liked"} type="button">
          {/* Conditionally render filled or empty heart based on the liked state */}
          {isLiked ? (
            <HeartOff className="size-5 text-red-500" onClick={handleClickHeart} />
          ) : (
            <Heart className="size-5 text-gray-500" onClick={handleClickHeart} />
          )}
        </button>
      </div>
    </article>
  );
}
