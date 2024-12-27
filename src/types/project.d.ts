import type {IProjectAccordion} from "../components/organisms/accordion/project-accordion";

export interface IProject {
  key: string;
  name: string;
  logoURL: string;
  primaryColor: string;
  status: (typeof ProjectStatus)[keyof typeof ProjectStatus];
  stack: (typeof ProjectStack)[keyof typeof ProjectStack];
  accordion: IProjectAccordion;
}

/**
 * @IProjectColaborator {
 *    @github only username
 * }
 */
export interface IProjectColaborator {
  id: string;
  github: string;
}

export interface IProjectResources {
  repositoryURL: string;
  demoURL: string;
}

export const ProjectStatus = {
  "Terminado": "Terminado",
  "En Desarrollo": "En Desarrollo",
  "Pausado": "Pausado",
} as const;

export const ProjectStack = {
  "Full-Stack": "Full-Stack",
  "Back-End": "Back-End",
  "Front-End": "Front-End",
} as const;
