import type { Stack } from '@prisma/client';
import type { ColumnDef, Table } from '@tanstack/react-table';

import { Eye, Pen, Plus, Trash } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ConditionalAnchor } from '@/components/atoms/conditional-anchor';
import { DataTable } from '@/components/organisms/data-table';
import { selectionColumnDef } from '@/components/organisms/data-table/column-def/selection';
import { DataTableColumnHeader } from '@/components/organisms/data-table/column/dropdown';
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
import {
  STACK_CATEGORY_TRANSCRIPTIONS,
  STACK_TYPE_TRANSCRIPTIONS,
} from '@/constants/transcriptions';
import { handleErrorWithToast } from '@/helpers/error/toast-handler';
import { isNotDefined } from '@/helpers/guards/is-defined';
import { useToast } from '@/hooks/use-toast';
import { deleteStack } from '@/services/stack/deleteStack';

//#region Column Definitions
const columns: Array<ColumnDef<Stack>> = [
  selectionColumnDef<Stack>(),
  {
    id: 'name',
    accessorKey: 'name',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Nombre' />;
    },
  },
  {
    id: 'key',
    accessorKey: 'key',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Key' />;
    },
  },
  {
    id: 'description',
    accessorKey: 'description',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Descripción' />;
    },
  },
  {
    id: 'category',
    accessorKey: 'category',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Categoria' />;
    },
    cell({ row }) {
      if (
        isNotDefined(row.original?.category) ||
        !(row.original?.category in STACK_CATEGORY_TRANSCRIPTIONS)
      ) {
        return 'Sin categoría';
      }

      return STACK_CATEGORY_TRANSCRIPTIONS[row.original.category];
    },
  },
  {
    id: 'type',
    accessorKey: 'type',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Tipo' />;
    },
    cell({ row }) {
      if (isNotDefined(row.original?.type) || !(row.original?.type in STACK_TYPE_TRANSCRIPTIONS)) {
        return 'Sin categoría';
      }

      return STACK_TYPE_TRANSCRIPTIONS[row.original.type];
    },
  },
];

// MARK: - Stack Table
/**
 * Stack Table Component
 * @param params - The component props
 * @param params.data - The initial data to display in the table
 * @returns The Stack Table Component
 */
export function StackTable({ data: initialData }: { data: Stack[] }) {
  const [data, setData] = useState<Stack[]>(initialData);

  const deleteRows = (indexes: number[]) => {
    setData((prevData) => {
      return prevData.filter((_, i) => !indexes.includes(i));
    });
  };

  return (
    <DataTable
      HeaderComponent={TableHeaderComponent}
      columns={columns}
      data={data}
      meta={{
        deleteRows,
      }}
    />
  );
}

// MARK: - Table Header Component
function TableHeaderComponent({ table }: { table: Table<Stack> }) {
  const { toast } = useToast();
  const selectedRowModel = table.getSelectedRowModel();
  const { rows, selectedCount } = useMemo(() => {
    return {
      ...selectedRowModel,
      selectedCount: selectedRowModel.rows.length ?? 0,
    };
  }, [selectedRowModel]);

  const handleDelete = async () => {
    try {
      // Send request to delete the stack
      await deleteStack(rows.map((row) => row.original.id));
      // If the request was successful, show a success toast
      toast({
        title: 'Colaboradores eliminados',
        description: 'Los stack seleccionados se han eliminado correctamente.',
        className: 'bg-green-500 text-black',
      });

      // Remove the deleted stacks from the table
      table?.options?.meta?.deleteRows?.(rows.map((row) => row.index));

      // Clear the selected rows
      table.setRowSelection({});
    } catch (error) {
      handleErrorWithToast({
        error,
        title: 'Error al eliminar los stack',
        defaultErrorMessage: 'Ha ocurrido un error al intentar eliminar los stacks seleccionados.',
        tryAgain: () => handleDelete(),
      });
    }
  };

  return (
    <div className='flex items-center py-4'>
      <Input
        autoComplete='off'
        className='max-w-xs'
        placeholder='Buscar por nombre...'
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
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
                  href='/vault/views/stack/create'
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
                  href={`/vault/views/stack/${rows[0]?.original.id}`}
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
                  href={`/vault/views/stack/${rows[0]?.original.id}/edit`}
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
                  Esta acción no se puede deshacer. Esto borrará permanentemente el/los stacks
                  seleccionados.
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
