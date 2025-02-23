import type { Collaborator } from '@prisma/client';
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
import { deleteCollaborator } from '@/services/collaborator/deleteCollaborator';

export function CollaboratorsTableHeader({ table }: { table: Table<Collaborator> }) {
  const { toast } = useToast();

  const tableFilterValue = table.getColumn('nickname')?.getFilterValue();

  const selectedRowModel = table.getSelectedRowModel();
  const { rows, selectedCount } = useMemo(() => {
    return {
      ...selectedRowModel,
      selectedCount: selectedRowModel.rows.length ?? 0,
    };
  }, [selectedRowModel]);

  const handleDelete = async () => {
    try {
      // Send request to delete the collaborator
      await deleteCollaborator(rows.map((row) => row.original.id));

      // If the request was successful, show a success toast
      toast({
        title: 'Colaboradores eliminados',
        description: 'Los colaboradores seleccionados se han eliminaron correctamente.',
        className: 'bg-green-500 text-black',
      });

      // Remove the deleted collaborators from the table
      table?.options?.meta?.deleteRows?.(rows.map((row) => row.index));

      // Clear the selected rows
      table.setRowSelection({});
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'Error al eliminar colaboradores',
        defaultErrorMessage: 'Ha ocurrido un error al intentar eliminar los colaboradores.',
        tryAgain: () => handleDelete(),
      });
    }
  };

  return (
    <div className='flex items-center py-4'>
      <Input
        autoComplete='off'
        className='max-w-xs'
        placeholder='Buscar por nickname...'
        value={
          typeof tableFilterValue === 'string' || typeof tableFilterValue === 'number'
            ? tableFilterValue
            : ''
        }
        onChange={(event) => table.getColumn('nickname')?.setFilterValue(event.target.value)}
      />
      <ul className='ml-auto flex items-center space-x-2'>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <ConditionalAnchor
                  className='inline-flex size-max items-center justify-center whitespace-nowrap rounded-full bg-lime-600 p-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-lime-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-white dark:hover:bg-lime-500'
                  disabled={selectedCount !== 0}
                  disabledButtonProps={{
                    className: 'pointer-events-none opacity-50',
                  }}
                  href='/vault/views/collaborators/create'
                >
                  <Plus className='size-5' />
                </ConditionalAnchor>
              </TooltipTrigger>
              <TooltipContent>Crear</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <ConditionalAnchor
                  className='inline-flex size-max items-center justify-center whitespace-nowrap rounded-full bg-blue-600 p-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-blue-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-white dark:hover:bg-blue-500'
                  disabled={selectedCount !== 1 || isNotDefined(rows[0]?.original.id)}
                  disabledButtonProps={{
                    className: 'pointer-events-none opacity-50',
                  }}
                  href={`/vault/views/collaborators/${rows[0]?.original.id}`}
                >
                  <Eye className='size-5' />
                </ConditionalAnchor>
              </TooltipTrigger>
              <TooltipContent>Ver detalles</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <ConditionalAnchor
                  className='inline-flex size-max items-center justify-center whitespace-nowrap rounded-full bg-gray-600 p-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-white dark:hover:bg-gray-500'
                  disabled={selectedCount !== 1 || isNotDefined(rows[0]?.original.id)}
                  disabledButtonProps={{
                    className: 'pointer-events-none opacity-50',
                  }}
                  href={`/vault/views/collaborators/${rows[0]?.original.id}/edit`}
                >
                  <Pen className='size-5' />
                </ConditionalAnchor>
              </TooltipTrigger>
              <TooltipContent>Editar</TooltipContent>
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
                  <TooltipContent>Eliminar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Está completamente seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto borrará permanentemente el/los
                  colaboradores seleccionados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className='bg-red-500 text-white hover:bg-red-600 hover:text-white dark:text-white dark:hover:bg-red-400'
                  onClick={handleDelete}
                >
                  Borrar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </li>
      </ul>
    </div>
  );
}
