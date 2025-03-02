import type { Collaborator } from '@prisma/client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CollaboratorUpdateSchema } from '@/schemas/collaborator/update';
import { putCollaborator } from '@/services/collaborator/putCollaborator';
import { handleErrorWithToast } from '@/helpers/error/toast-handler';
import useTranslations from '@/hooks/use-translations';

/**
 * Form to update a collaborator.
 * @param params - The component props
 * @param params.currentCollaborator - The current collaborator to update
 * @param params.disableForm - Whether the form should be disabled
 * @returns The update collaborator form
 */
export function UpdateCollaboratorForm({
  currentCollaborator,
  disableForm,
}: {
  currentCollaborator: Collaborator;
  disableForm?: boolean;
}) {
  const { t } = useTranslations();
  const { toast } = useToast();

  const form = useForm<CollaboratorUpdateSchema>({
    resolver: zodResolver(CollaboratorUpdateSchema),
    defaultValues: currentCollaborator,
  });

  const onSubmit = async (values: CollaboratorUpdateSchema) => {
    try {
      await putCollaborator({
        idCollaborator: currentCollaborator.id,
        updatedCollaborator: values,
      });

      // Show a success toast
      toast({
        title: t('components.update-collaborator-form.success-title'),
        description: t('components.update-collaborator-form.success-description'),
        className: 'bg-green-500 text-black',
      });
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'components.update-collaborator-form.error-title',
        defaultErrorMessage: 'components.update-collaborator-form.error-description',
        tryAgain: () => onSubmit(values),
      });
    }
  };

  return (
    <Form {...form}>
      <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-wrap gap-2'>
          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('components.update-collaborator-form.nickname')}</FormLabel>
                <FormControl>
                  <Input
                    aria-label={t('components.update-collaborator-form.nickname')}
                    disabled={disableForm}
                    placeholder={t('components.update-collaborator-form.nickname')}
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
                <FormLabel>{t('components.update-collaborator-form.github-username')}</FormLabel>
                <FormControl>
                  <Input
                    aria-label={t('components.update-collaborator-form.github-username')}
                    disabled={disableForm}
                    placeholder={t('components.update-collaborator-form.github-username')}
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
                <FormLabel>{t('components.update-collaborator-form.linkedin-username')}</FormLabel>
                <FormControl>
                  <Input
                    aria-label={t('components.update-collaborator-form.linkedin-username')}
                    disabled={disableForm}
                    placeholder={t('components.update-collaborator-form.linkedin-username')}
                    {...field}
                    value={field.value === null ? undefined : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          aria-label={t('components.update-collaborator-form.submit')}
          className='flex size-max items-center gap-2 rounded-lg bg-lime-600 p-2 text-white hover:bg-lime-700 dark:bg-lime-600 dark:hover:bg-lime-700'
          disabled={disableForm}
          type='submit'
        >
          <Save className='size-7' />
          <span className='text-lg'>{t('components.update-collaborator-form.submit')}</span>
        </Button>
      </form>
    </Form>
  );
}
