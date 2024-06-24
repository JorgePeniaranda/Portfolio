import type { APIRoute } from "astro"
import Projects from '../../../data/projects.json'
import type { IProject } from "../../../types/project"

export const GET: APIRoute = () => {
  const projects = Projects as IProject[]

  return Response.json(projects)
}