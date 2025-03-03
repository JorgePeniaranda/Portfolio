import { useMemo, useCallback } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Table as ITable,
  type TableMeta,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  HeaderComponent?: ({ table }: { table: ITable<TData> }) => React.ReactNode;
  meta?: TableMeta<TData>;
}

/**
 * Data table component.
 * @param params - The component props
 * @param params.columns - The columns to show
 * @param params.data - The data to show
 * @param params.HeaderComponent - The header component
 * @param params.meta - The table meta
 * @returns The data table
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  HeaderComponent,
  meta,
}: DataTableProps<TData, TValue>) {
  // Memoize columns and data to avoid unnecessary recalculations
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  // Memoized table instance
  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta,
  });

  // Callback handlers to prevent unnecessary re-renders
  const handlePageSizeChange = useCallback(
    (value: string) => table.setPageSize(Number(value)),
    [table],
  );

  const handleFirstPage = useCallback(() => table.setPageIndex(0), [table]);
  const handlePrevPage = useCallback(() => table.previousPage(), [table]);
  const handleNextPage = useCallback(() => table.nextPage(), [table]);
  const handleLastPage = useCallback(() => table.setPageIndex(table.getPageCount() - 1), [table]);

  return (
    <>
      {HeaderComponent?.({ table })}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className='h-24 text-center' colSpan={columns.length}>
                  Sin datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className='flex items-center justify-between px-2'>
          <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} de{' '}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
          </div>
          <div className='flex items-center space-x-6 py-2 lg:space-x-8'>
            <div className='flex items-center space-x-2'>
              <p className='text-sm font-medium'>Filas por página</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className='h-8 w-[70px]'>
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side='top'>
                  {[10, 15, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                className='hidden size-8 p-0 lg:flex'
                disabled={!table.getCanPreviousPage()}
                variant='outline'
                onClick={handleFirstPage}
              >
                <span className='sr-only'>Ir a la primera página</span>
                <ChevronsLeft />
              </Button>
              <Button
                className='size-8 p-0'
                disabled={!table.getCanPreviousPage()}
                variant='outline'
                onClick={handlePrevPage}
              >
                <span className='sr-only'>Ir a la página anterior</span>
                <ChevronLeft />
              </Button>
              <Button
                className='size-8 p-0'
                disabled={!table.getCanNextPage()}
                variant='outline'
                onClick={handleNextPage}
              >
                <span className='sr-only'>Ir a la página siguiente</span>
                <ChevronRight />
              </Button>
              <Button
                className='hidden size-8 p-0 lg:flex'
                disabled={!table.getCanNextPage()}
                variant='outline'
                onClick={handleLastPage}
              >
                <span className='sr-only'>Ir a la última página</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
