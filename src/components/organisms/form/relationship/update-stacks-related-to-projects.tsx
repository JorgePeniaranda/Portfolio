import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';
import type { Project, Stack } from '@prisma/client';

import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
import { useTranslations } from '@/hooks/use-translations';
import { deleteProjectRemoveAssociatedStack } from '@/services/project/deleteProjectRemoveAssociatedStack';
import { postProjectAddAssociatedStack } from '@/services/project/postProjectAddAssociatedStack';

/**
 * Form to update stacks related to a project.
 * @param params - The component props
 * @param params.currentProject - The current project
 * @param params.associatedStacks - The associated stacks
 * @param params.availableStacks - The available stacks
 * @param params.disableForm - Whether the form should be disabled
 * @returns The update stacks related to project form
 */
export function UpdateStacksRelatedToProject({
  currentProject,
  associatedStacks: initialAssociatedStacks,
  availableStacks: initialAvailableStacks,
  disableForm,
}: {
  currentProject: Project;
  associatedStacks: Stack[];
  availableStacks: Stack[];
  disableForm?: boolean;
}) {
  const { toast } = useToast();
  const { t } = useTranslations();

  // Form only used in the dialog to add a stack to the project
  const form = useForm<EntityRelationSchema>({
    defaultValues: {
      idTarget: currentProject.id,
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Create a function to relate a stack to the project
  const [associatedStacks, setAssociatedStacks] = useState<Stack[]>(initialAssociatedStacks);
  const [availableStacks, setAvailableStacks] = useState<Stack[]>(initialAvailableStacks);

  const onAddStack = async (values: EntityRelationSchema) => {
    try {
      await postProjectAddAssociatedStack({
        idSource: Number(values.idSource),
        idTarget: Number(values.idTarget),
      });

      // Reset the dialog form
      form.reset();

      // Show a success toast
      toast({
        title: t('components.update-stacks-related-project.success-title'),
        description: t('components.update-stacks-related-project.success-description'),
        className: 'bg-green-500 text-black',
      });

      // Update local state for associated and available stacks
      const findStack = availableStacks.find((stack) => stack.id === Number(values.idSource));

      if (isDefined(findStack)) {
        setAssociatedStacks((prev) => [...prev, findStack]);
        setAvailableStacks((prev) => prev.filter((stack) => stack.id !== Number(values.idSource)));
      }

      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'components.update-stacks-related-project.error-title',
        defaultErrorMessage: 'components.update-stacks-related-project.error-description',
        tryAgain: () => onAddStack(values),
      });
    }
  };

  const onRemoveStack = async (stackId: number) => {
    try {
      await deleteProjectRemoveAssociatedStack({
        idTarget: currentProject.id,
        idSource: stackId,
      });

      // Show a success toast
      toast({
        title: t('components.update-stacks-related-project.remove-success-title'),
        description: t('components.update-stacks-related-project.remove-success-description'),
        className: 'bg-green-500 text-black',
      });

      // Update local state for associated and available stacks
      const findStack = associatedStacks.find((stack) => stack.id === stackId);

      if (isDefined(findStack)) {
        setAvailableStacks((prev) => [...prev, findStack]);
        setAssociatedStacks((prev) => prev.filter((stack) => stack.id !== stackId));
      }

      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'components.update-stacks-related-project.remove-error-title',
        defaultErrorMessage: 'components.update-stacks-related-project.remove-error-description',
        tryAgain: () => onRemoveStack(stackId),
      });
    }
  };

  return (
    <ul className='mt-4 flex flex-wrap gap-4'>
      {associatedStacks?.map((stack) => (
        <li key={stack.id}>
          <Card className='my-5 flex w-max flex-col items-center justify-center rounded-lg bg-zinc-300 shadow-sm dark:bg-zinc-800'>
            <CardHeader className='relative'>
              <Button
                aria-label={t('components.update-stacks-related-project.remove-button-aria')}
                className='absolute -top-2.5 -right-2.5 m-0 flex aspect-square size-8 items-center justify-center rounded-full bg-red-500 p-0 text-center text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500'
                disabled={disableForm}
                onClick={() => onRemoveStack(stack.id)}
              >
                <X />
                <span className='sr-only'>
                  {t('components.update-stacks-related-project.remove-button')}
                </span>
              </Button>
              <img
                alt={t('components.update-stacks-related-project.aria-label.stack-logo', {
                  name: stack.name,
                })}
                className='size-20 rounded-lg'
                src={stack.iconUrl}
              />
            </CardHeader>
          </Card>
        </li>
      ))}
      <li>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              aria-label={t('components.update-stacks-related-project.add-button-aria')}
              className='my-5 flex aspect-square w-max flex-col items-center justify-center rounded-lg bg-zinc-300 p-6 shadow-sm dark:bg-zinc-800'
              type='button'
            >
              <Plus className='size-20' />
            </button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='text-center'>
                {t('components.update-stacks-related-project.dialog-title')}
              </DialogTitle>
              <DialogDescription>
                {t('components.update-stacks-related-project.dialog-description')}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                className='space-y-8'
                id='relation-with-stack'
                onSubmit={form.handleSubmit(onAddStack)}
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
                              <SelectValue
                                placeholder={t(
                                  'components.update-stacks-related-project.select-placeholder',
                                )}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {availableStacks.map((stack) => (
                                <SelectItem key={stack.id} value={String(stack.id)}>
                                  <div className='flex items-center gap-2'>
                                    <img
                                      alt={t(
                                        'components.update-stacks-related-project.aria-label.stack-logo',
                                        { name: stack.name },
                                      )}
                                      className='size-6'
                                      src={stack.iconUrl}
                                    />
                                    <span>{stack.name}</span>
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
                form='relation-with-stack'
                type='submit'
                typeof='submit'
              >
                {t('components.update-stacks-related-project.submit-button')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </li>
    </ul>
  );
}
