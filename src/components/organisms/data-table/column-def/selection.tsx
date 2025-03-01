import type { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

/**
 * Selection column definition.
 * @returns The selection column definition
 */
export function selectionColumnDef<TData>(): ColumnDef<TData> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label='Select all'
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        className='border-black data-[state=checked]:bg-white dark:border-white'
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label='Select row'
        checked={row.getIsSelected()}
        className='border-black data-[state=checked]:bg-white dark:border-white'
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}
