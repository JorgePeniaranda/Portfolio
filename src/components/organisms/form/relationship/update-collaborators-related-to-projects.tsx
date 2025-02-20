import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';
import type { Collaborator, Project } from '@prisma/client';

import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { handleErrorWithToast } from '@/helpers/error/toast-handler';
import { isDefined } from '@/helpers/guards/is-defined';
import { useToast } from '@/hooks/use-toast';
import { deleteProjectRemoveAssociatedCollaborator } from '@/services/project/deleteProjectRemoveAssociatedCollaborator';
import { postProjectAddAssociatedCollaborator } from '@/services/project/postProjectAddAssociatedCollaborator';

/**
 * Update collaborator related to project.
 * @param params - The component props
 * @param params.currentProject - The current project
 * @param params.associatedCollaborators - The associated collaborators
 * @param params.availableCollaborators - The available collaborators
 * @param params.disableForm - Whether the form should be disabled
 * @returns The update collaborator related to project form
 */
export function UpdateCollaboratorRelatedToProject({
  currentProject,
  associatedCollaborators: initialAssociatedCollaborators,
  availableCollaborators: initialAvailableCollaborators,
  disableForm,
}: {
  currentProject: Project;
  associatedCollaborators: Collaborator[];
  availableCollaborators: Collaborator[];
  disableForm?: boolean;
}) {
  const { toast } = useToast();

  // Form only used in the dialog to add a collaborator to the project
  const form = useForm<EntityRelationSchema>({
    defaultValues: {
      idTarget: currentProject.id,
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Local state for associated and available collaborators
  const [associatedCollaborators, setAssociatedCollaborators] = useState<Collaborator[]>(
    initialAssociatedCollaborators,
  );
  const [availableCollaborators, setAvailableCollaborators] = useState<Collaborator[]>(
    initialAvailableCollaborators,
  );

  const onAddCollaborator = async (values: EntityRelationSchema) => {
    try {
      await postProjectAddAssociatedCollaborator({
        idSource: Number(values.idSource),
        idTarget: Number(values.idTarget),
      });

      // Reset the dialog form
      form.reset();

      // Show a success toast
      toast({
        title: 'El colaborador ha sido relacionado',
        description: 'El colaborador ha sido relacionado con el proyecto exitosamente.',
        className: 'bg-green-500 text-black',
      });

      // Update local state for associated and available collaborators
      const findCollaborator = availableCollaborators.find(
        (collaborator) => collaborator.id === Number(values.idSource),
      );

      if (isDefined(findCollaborator)) {
        setAssociatedCollaborators((prev) => [...prev, findCollaborator]);
        setAvailableCollaborators((prev) =>
          prev.filter((collaborator) => collaborator.id !== Number(values.idSource)),
        );
      }

      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'No se pudo relacionar el proyecto con el colaborador',
        defaultErrorMessage:
          'Ocurrió un error al intentar relacionar el proyecto con el colaborador.',
        tryAgain: () => onAddCollaborator(values),
      });
    }
  };

  const onRemoveCollaborator = async (collaboratorId: number) => {
    try {
      // Send request to dissociate the collaborator with the project
      await deleteProjectRemoveAssociatedCollaborator({
        idTarget: currentProject.id,
        idSource: collaboratorId,
      });

      // Show a success toast
      toast({
        title: 'Colaborador eliminado',
        description: 'El colaborador ha sido eliminado del proyecto.',
        className: 'bg-green-500 text-black',
      });

      // Update local state for associated and available collaborators
      const findCollaborator = associatedCollaborators.find(
        (collaborator) => collaborator.id === collaboratorId,
      );

      if (isDefined(findCollaborator)) {
        setAssociatedCollaborators((prev) =>
          prev.filter((collaborator) => collaborator.id !== collaboratorId),
        );
        setAvailableCollaborators((prev) => [...prev, findCollaborator]);
      }

      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'No se pudo eliminar el proyecto del colaborador',
        defaultErrorMessage:
          'Ocurrió un error al intentar eliminar el proyecto con el colaborador.',
        tryAgain: () => onRemoveCollaborator(collaboratorId),
      });
    }
  };

  return (
    <ul className='mt-4 flex flex-wrap gap-4'>
      {associatedCollaborators?.map((collaborator) => (
        <li key={collaborator.id}>
          <Card className='my-5 flex w-max flex-col items-center justify-center rounded-lg bg-zinc-300 shadow dark:bg-zinc-800'>
            <CardHeader className='relative flex items-center gap-2'>
              <Button
                aria-label='eliminar relacion'
                className='absolute -right-2.5 -top-2.5 m-0 flex aspect-square size-8 items-center justify-center rounded-full bg-red-500 p-0 text-center text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500'
                disabled={disableForm}
                onClick={() => onRemoveCollaborator(collaborator.id)}
              >
                <X />
                <span className='sr-only'>eliminar relacion</span>
              </Button>
              <Avatar className='size-16 shrink-0'>
                <AvatarImage
                  src={`https://avatars.githubusercontent.com/${collaborator.githubUsername}`}
                />
                <AvatarFallback>{collaborator.githubUsername}</AvatarFallback>
              </Avatar>
              <span className='text-lg capitalize'>{collaborator.githubUsername}</span>
            </CardHeader>
          </Card>
        </li>
      ))}
      <li>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              aria-label='Relacionar colaborador'
              className='my-5 flex aspect-square w-max flex-col items-center justify-center rounded-lg bg-zinc-300 p-6 shadow dark:bg-zinc-800'
              type='button'
            >
              <Plus className='size-20' />
            </button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='text-center'>Relacionar colaborador</DialogTitle>
              <DialogDescription>
                Selecciona un colaborador para relacionar con el proyecto.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                className='space-y-8'
                id='relation-with-collaborator'
                onSubmit={form.handleSubmit(onAddCollaborator)}
              >
                <div className='flex flex-wrap gap-2'>
                  <FormField
                    control={form.control}
                    name='idSource'
                    render={({ field }) => (
                      <FormItem className='mx-auto'>
                        <FormControl>
                          <Select
                            defaultValue={String(field.value)}
                            onValueChange={field.onChange}
                            {...field}
                            value={String(field.value)}
                          >
                            <SelectTrigger className='w-[180px]'>
                              <SelectValue placeholder='Seleccionar colaborador' />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCollaborators.map((stack) => (
                                <SelectItem key={stack.id} value={String(stack.id)}>
                                  <div className='flex items-center gap-2'>
                                    <img
                                      alt={`${stack.nickname} logo`}
                                      className='size-6'
                                      src={`https://avatars.githubusercontent.com/${stack.githubUsername}`}
                                    />
                                    <span>{stack.nickname}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
            <DialogFooter>
              <Button
                className='bg-zinc-800 text-white hover:bg-zinc-700'
                disabled={disableForm}
                form='relation-with-collaborator'
                type='submit'
                typeof='submit'
              >
                Relacionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </li>
    </ul>
  );
}
