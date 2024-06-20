import type {IProjectAccordion} from "../../../types/project";

import GithubUser from "../../atoms/github-user";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as UIAccordion,
} from "../../ui/accordion";

interface Props extends React.HTMLAttributes<HTMLElement> {
  data: IProjectAccordion;
}

export function ProjectAccordion({
  data: {goals, technologies, contribution, collaborators, ...props},
}: Props) {
  return (
    <UIAccordion className="w-full" type="multiple" {...props}>
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
      <AccordionItem value="technologies">
        <AccordionTrigger>Tecnologías</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-4">
            {technologies.map((technology) => (
              <li key={`technology_${technology.id}`}>{technology.value}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="contribution">
        <AccordionTrigger>¿Qué aporté?</AccordionTrigger>
        <AccordionContent className="space-y-3">
          {contribution.map((contribution) => (
            <p key={`contribution_${contribution.id}`} className="text-pretty">
              {contribution.value}
            </p>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="collaborators">
        <AccordionTrigger>Colaboradores</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-3 pl-5">
            {collaborators.map((collaborator) => (
              <li key={`collaborator_${collaborator.id}`}>
                <GithubUser username={collaborator.github} />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </UIAccordion>
  );
}
