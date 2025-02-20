import type { Collaborator } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import { selectionColumnDef } from '@/components/organisms/data-table/column-def/selection';
import { DataTableColumnHeader } from '@/components/organisms/data-table/column/dropdown';

export const CollaboratorsTableColumns: Array<ColumnDef<Collaborator>> = [
  selectionColumnDef<Collaborator>(),
  {
    id: 'nickname',
    accessorKey: 'nickname',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Nickname' />;
    },
  },
  {
    id: 'githubUsername',
    accessorKey: 'githubUsername',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Nickname de GitHub' />;
    },
    cell({ row }) {
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
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Nickname de Linkedin' />;
    },
    cell({ row }) {
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
