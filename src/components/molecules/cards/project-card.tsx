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
  primaryColor: string;
}

/**
 * ProjectCard component displays project details, allows the user to like/unlike it, and navigate to the project page.
 * @param {Props} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export function ProjectCard({projectKey, name, logoURL, primaryColor}: Props) {
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
    <article className="flex h-[35rem] w-[30rem]">
      <p
        className="grid size-full grid-cols-2 grid-rows-[auto_1fr_auto] rounded-3xl transition-transform hover:-translate-y-4"
        style={{backgroundColor: primaryColor}} // Set background color dynamically
      >
        <h3 className="text-4xl font-bold tracking-tight text-white">{name}</h3>{" "}
        {/* Project name */}
        <img alt={`${projectKey} Logo`} className="w-40" src={logoURL} /> {/* Project logo */}
        <p className="col-span-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt repellat eos dolor
          deserunt optio modi dicta ut animi laborum accusantium, praesentium recusandae quibusdam,
          in aspernatur. Unde debitis eius facere nam.
        </p>{" "}
        {/* Placeholder description */}
        <div className="col-span-2 flex justify-between px-5 py-6">
          <h4>Full-Stack</h4> {/* Project tech stack label */}
          <button aria-label={isLiked ? "Remove from liked" : "Add to liked"} type="button">
            {/* Conditionally render filled or empty heart based on the liked state */}
            {isLiked ? (
              <HeartOff className="text-red-500" onClick={handleClickHeart} />
            ) : (
              <Heart className="text-red-500" onClick={handleClickHeart} />
            )}
          </button>
        </div>
        <a className="text-blue-600" href={`/projects/${projectKey}`}>
          Conocer
        </a>{" "}
        {/* Link to project details page */}
      </p>
    </article>
  );
}
