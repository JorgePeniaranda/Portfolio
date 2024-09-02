import type { APIRoute } from 'astro'
import type { IProject } from '../../../types/project'

import Projects from '../../../data/projects.json'

const propertiesToKeep: Array<keyof IProject> = [
  'key',
  'name',
  'logoURL',
  'primaryColor'
]

export const GET: APIRoute = () => {
  const projects = (Projects as IProject[]).map(project => {
    return propertiesToKeep.reduce(
      (acc, propertie) => {
        acc[propertie] = project[propertie]

        return acc
      },
      {} as Record<keyof IProject, IProject[keyof IProject]>
    )
  })

  return Response.json(projects)
}
