import type { APIRoute } from "astro"
import Projects from '../../../../data/projects.json'
import type { IProject } from "../../../../types/project"

export const GET: APIRoute = ({ params }) => {
  const project = (Projects as IProject[]).find((value) => value.key === params.key)

  return Response.json(project)
}


export function getStaticPaths() {
  const paths = (Projects as IProject[]).map(project => {
    return { params: { key: project.key} }
  })

  return paths
};