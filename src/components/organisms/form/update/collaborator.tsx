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

export function UpdateCollaboratorForm({
  currentCollaborator,
  disableForm,
}: {
  currentCollaborator: Collaborator;
  disableForm?: boolean;
}) {
  const { toast } = useToast();

  // Create a form to update the collaborator
  const form = useForm<CollaboratorUpdateSchema>({
    resolver: zodResolver(CollaboratorUpdateSchema),
    defaultValues: currentCollaborator,
  });

  const onSubmit = async (values: CollaboratorUpdateSchema) => {
    try {
      // Send request to update the collaborator
      await putCollaborator({
        idCollaborator: currentCollaborator.id,
        updatedCollaborator: values,
      });

      // If the request was successful, show a success toast
      toast({
        title: 'Colaborador actualizado',
        description: 'El colaborador ha sido actualizado exitosamente.',
        className: 'bg-green-500 text-black',
      });
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'No se pudo actualizar el Colaborador',
        defaultErrorMessage: 'Ha ocurrido un error al intentar actualizar el Colaborador.',
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
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input disabled={disableForm} placeholder='Nickname' {...field} />
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
                    disabled={disableForm}
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
                    disabled={disableForm}
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
        <Button
          className='flex size-max items-center gap-2 rounded-lg bg-lime-600 p-2 text-white hover:bg-lime-700 dark:bg-lime-600 dark:hover:bg-lime-700'
          disabled={disableForm}
          type='submit'
        >
          <Save className='size-7' />
          <span className='text-lg'>Guardar</span>
        </Button>
      </form>
    </Form>
  );
}
