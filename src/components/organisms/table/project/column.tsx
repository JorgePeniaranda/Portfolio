import type { Project } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import type { TranslationKey } from '@/types/translation';

import moment from 'moment';

import { selectionColumnDef } from '@/components/organisms/data-table/column-def/selection';
import { DataTableColumnHeader } from '@/components/organisms/data-table/column/dropdown';
import { DATA_FORMAT } from '@/constants/common';
import {
  PROJECT_STATUS_TRANSCRIPTIONS,
  STACK_CATEGORY_TRANSCRIPTIONS,
} from '@/constants/transcriptions';
import { isNotDefined } from '@/helpers/guards/is-defined';

export const ProjectTableColumns: ColumnDef<Project>[] = [
  selectionColumnDef<Project>(),
  {
    id: 'name',
    accessorKey: 'name',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.projects.columns.name';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
  },
  {
    id: 'key',
    accessorKey: 'key',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.projects.columns.key';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.projects.columns.status';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
    cell({ row }) {
      return PROJECT_STATUS_TRANSCRIPTIONS[row.original.status];
    },
  },
  {
    id: 'stackCategory',
    accessorKey: 'stackCategory',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.projects.columns.stack';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
    cell({ row }) {
      return STACK_CATEGORY_TRANSCRIPTIONS[row.original.stackCategory];
    },
  },
  {
    id: 'startDate',
    accessorKey: 'startDate',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.projects.columns.start-date';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
    cell({ row }) {
      return moment(row.original.startDate).format(DATA_FORMAT);
    },
  },
  {
    id: 'endDate',
    accessorKey: 'endDate',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.projects.columns.end-date';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
    cell({ row }) {
      if (isNotDefined(row.original.endDate)) {
        return;
      }

      return moment(row.original.endDate).format(DATA_FORMAT);
    },
  },
  {
    id: 'primaryColor',
    accessorKey: 'primaryColor',
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.projects.columns.primary-color';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
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
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.projects.columns.demo-url';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
    cell({ row }) {
      if (isNotDefined(row.original.demoUrl)) {
        return;
      }

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
    header({ column, table }) {
      const translationKey: TranslationKey = 'components.table.projects.columns.github-url';
      const translatedTitle = table.options?.meta?.translateFn?.(translationKey);

      return <DataTableColumnHeader column={column} title={translatedTitle ?? translationKey} />;
    },
    cell({ row }) {
      if (isNotDefined(row.original.githubUrl)) {
        return;
      }

      const value = row.original.githubUrl;

      return (
        <a className='text-blue-500' href={value} rel='noreferrer' target='_blank'>
          {value}
        </a>
      );
    },
  },
] as const;
