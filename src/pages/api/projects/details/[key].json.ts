import type {APIRoute} from "astro";
import type {IProject} from "../../../../types/project";

import Projects from "../../../../data/projects.json";

export const GET: APIRoute = ({params}) => {
  const project = (Projects as IProject[]).find((value) => value.key === params.key);

  return Response.json(project);
};

export function getStaticPaths() {
  const paths = (Projects as IProject[]).map((project) => {
    return {params: {key: project.key}};
  });

  return paths;
}
