import type { Collaborator, Project, Stack } from '@prisma/client';

import { ExternalLink } from 'lucide-react';

import GithubUser from '@/components/atoms/github-user';
import { MessageDisplay } from '@/components/atoms/message-display';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as UIAccordion,
} from '@/components/ui/accordion';
import { isDefined } from '@/helpers/guards/is-defined';
import { isNoEmptyString } from '@/helpers/guards/is-no-empty-string';
import useTranslations from '@/hooks/use-translations';

//#region TYPES
interface ProjectAccordionProps {
  contributions: string;
  goals: string;
  stackCategory: Stack[];
  collaborators: Collaborator[];
  githubUrl: Project['githubUrl'];
  demoUrl: Project['demoUrl'];
}
//#endregion

//#region PROJECT ACCORDION
/**
 * A component that renders project details in an accordion format.
 * It includes sections for goals, technologies, contributions, collaborators, and resources.
 * @param params - Component properties
 * @param params.contributions - A description of the contributions made to the project
 * @param params.goals - A description of the goals for the project
 * @param params.stackCategory - A list of technologies used in the project
 * @param params.collaborators - A list of collaborators in the project
 * @param params.githubUrl - The GitHub repository URL of the project
 * @param params.demoUrl - The demo URL of the project
 * @returns A React component
 */
export function ProjectAccordion({
  collaborators,
  demoUrl,
  githubUrl,
  goals,
  stackCategory,
  contributions,
}: ProjectAccordionProps) {
  const { t } = useTranslations();

  return (
    <UIAccordion className='w-full' type='multiple'>
      {/* Render goals section if there are goals */}
      {isDefined(goals) && isNoEmptyString(goals) ? (
        <AccordionItem value='goals'>
          <AccordionTrigger>{t('components.project-accordion.goals.title')}</AccordionTrigger>
          <div />
          <AccordionContent className='space-y-3'>
            <p>
              <MessageDisplay message={goals} />
            </p>
          </AccordionContent>
        </AccordionItem>
      ) : null}

      {/* Render tech stack section if there are technologies */}
      {stackCategory.length > 0 && (
        <AccordionItem value='technologies'>
          <AccordionTrigger>
            {t('components.project-accordion.technologies.title')}
          </AccordionTrigger>
          <AccordionContent>
            <ul className='list-disc pl-4'>
              {stackCategory.map((stack) => (
                <li key={`technology_${stack.id}`}>
                  <a
                    className='flex items-center gap-1'
                    href={`/stack/${stack.key}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {stack.name}
                    <ExternalLink className='w-4' />
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Render contributions section if there are contributions */}
      {isDefined(contributions) && isNoEmptyString(contributions) && (
        <AccordionItem value='contribution'>
          <AccordionTrigger>
            {t('components.project-accordion.contributions.title')}
          </AccordionTrigger>
          <AccordionContent className='space-y-3'>
            <p>
              <MessageDisplay message={contributions} />
            </p>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Render collaborators section if there are collaborators */}
      {collaborators.length > 0 && (
        <AccordionItem value='collaborators'>
          <AccordionTrigger>
            {t('components.project-accordion.collaborators.title')}
          </AccordionTrigger>
          <AccordionContent>
            <ul className='space-y-3 pl-5'>
              {collaborators.map((collaborator) => (
                <li key={`collaborator_${collaborator.id}`}>
                  <GithubUser username={collaborator.githubUsername ?? ''} />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Render resources section if GitHub or demo URL is defined */}
      {((isDefined(githubUrl) && isNoEmptyString(githubUrl)) ||
        (isDefined(demoUrl) && isNoEmptyString(demoUrl))) && (
        <AccordionItem value='resources'>
          <AccordionTrigger>{t('components.project-accordion.resources.title')}</AccordionTrigger>
          <AccordionContent>
            <ul className='space-y-3 pl-5'>
              {isDefined(githubUrl) && isNoEmptyString(githubUrl) ? (
                <li aria-label='Code Link' className='flex items-center gap-1'>
                  <span className='font-bold'>
                    {t('components.project-accordion.resources.code-subtitle')}:
                  </span>
                  <a
                    className='flex items-center gap-1'
                    href={githubUrl}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {githubUrl}
                    <ExternalLink className='w-4' />
                  </a>
                </li>
              ) : null}
              {isDefined(demoUrl) && isNoEmptyString(demoUrl) ? (
                <li aria-label='Demo Link' className='flex items-center gap-1'>
                  <span className='font-bold'>
                    {t('components.project-accordion.resources.demo-subtitle')}:
                  </span>
                  <a
                    className='flex items-center gap-1'
                    href={demoUrl}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {demoUrl}
                    <ExternalLink className='w-4' />
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
