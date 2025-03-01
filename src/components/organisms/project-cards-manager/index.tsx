import { ProjectStatus, StackCategory, type Project } from '@prisma/client';
import { useMemo, useState } from 'react';

import { ProjectCard } from '@/components/molecules/cards/project-card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PROJECT_STATUS_TRANSCRIPTIONS,
  STACK_CATEGORY_TRANSCRIPTIONS,
} from '@/constants/transcriptions';
import { isDefined } from '@/helpers/guards/is-defined';
import useTranslations from '@/hooks/use-translations';
import { useProjectLikedStore } from '@/services/storage/liked-projects';
import { Button } from '@/components/ui/button';

type ProjectSortType = 'liked' | 'A-Z' | 'Z-A';

/**
 * Component that renders a list of project cards, sorted by favorites.
 * The list is sorted such that liked projects appear first.
 * @param params - Function parameters
 * @param params.projects - List of projects to render
 * @returns A React component
 */
export function ProjectCardsManager({
  projects,
}: {
  projects: Pick<Project, 'id' | 'key' | 'name' | 'logoUrl' | 'stackCategory' | 'status'>[];
}) {
  const { t } = useTranslations();
  const { likedKeyProjects } = useProjectLikedStore();

  const [sortType, setSortType] = useState<ProjectSortType>('liked');
  const [stackFilter, setStackFilter] = useState<StackCategory>();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>();

  const [stackKey, setStackKey] = useState(+new Date());
  const [statusKey, setStatusKey] = useState(+new Date());

  const sortedProjects = useMemo(() => {
    let newProjects = structuredClone(projects);

    // ---  Filter by stack ---
    if (isDefined(stackFilter)) {
      newProjects = newProjects.filter((project) => project.stackCategory === stackFilter);
    }

    // --- Filter by status ---
    if (isDefined(statusFilter)) {
      newProjects = newProjects.filter((project) => project.status === statusFilter);
    }

    // ---  Sort projects ---
    newProjects = newProjects.sort((a, b) => {
      if (sortType === 'liked') {
        const getLikedIndex = (key: string) => likedKeyProjects.indexOf(key);

        const aIsLiked = likedKeyProjects.includes(a.key); // Check if project a is liked
        const bIsLiked = likedKeyProjects.includes(b.key); // Check if project b is liked

        // If both projects have the same liked status (both liked or neither liked), compare their index in likedKeyProjects
        if (aIsLiked === bIsLiked) {
          return getLikedIndex(a.key) - getLikedIndex(b.key); // Maintain the original order based on likedKeyProjects
        }

        // If a is liked and b is not, a should appear first
        if (aIsLiked && !bIsLiked) {
          return -1;
        }

        // If b is liked and a is not, b should appear first
        return 1;
      }

      if (sortType === 'A-Z') {
        return a.name.localeCompare(b.name);
      }

      if (sortType === 'Z-A') {
        return b.name.localeCompare(a.name);
      }

      return 0; // Default case (no sorting)
    });

    return newProjects;
  }, [projects, stackFilter, statusFilter, sortType, likedKeyProjects]);

  return (
    <div className='mt-16 flex flex-col gap-8'>
      <ul className='flex w-full items-center justify-center gap-10 overflow-x-auto'>
        {/* Sort filter */}
        <li className='flex items-center gap-2'>
          <label className='text-sm whitespace-nowrap text-gray-400/80' htmlFor='sort-select'>
            {t('components.project-cards-manager.sort.label')}:
          </label>
          <Select
            defaultValue={sortType}
            value={sortType}
            onValueChange={(value: ProjectSortType) => {
              setSortType(value);
            }}
          >
            <SelectTrigger
              aria-label={t('components.project-cards-manager.aria-label.sort-select')}
              className='w-[180px]'
              id='sort-select'
            >
              <SelectValue placeholder={t('components.project-cards-manager.sort.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'liked' satisfies ProjectSortType}>
                {t('components.project-cards-manager.sort.liked-label')}
              </SelectItem>
              <SelectItem value={'A-Z' satisfies ProjectSortType}>
                {t('components.project-cards-manager.sort.A-Z-label')}
              </SelectItem>
              <SelectItem value={'Z-A' satisfies ProjectSortType}>
                {t('components.project-cards-manager.sort.Z-A-label')}
              </SelectItem>
            </SelectContent>
          </Select>
        </li>

        {/* Stack filter */}
        <li className='flex items-center gap-2'>
          <label className='text-sm whitespace-nowrap text-gray-400/80' htmlFor='stack-select'>
            {t('components.project-cards-manager.stack.label')}:
          </label>
          <Select
            key={stackKey}
            value={stackFilter}
            onValueChange={(value: StackCategory) => {
              setStackFilter(value);
            }}
          >
            <SelectTrigger
              aria-label={t('components.project-cards-manager.aria-label.stack-select')}
              className='w-[180px]'
              id='stack-select'
              unselectable='on'
            >
              <SelectValue placeholder={t('components.project-cards-manager.stack.placeholder')} />
            </SelectTrigger>
            <SelectContent unselectable='on'>
              <SelectGroup>
                <SelectItem value={StackCategory.FULL_STACK}>
                  {t(STACK_CATEGORY_TRANSCRIPTIONS.FULL_STACK)}
                </SelectItem>
                <SelectItem value={StackCategory.FRONT_END}>
                  {t(STACK_CATEGORY_TRANSCRIPTIONS.FRONT_END)}
                </SelectItem>
                <SelectItem value={StackCategory.BACK_END}>
                  {t(STACK_CATEGORY_TRANSCRIPTIONS.BACK_END)}
                </SelectItem>
                <SelectSeparator />
              </SelectGroup>
              <Button
                aria-label={t('components.project-cards-manager.aria-label.clear-stack')}
                className='w-full px-2'
                size='sm'
                variant='secondary'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setStackFilter(undefined);
                  setStackKey(+new Date());
                }}
              >
                {t('components.project-cards-manager.clear')}
              </Button>
            </SelectContent>
          </Select>
        </li>

        {/* Status filter */}
        <li className='flex items-center gap-2'>
          <label className='text-sm whitespace-nowrap text-gray-400/80' htmlFor='status-select'>
            {t('components.project-cards-manager.status.label')}:
          </label>
          <Select
            key={statusKey}
            value={statusFilter}
            onValueChange={(value: ProjectStatus) => {
              setStatusFilter(value);
            }}
          >
            <SelectTrigger
              aria-label={t('components.project-cards-manager.aria-label.status-select')}
              className='w-[180px]'
              id='status-select'
            >
              <SelectValue placeholder={t('components.project-cards-manager.status.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={ProjectStatus.FINISHED}>
                  {t(PROJECT_STATUS_TRANSCRIPTIONS.FINISHED)}
                </SelectItem>
                <SelectItem value={ProjectStatus.IN_PROGRESS}>
                  {t(PROJECT_STATUS_TRANSCRIPTIONS.IN_PROGRESS)}
                </SelectItem>
                <SelectItem value={ProjectStatus.STALLED}>
                  {t(PROJECT_STATUS_TRANSCRIPTIONS.STALLED)}
                </SelectItem>
              </SelectGroup>
              <Button
                aria-label={t('components.project-cards-manager.aria-label.clear-status')}
                className='w-full px-2'
                size='sm'
                variant='secondary'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setStatusFilter(undefined);
                  setStatusKey(+new Date());
                }}
              >
                {t('components.project-cards-manager.clear')}
              </Button>
            </SelectContent>
          </Select>
        </li>
      </ul>

      {/* Render sorted project cards */}
      <section
        aria-label={t('components.project-cards-manager.aria-label.projects-grid')}
        className='grid max-w-full grid-cols-1 gap-2 md:grid-cols-2 lg:gap-8 xl:grid-cols-3'
      >
        {sortedProjects.map((project) => (
          <ProjectCard
            key={project.key}
            logoURL={project.logoUrl}
            name={project.name}
            projectKey={project.key}
          />
        ))}
      </section>
    </div>
  );
}
