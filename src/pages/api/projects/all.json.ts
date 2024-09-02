import type { APIRoute } from 'astro'
import type { IProject } from '../../../types/project'

import Projects from '../../../data/projects.json'

export const GET: APIRoute = () => {
  const projects = Projects as IProject[]

  return Response.json(projects)
}
