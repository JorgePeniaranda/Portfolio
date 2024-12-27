import {IProjectColaborator, IProjectResources} from "../../../types/project";

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
    id: string;
    value: string;
  }[];
  technologies: {
    id: string;
    value: string;
  }[];
  contribution: {
    id: string;
    value: string;
  }[];
  collaborators?: IProjectColaborator[];
  resources: IProjectResources;
}
