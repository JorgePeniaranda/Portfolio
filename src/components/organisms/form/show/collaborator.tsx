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
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input disabled placeholder='Nickname' {...field} />
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
                <FormLabel>Usuario de Github</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder='Usuario de Github'
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
                <FormLabel>Usuario de Linkedin</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder='Usuario de Linkedin'
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
          className='flex size-max items-center gap-2 rounded-md border border-input bg-gray-500 p-2 px-4 text-white hover:bg-gray-600 hover:text-white dark:text-white dark:hover:bg-gray-400'
          href={`/vault/views/collaborators/${currentCollaborator.id}/edit`}
        >
          <Pen className='size-5' />
          <span className='text-lg'>Editar</span>
        </a>
      </form>
    </Form>
  );
}
