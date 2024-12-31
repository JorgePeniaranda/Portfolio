import type {Collaborator, Project, Stack} from "@prisma/client";

import {isDefined} from "../../../helpers/guards/is-defined";
import GithubUser from "../../atoms/github-user";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as UIAccordion,
} from "../../ui/accordion";
import {MessageDisplay} from "../../atoms/message-display";

//#region TYPES
/**
 * The props for the ProjectAccordion component.
 * @param contributions - A description of the contributions made to the project.
 * @param goals - A description of the goals for the project.
 * @param techStack - A list of technologies used in the project.
 * @param collaborators - A list of collaborators in the project.
 * @param githubUrl - The GitHub repository URL of the project.
 * @param demoUrl - The demo URL of the project.
 */
interface Props {
  contributions: string;
  goals: string;
  techStack: Stack[];
  collaborators: Collaborator[];
  githubUrl: Project["githubUrl"];
  demoUrl: Project["demoUrl"];
}
//#endregion

//#region PROJECT ACCORDION
/**
 * A component that renders project details in an accordion format.
 * It includes sections for goals, technologies, contributions, collaborators, and resources.
 * @param contributions - A description of the contributions made to the project.
 * @param goals - A description of the goals for the project.
 * @param techStack - A list of technologies used in the project.
 * @param collaborators - A list of collaborators in the project.
 * @param githubUrl - The GitHub repository URL of the project.
 * @param demoUrl - The demo URL of the project.
 */
export function ProjectAccordion({
  collaborators,
  demoUrl,
  githubUrl,
  goals,
  techStack,
  contributions,
}: Props) {
  return (
    <UIAccordion className="w-full" type="multiple">
      {/* Render goals section if there are goals */}
      {isDefined(goals) ? (
        <AccordionItem value="goals">
          <AccordionTrigger>Objetivos</AccordionTrigger>
          <div />
          <AccordionContent className="space-y-3">
            <p>
              <MessageDisplay message={goals} />
            </p>
          </AccordionContent>
        </AccordionItem>
      ) : null}

      {/* Render tech stack section if there are technologies */}
      {techStack.length > 0 && (
        <AccordionItem value="technologies">
          <AccordionTrigger>Tecnologías</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-4">
              {techStack.map((stack) => (
                <li key={`technology_${stack.id}`}>
                  <a
                    className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                    href={`/stack/${stack.key}`}
                    rel="noopener noreferrer"
                    target="__blank"
                  >
                    {stack.name}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Render contributions section if there are contributions */}
      {isDefined(contributions) && (
        <AccordionItem value="contribution">
          <AccordionTrigger>¿Qué aporté?</AccordionTrigger>
          <AccordionContent className="space-y-3">
            <p>
              <MessageDisplay message={contributions} />
            </p>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Render collaborators section if there are collaborators */}
      {collaborators.length > 0 && (
        <AccordionItem value="collaborators">
          <AccordionTrigger>Colaboradores</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 pl-5">
              {collaborators.map((collaborator) => (
                <li key={`collaborator_${collaborator.id}`}>
                  <GithubUser username={collaborator.githubUsername ?? ""} />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Render resources section if GitHub or demo URL is defined */}
      {(isDefined(githubUrl) || isDefined(demoUrl)) && (
        <AccordionItem value="resources">
          <AccordionTrigger>Recursos</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 pl-5">
              {isDefined(githubUrl) ? (
                <li aria-label="Code Link">
                  <span className="font-bold">Código: </span>
                  <a
                    className="text-blue-700"
                    href={githubUrl}
                    rel="noopener noreferrer"
                    target="__blank"
                  >
                    {githubUrl}
                  </a>
                </li>
              ) : null}
              {isDefined(demoUrl) ? (
                <li aria-label="Demo Link">
                  <span className="font-bold">Demo: </span>
                  <a
                    className="text-blue-700"
                    href={demoUrl}
                    rel="noopener noreferrer"
                    target="__blank"
                  >
                    {demoUrl}
                  </a>
                </li>
              ) : null}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}
    </UIAccordion>
  );
}
//#endregion
