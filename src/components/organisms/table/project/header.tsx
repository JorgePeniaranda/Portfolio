import type { Project } from '@prisma/client';
import type { Table } from '@tanstack/react-table';

import { Eye, Pen, Plus, Trash } from 'lucide-react';
import { useMemo } from 'react';

import { ConditionalAnchor } from '@/components/atoms/conditional-anchor';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { handleErrorWithToast } from '@/helpers/error/toast-handler';
import { isNotDefined } from '@/helpers/guards/is-defined';
import { useToast } from '@/hooks/use-toast';
import { deleteProject } from '@/services/project/deleteProject';
import { useTranslations } from '@/hooks/use-translations';

export function ProjectTableHeader({ table }: { table: Table<Project> }) {
  const { t } = useTranslations();
  const { toast } = useToast();

  const tableFilterValue = table.getColumn('name')?.getFilterValue();

  const selectedRowModel = table.getSelectedRowModel();
  const { rows, selectedCount } = useMemo(() => {
    return {
      ...selectedRowModel,
      selectedCount: selectedRowModel.rows.length ?? 0,
    };
  }, [selectedRowModel]);

  const handleDelete = async () => {
    try {
      await deleteProject(rows.map((row) => row.original.id));

      // If the request was successful, show a success toast
      toast({
        title: t('components.table.projects.messages.success-title'),
        description: t('components.table.projects.messages.success-description'),
        className: 'bg-green-500 text-black',
      });

      // Remove the deleted projects from the table
      table?.options?.meta?.deleteRows?.(rows.map((row) => row.index));

      // Clear the selected rows
      table.setRowSelection({});
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'components.table.projects.messages.error-title',
        defaultErrorMessage: 'components.table.projects.messages.error-description',
        tryAgain: () => handleDelete(),
      });
    }
  };

  return (
    <div className='flex items-center py-4'>
      <Input
        autoComplete='off'
        className='max-w-xs'
        placeholder={t('components.table.projects.placeholders.search')}
        value={
          typeof tableFilterValue === 'string' || typeof tableFilterValue === 'number'
            ? tableFilterValue
            : ''
        }
        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
      />
      <ul className='ml-auto flex items-center space-x-2'>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <ConditionalAnchor
                  className='ring-offset-background focus-visible:ring-ring inline-flex size-max items-center justify-center rounded-full bg-lime-600 p-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-lime-700 hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden dark:text-white dark:hover:bg-lime-500'
                  disabled={selectedCount !== 0}
                  disabledButtonProps={{
                    className: 'pointer-events-none opacity-50',
                  }}
                  href='/vault/views/project/create'
                >
                  <Plus className='size-5' />
                </ConditionalAnchor>
              </TooltipTrigger>
              <TooltipContent>{t('components.table.projects.actions.create')}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <ConditionalAnchor
                  className='ring-offset-background focus-visible:ring-ring inline-flex size-max items-center justify-center rounded-full bg-blue-600 p-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-blue-700 hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden dark:text-white dark:hover:bg-blue-500'
                  disabled={selectedCount !== 1 || isNotDefined(rows[0]?.original.id)}
                  disabledButtonProps={{
                    className: 'pointer-events-none opacity-50',
                  }}
                  href={`/vault/views/project/${rows[0]?.original.id}`}
                >
                  <Eye className='size-5' />
                </ConditionalAnchor>
              </TooltipTrigger>
              <TooltipContent>{t('components.table.projects.actions.view')}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <ConditionalAnchor
                  className='ring-offset-background focus-visible:ring-ring inline-flex size-max items-center justify-center rounded-full bg-gray-600 p-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-gray-700 hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden dark:text-white dark:hover:bg-gray-500'
                  disabled={selectedCount !== 1 || isNotDefined(rows[0]?.original.id)}
                  disabledButtonProps={{
                    className: 'pointer-events-none opacity-50',
                  }}
                  href={`/vault/views/project/${rows[0]?.original.id}/edit`}
                >
                  <Pen className='size-5' />
                </ConditionalAnchor>
              </TooltipTrigger>
              <TooltipContent>{t('components.table.projects.actions.edit')}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <AlertDialog>
            <AlertDialogTrigger disabled={selectedCount <= 0}>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      className='size-max rounded-full bg-red-500 p-2 text-white hover:bg-red-600 hover:text-white dark:text-white dark:hover:bg-red-400'
                      disabled={selectedCount <= 0}
                      variant='outline'
                    >
                      <Trash className='size-5' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t('components.table.projects.actions.delete')}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t('components.table.projects.messages.confirm-title')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t('components.table.projects.messages.confirm-description')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {t('components.table.projects.buttons.cancel')}
                </AlertDialogCancel>
                <AlertDialogAction
                  className='bg-red-500 text-white hover:bg-red-600 hover:text-white dark:text-white dark:hover:bg-red-400'
                  onClick={handleDelete}
                >
                  {t('components.table.projects.buttons.delete')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </li>
      </ul>
    </div>
  );
}
