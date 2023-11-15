import projects from "./projects.json";

export function fetchProjects() {
  return Object.entries(projects);
}
