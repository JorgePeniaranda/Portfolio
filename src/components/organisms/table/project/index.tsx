import type { Project } from '@prisma/client';

import { useState } from 'react';

import { ProjectTableColumns } from './column';
import { ProjectTableHeader } from './header';

import { DataTable } from '@/components/organisms/data-table';
import { useTranslations } from '@/hooks/use-translations';

/**
 * Project Table Component
 * @param params - The component props
 * @param params.data - The initial data to display in the table
 * @returns The Project Table Component
 */
export function ProjectTable({ data: initialData }: { data: Project[] }) {
  const { t } = useTranslations();

  const [data, setData] = useState<Project[]>(initialData);

  const deleteRows = (indexes: number[]) => {
    setData((prevData) => {
      return prevData.filter((_, i) => !indexes.includes(i));
    });
  };

  return (
    <DataTable
      HeaderComponent={ProjectTableHeader}
      columns={ProjectTableColumns}
      data={data}
      meta={{
        deleteRows,
        translateFn: t,
      }}
    />
  );
}
