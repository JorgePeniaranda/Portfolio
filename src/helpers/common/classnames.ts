import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that combines and merges Tailwind CSS class names.
 * It uses `clsx` to conditionally combine class names and `twMerge` to merge conflicting Tailwind class names.
 * @param inputs - A list of class names or objects to combine
 * @returns A single string containing the merged class names
 */
export function cn(...inputs: ClassValue[]): string {
  // Combine and merge the class names using `clsx` and `twMerge`
  return twMerge(clsx(inputs));
}
