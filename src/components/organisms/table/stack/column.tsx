import type { Stack } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import { selectionColumnDef } from '@/components/organisms/data-table/column-def/selection';
import { DataTableColumnHeader } from '@/components/organisms/data-table/column/dropdown';
import {
  STACK_CATEGORY_TRANSCRIPTIONS,
  STACK_TYPE_TRANSCRIPTIONS,
} from '@/constants/transcriptions';
import { isNotDefined } from '@/helpers/guards/is-defined';

export const StackTableColumns: ColumnDef<Stack>[] = [
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
        return;
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
        return;
      }

      return STACK_TYPE_TRANSCRIPTIONS[row.original.type];
    },
  },
] as const;
