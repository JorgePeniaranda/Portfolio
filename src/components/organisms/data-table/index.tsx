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
import { isDefined } from '@/helpers/guards/is-defined';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  HeaderComponent?: ({ table }: { table: ITable<TData> }) => React.ReactNode;
  meta?: TableMeta<TData>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  HeaderComponent,
  meta,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta,
  });

  return (
    <>
      {isDefined(HeaderComponent) && HeaderComponent({ table })}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='flex items-center space-x-6 py-2 lg:space-x-8'>
            <div className='flex items-center space-x-2'>
              <p className='text-sm font-medium'>Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
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
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                className='hidden size-8 p-0 lg:flex'
                disabled={!table.getCanPreviousPage()}
                variant='outline'
                onClick={() => table.setPageIndex(0)}
              >
                <span className='sr-only'>Go to first page</span>
                <ChevronsLeft />
              </Button>
              <Button
                className='size-8 p-0'
                disabled={!table.getCanPreviousPage()}
                variant='outline'
                onClick={() => table.previousPage()}
              >
                <span className='sr-only'>Go to previous page</span>
                <ChevronLeft />
              </Button>
              <Button
                className='size-8 p-0'
                disabled={!table.getCanNextPage()}
                variant='outline'
                onClick={() => table.nextPage()}
              >
                <span className='sr-only'>Go to next page</span>
                <ChevronRight />
              </Button>
              <Button
                className='hidden size-8 p-0 lg:flex'
                disabled={!table.getCanNextPage()}
                variant='outline'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                <span className='sr-only'>Go to last page</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
