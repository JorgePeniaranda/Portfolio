import type { APIRoute } from "astro"
import Projects from '../../../data/projects.json'
import type { IProject } from "../../../types/project"

const propertiesToKeep: Array<keyof IProject> = ["name"]

export const GET: APIRoute = ({ params, request }) => {
  const projects = (Projects as IProject[]).map(project => {
    return propertiesToKeep.reduce((acc, propertie) => {
      acc[propertie] = project[propertie]
      return acc
    }, {} as Record<keyof IProject, IProject[keyof IProject]>)
  })

  return Response.json(projects)
}