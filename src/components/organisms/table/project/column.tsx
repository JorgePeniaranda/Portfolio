import type { Project } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import moment from 'moment';

import { selectionColumnDef } from '@/components/organisms/data-table/column-def/selection';
import { DataTableColumnHeader } from '@/components/organisms/data-table/column/dropdown';
import { DATA_FORMAT } from '@/constants/common';
import {
  PROJECT_STATUS_TRANSCRIPTIONS,
  STACK_CATEGORY_TRANSCRIPTIONS,
} from '@/constants/transcriptions';
import { isNotDefined } from '@/helpers/guards/is-defined';

export const ProjectTableColumns: Array<ColumnDef<Project>> = [
  selectionColumnDef<Project>(),
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
    id: 'status',
    accessorKey: 'status',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Estado' />;
    },
    cell({ row }) {
      return PROJECT_STATUS_TRANSCRIPTIONS[row.original.status];
    },
  },
  {
    id: 'stackCategory',
    accessorKey: 'stackCategory',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Stack' />;
    },
    cell({ row }) {
      return STACK_CATEGORY_TRANSCRIPTIONS[row.original.stackCategory];
    },
  },
  {
    id: 'startDate',
    accessorKey: 'startDate',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Fecha de inicio' />;
    },
    cell({ row }) {
      return moment(row.original.startDate).format(DATA_FORMAT);
    },
  },
  {
    id: 'endDate',
    accessorKey: 'endDate',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Fecha de fin' />;
    },
    cell({ row }) {
      if (isNotDefined(row.original.endDate)) {
        return 'Sin fecha de fin';
      }

      return moment(row.original.endDate).format(DATA_FORMAT);
    },
  },
  {
    id: 'primaryColor',
    accessorKey: 'primaryColor',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Color primario' />;
    },
    cell({ row }) {
      return (
        <div className='flex items-center gap-1'>
          <div
            className='size-5 rounded-full'
            style={{ backgroundColor: row.original.primaryColor }}
          />
          <span>({row.original.primaryColor})</span>
        </div>
      );
    },
  },
  {
    id: 'demoUrl',
    accessorKey: 'demoUrl',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='Demo URL' />;
    },
    cell({ row }) {
      const value = row.original.demoUrl ?? '#';

      return (
        <a className='text-blue-500' href={value} rel='noreferrer' target='_blank'>
          {value}
        </a>
      );
    },
  },
  {
    id: 'githubUrl',
    accessorKey: 'githubUrl',
    header({ column }) {
      return <DataTableColumnHeader column={column} title='GitHub URL' />;
    },
    cell({ row }) {
      const value = row.original.demoUrl ?? '#';

      return (
        <a className='text-blue-500' href={value} rel='noreferrer' target='_blank'>
          {value}
        </a>
      );
    },
  },
] as const;
