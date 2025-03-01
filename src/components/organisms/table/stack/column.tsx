import type { Stack } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import type { TranslationKey } from '@/types/translation';

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
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.stack.columns.name';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
  },
  {
    id: 'key',
    accessorKey: 'key',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.stack.columns.key';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
  },
  {
    id: 'description',
    accessorKey: 'description',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.stack.columns.description';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
  },
  {
    id: 'category',
    accessorKey: 'category',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.stack.columns.category';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
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
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.stack.columns.type';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
    cell({ row }) {
      if (isNotDefined(row.original?.type) || !(row.original?.type in STACK_TYPE_TRANSCRIPTIONS)) {
        return;
      }

      return STACK_TYPE_TRANSCRIPTIONS[row.original.type];
    },
  },
] as const;
