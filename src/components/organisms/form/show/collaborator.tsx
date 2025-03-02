import type { Collaborator } from '@prisma/client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pen } from 'lucide-react';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CollaboratorUpdateSchema } from '@/schemas/collaborator/update';
import { useTranslations } from '@/hooks/use-translations';

/**
 * Form to show a collaborator.
 * @param params - The component props
 * @param params.currentCollaborator - The current collaborator to show
 * @returns The show collaborator form
 */
export function ShowCollaboratorForm({
  currentCollaborator,
}: {
  currentCollaborator: Collaborator;
}) {
  const { t } = useTranslations();
  const form = useForm<CollaboratorUpdateSchema>({
    resolver: zodResolver(CollaboratorUpdateSchema),
    defaultValues: currentCollaborator,
  });

  return (
    <Form {...form}>
      <form className='space-y-8'>
        <div className='flex flex-wrap gap-2'>
          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('components.show-collaborator-form.nickname')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder={t('components.show-collaborator-form.nickname')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='githubUsername'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('components.show-collaborator-form.github-username')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder={t('components.show-collaborator-form.github-username')}
                    {...field}
                    value={field.value === null ? undefined : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='linkedinUsername'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('components.show-collaborator-form.linkedin-username')}</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder={t('components.show-collaborator-form.linkedin-username')}
                    {...field}
                    value={field.value === null ? undefined : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <a
          className='border-input flex size-max items-center gap-2 rounded-md border bg-gray-500 p-2 px-4 text-white hover:bg-gray-600 hover:text-white dark:text-white dark:hover:bg-gray-400'
          href={`/vault/views/collaborators/${currentCollaborator.id}/edit`}
        >
          <Pen className='size-5' />
          <span className='text-lg'>{t('components.show-collaborator-form.edit')}</span>
        </a>
      </form>
    </Form>
  );
}
