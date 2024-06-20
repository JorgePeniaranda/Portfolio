import { ProjectStack, ProjectStatus } from '../types/project.d'

//#region Project-Details styles
const StatusStyle = {
  [ProjectStatus['Terminado']]: 'text-green-500',
  [ProjectStatus['En Desarrollo']]: 'text-yellow-500',
  [ProjectStatus['Pausado']]: 'text-red-500'
} as const

const StackStyle = {
  [ProjectStack['Full-Stack']]: 'bg-red-500/70 text-white dark:bg-red-500',
  [ProjectStack['Back-End']]: 'bg-blue-500/70 text-white dark:bg-blue-500',
  [ProjectStack['Front-End']]: 'bg-green-500/70 text-white dark:bg-green-500',
  default: 'bg-gray-500/70 text-white dark:bg-gray-500'
} as const

export const ProjectDetailsStyles = {
  StatusStyle,
  StackStyle
}
////#endregion
