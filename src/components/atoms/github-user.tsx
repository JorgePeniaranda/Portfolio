import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/helpers/common/classnames';
import useTranslations from '@/hooks/use-translations';

interface GithubUserProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  username: string;
}

/**
 * GithubUser component renders a link to a GitHub profile along with the user's avatar.
 * @param params - Component params
 * @param params.username - The GitHub username
 * @returns A GithubUser component
 */
export function GithubUser({ username, ...props }: GithubUserProps) {
  const { t } = useTranslations();

  return (
    <a
      aria-label={t('components.github-user.aria-label', { username })}
      className={cn('flex size-max items-center gap-2', props.className)}
      href={`https://github.com/${username}`}
      rel='noopener noreferrer'
      target='__blank'
      {...props}
    >
      <Avatar className='size-8 shrink-0'>
        <AvatarImage src={`https://avatars.githubusercontent.com/${username}`} />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
      <span className='capitalize'>{username}</span>
    </a>
  );
}
