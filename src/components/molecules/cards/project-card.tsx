import type { MouseEvent } from 'react';

import { Heart, HeartOff } from 'lucide-react';

import { useProjectLikedStore } from '@/services/storage/liked-projects';

export interface Props {
  projectKey: string;
  name: string;
  logoURL: string;
}

/**
 * ProjectCard component displays project details, allows the user to like/unlike it, and navigate to the project page.
 * @param params - Component params
 * @param params.projectKey - The project key
 * @param params.name - The project name
 * @param params.logoURL - The project logo URL
 * @returns A React component
 */
export function ProjectCard({ projectKey, name, logoURL }: Props) {
  // Destructure functions for managing the liked projects state
  const { addLikedProject, checkLikedProject, removeLikedProject } = useProjectLikedStore();

  // Check if the project is already liked
  const isLiked = checkLikedProject(projectKey);

  // Function to toggle the liked state when the heart icon is clicked
  const handleClickHeart = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      removeLikedProject(projectKey);
    } else {
      addLikedProject(projectKey);
    }
  };

  return (
    <article className='group flex flex-col justify-between rounded-lg shadow-sm'>
      <a
        className='relative flex aspect-video overflow-hidden rounded-t-lg'
        href={`/projects/${projectKey}`}
      >
        <span className='sr-only'>{`${name} details`}</span>
        <img alt={name} className='size-full' src={logoURL} />
      </a>
      <div className='flex h-1/5 items-center justify-between rounded-b-lg bg-gray-200 p-4 dark:bg-zinc-800'>
        <h3 className='font-medium tracking-tight text-gray-500 dark:text-gray-400'>{name}</h3>{' '}
        <button aria-label={isLiked ? 'Remove from liked' : 'Add to liked'} type='button'>
          {/* Conditionally render filled or empty heart based on the liked state */}
          {isLiked ? (
            <HeartOff className='size-5 text-red-500' onClick={handleClickHeart} />
          ) : (
            <Heart className='size-5 text-gray-500 dark:text-gray-400' onClick={handleClickHeart} />
          )}
        </button>
      </div>
    </article>
  );
}
