import type { Collaborator } from '@prisma/client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import useTranslations from '@/hooks/use-translations';

/**
 * Card to show a collaborator relationship.
 * @param params - The component props
 * @param params.collaborator - The collaborator to show
 * @returns The collaborator relationship card
 */
export function CollaboratorRelationShipCard({ collaborator }: { collaborator: Collaborator }) {
  const { t } = useTranslations();

  return (
    <Card
      aria-label={t('components.collaborator-relationship-card.aria-label')}
      className='my-5 flex w-max flex-col items-center justify-center rounded-lg bg-zinc-300 shadow-sm dark:bg-zinc-800'
    >
      <CardHeader className='relative flex items-center gap-2'>
        <Avatar className='size-16 shrink-0'>
          <AvatarImage
            src={`https://avatars.githubusercontent.com/${collaborator.githubUsername}`}
          />
          <AvatarFallback>{collaborator.githubUsername}</AvatarFallback>
        </Avatar>
        <span className='text-lg capitalize'>{collaborator.githubUsername}</span>
      </CardHeader>
    </Card>
  );
}
