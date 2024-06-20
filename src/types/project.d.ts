export interface IProject {
  key: string
  name: string
  status: (typeof ProjectStatus)[keyof typeof ProjectStatus]
  stack: (typeof ProjectStack)[keyof typeof ProjectStack]
  accordion: IProjectAccordion
}

export interface IProjectCard {
  key: string
  name: string
  logoURL: string
  primaryColor: string
}

/**
 * @IProjectAccordion {
 *    @goals array of paragraph (<p/>)
 *    @technologies list of technologies (<ul/>)
 *    @contribution array of paragraph (<p/>)
 *    @collaborators list of collaborators (<ul/>)
 * }
 */
export interface IProjectAccordion {
  goals: {
    id: string
    value: string
  }[]
  technologies: {
    id: string
    value: string
  }[]
  contribution: {
    id: string
    value: string
  }[]
  collaborators?: IProjectColaborator[]
  resources: IProjectResources
}

/**
 * @IProjectColaborator {
 *    @github only username
 * }
 */
export interface IProjectColaborator {
  id: string
  github: string
}

export interface IProjectResources {
  repositoryURL: string
  demoURL: string
}

export const ProjectStatus = {
  'Terminado': 'Terminado',
  'En Desarrollo': 'En Desarrollo',
  'Pausado': 'Pausado'
} as const

export const ProjectStack = {
  'Full-Stack': 'Full-Stack',
  'Back-End': 'Back-End',
  'Front-End': 'Front-End'
} as const
