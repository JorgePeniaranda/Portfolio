import {ProjectStack, ProjectStatus, type Project} from "@prisma/client";
import {useMemo, useState} from "react";

import {useProjectLikedStore} from "../../../services/storage/liked-projects";
import {ProjectCard} from "../../molecules/cards/project-card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {
  PROJECT_SORT_TRANSCRIPTIONS,
  PROJECT_STACK_TRANSCRIPTIONS,
  PROJECT_STATUS_TRANSCRIPTIONS,
} from "../../../constants/transcriptions";
import {isDefined} from "../../../helpers/guards/is-defined";
import {ProjectSortType, type IProjectSortType} from "../../../types/project.d";

/**
 * Component that renders a list of project cards, sorted by favorites.
 * The list is sorted such that liked projects appear first.
 *
 * @param {object} props - The component props.
 * @param {Array<Pick<Project, "id" | "key" | "name" | "logoUrl" | "primaryColor">>} props.projects - The list of projects to display.
 * @returns {JSX.Element} A sorted list of project cards.
 */
export function ProjectCardsManager({
  projects,
}: {
  projects: Pick<
    Project,
    "id" | "key" | "name" | "logoUrl" | "primaryColor" | "stack" | "status"
  >[];
}) {
  // Retrieves the list of liked projects from the store
  const {likedKeyProjects} = useProjectLikedStore();

  // State for sorting type, stack filter, and status filter
  const [sortType, setSortType] = useState<IProjectSortType>("liked");
  const [stackFilter, setStackFilter] = useState<ProjectStack>();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>();

  // Memoized sorting of projects based on filters and sort type
  const sortedProjects = useMemo(() => {
    let newProjects = structuredClone(projects);

    // Filter by stack
    if (isDefined(stackFilter)) {
      newProjects = newProjects.filter((project) => project.stack === stackFilter);
    }

    // Filter by status
    if (isDefined(statusFilter)) {
      newProjects = newProjects.filter((project) => project.status === statusFilter);
    }

    // Sort projects based on the selected sort type
    newProjects = newProjects.sort((a, b) => {
      if (sortType === "liked") {
        const aIsLiked = likedKeyProjects.includes(a.key); // Check if project a is liked
        const bIsLiked = likedKeyProjects.includes(b.key); // Check if project b is liked

        if (aIsLiked && !bIsLiked) {
          return -1; // a should appear before b
        }

        if (!aIsLiked && bIsLiked) {
          return 1; // b should appear before a
        }

        return 0; // Keep the current order if both have the same liked status
      }

      if (sortType === "A-Z") {
        return a.name.localeCompare(b.name); // Sort alphabetically A-Z
      }

      if (sortType === "Z-A") {
        return b.name.localeCompare(a.name); // Sort alphabetically Z-A
      }

      return 0; // Default case (no sorting)
    });

    return newProjects;
  }, [projects, stackFilter, statusFilter, sortType, likedKeyProjects]);

  return (
    <section className="mb-28 mt-16 flex flex-col gap-8">
      {/* Filters for sorting and project attributes */}
      <ul className="flex w-full items-center justify-center gap-10">
        {/* Sort filter */}
        <li className="flex items-center gap-2">
          <label className="whitespace-nowrap text-sm text-gray-400/80" htmlFor="sort-select">
            Ordenar por:
          </label>
          <Select
            defaultValue={sortType}
            value={sortType}
            onValueChange={(value: IProjectSortType) => {
              setSortType(value); // Update the sort type
            }}
          >
            <SelectTrigger className="w-[180px]" id="sort-select">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ProjectSortType.LIKED}>
                {PROJECT_SORT_TRANSCRIPTIONS.liked}
              </SelectItem>
              <SelectItem value={ProjectSortType.A_Z}>
                {PROJECT_SORT_TRANSCRIPTIONS["A-Z"]}
              </SelectItem>
              <SelectItem value={ProjectSortType.Z_A}>
                {PROJECT_SORT_TRANSCRIPTIONS["Z-A"]}
              </SelectItem>
            </SelectContent>
          </Select>
        </li>

        {/* Stack filter */}
        <li className="flex items-center gap-2">
          <label className="whitespace-nowrap text-sm text-gray-400/80" htmlFor="stack-select">
            Stack:
          </label>
          <Select
            value={stackFilter}
            onValueChange={(value: ProjectStack) => {
              setStackFilter(value); // Update the stack filter
            }}
          >
            <SelectTrigger className="w-[180px]" id="stack-select">
              <SelectValue placeholder="Filtrar por stack" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ProjectStack.FULL_STACK}>
                {PROJECT_STACK_TRANSCRIPTIONS.FULL_STACK}
              </SelectItem>
              <SelectItem value={ProjectStack.FRONT_END}>
                {PROJECT_STACK_TRANSCRIPTIONS.FRONT_END}
              </SelectItem>
              <SelectItem value={ProjectStack.BACK_END}>
                {PROJECT_STACK_TRANSCRIPTIONS.BACK_END}
              </SelectItem>
            </SelectContent>
          </Select>
        </li>

        {/* Status filter */}
        <li className="flex items-center gap-2">
          <label className="whitespace-nowrap text-sm text-gray-400/80" htmlFor="status-select">
            Estado:
          </label>
          <Select
            value={statusFilter}
            onValueChange={(value: ProjectStatus) => {
              setStatusFilter(value); // Update the status filter
            }}
          >
            <SelectTrigger className="w-[180px]" id="status-select">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ProjectStatus.FINISHED}>
                {PROJECT_STATUS_TRANSCRIPTIONS.FINISHED}
              </SelectItem>
              <SelectItem value={ProjectStatus.IN_PROGRESS}>
                {PROJECT_STATUS_TRANSCRIPTIONS.IN_PROGRESS}
              </SelectItem>
              <SelectItem value={ProjectStatus.STALLED}>
                {PROJECT_STATUS_TRANSCRIPTIONS.STALLED}
              </SelectItem>
            </SelectContent>
          </Select>
        </li>
      </ul>

      {/* Render sorted project cards */}
      {sortedProjects.map((project) => (
        <ProjectCard
          key={project.key}
          logoURL={project.logoUrl}
          name={project.name}
          primaryColor={project.primaryColor}
          projectKey={project.key}
        />
      ))}
    </section>
  );
}
