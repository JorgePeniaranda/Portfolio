import type { Project, Stack } from '@prisma/client';

/**
 * Component that wraps the `StackDrawer` and provides a visual trigger for opening it.
 * @param params - Component properties
 * @param params.data - Data for rendering the stack drawer and its trigger
 * @param params.data.label - Accessible label for the trigger element
 * @param params.data.iconUrl - URL of the icon displayed in the trigger
 * @param params.data.stackData - Stack data to display in the drawer
 * @returns A React component
 */
export function StackWithDrawerNode({
  data,
}: {
  data: {
    label: string;
    iconUrl: string;
    stackData: Stack & {
      projects: Pick<Project, 'id' | 'key' | 'name' | 'logoUrl'>[];
    };
  };
}) {
  return (
    <a
      className='flex aspect-square items-center justify-center rounded-full border-2 border-stone-400 bg-white p-2 shadow-md'
      href={`/stack/${data.stackData.key}`}
    >
      {/* Trigger element displaying the stack icon */}
      <img alt={data.label} className='h-7' src={data.iconUrl} />
      {/* Accessible label for screen readers */}
      <span className='sr-only'>{data.label}</span>
    </a>
  );
}
