import type { TranslationKey } from '@/types/translation';
import type { Collaborator } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import { selectionColumnDef } from '@/components/organisms/data-table/column-def/selection';
import { DataTableColumnHeader } from '@/components/organisms/data-table/column/dropdown';
import { isNotDefined } from '@/helpers/guards/is-defined';

export const CollaboratorsTableColumns: ColumnDef<Collaborator>[] = [
  selectionColumnDef<Collaborator>(),
  {
    id: 'nickname',
    accessorKey: 'nickname',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.collaborators.columns.nickname';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
  },
  {
    id: 'githubUsername',
    accessorKey: 'githubUsername',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.collaborators.columns.github';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
    cell({ row }) {
      if (isNotDefined(row.original.githubUsername)) {
        return null;
      }

      return (
        <a
          className='text-blue-500'
          href={`https://github.com/${row.original.githubUsername}`}
          rel='noreferrer'
          target='_blank'
        >
          {row.original.githubUsername}
        </a>
      );
    },
  },
  {
    id: 'linkedinUsername',
    accessorKey: 'linkedinUsername',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.collaborators.columns.linkedin';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
    cell({ row }) {
      if (isNotDefined(row.original.linkedinUsername)) {
        return null;
      }

      return (
        <a
          className='text-blue-500'
          href={`https://www.linkedin.com/in/${row.original.linkedinUsername}`}
          rel='noreferrer'
          target='_blank'
        >
          {row.original.linkedinUsername}
        </a>
      );
    },
  },
] as const;
