import type {Colaborator, Project, Stack} from "@prisma/client";

import {isDefined} from "../../../helpers/guards/is-defined";
import GithubUser from "../../atoms/github-user";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as UIAccordion,
} from "../../ui/accordion";

interface Props {
  contributions: {
    id: number;
    value: string;
  }[];
  goals: {
    id: number;
    value: string;
  }[];
  techStack: Stack[];
  collaborators: Colaborator[];
  githubUrl: Project["githubUrl"];
  demoUrl: Project["demoUrl"];
}

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
      {goals.length ? (
        <AccordionItem value="goals">
          <AccordionTrigger>Objetivos</AccordionTrigger>
          <div />
          <AccordionContent className="space-y-3">
            {goals.map((goal) => (
              <p key={`goal_${goal.id}`} className="text-pretty">
                {goal.value}
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ) : null}
      {techStack.length > 0 && (
        <AccordionItem value="technologies">
          <AccordionTrigger>Tecnologías</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-4">
              {techStack.map((stack) => (
                <li key={`technology_${stack.id}`}>{stack.name}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}
      {contributions.length > 0 && (
        <AccordionItem value="contribution">
          <AccordionTrigger>¿Qué aporté?</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {contributions.map((contribution) => (
              <p key={`contribution_${contribution.id}`} className="text-pretty">
                {contribution.value}
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      )}
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
