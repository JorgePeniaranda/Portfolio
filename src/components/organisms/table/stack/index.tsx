import type { Stack } from '@prisma/client';

import { useState } from 'react';

import { StackTableColumns } from './column';
import { StackTableHeader } from './header';

import { DataTable } from '@/components/organisms/data-table';
import useTranslations from '@/hooks/use-translations';

/**
 * Stack Table Component
 * @param params - The component props
 * @param params.data - The initial data to display in the table
 * @returns The Stack Table Component
 */
export function StackTable({ data: initialData }: { data: Stack[] }) {
  const { t } = useTranslations();

  const [data, setData] = useState<Stack[]>(initialData);

  const deleteRows = (indexes: number[]) => {
    setData((prevData) => {
      return prevData.filter((_, i) => !indexes.includes(i));
    });
  };

  return (
    <DataTable
      HeaderComponent={StackTableHeader}
      columns={StackTableColumns}
      data={data}
      meta={{
        deleteRows,
        translateFn: t,
      }}
    />
  );
}
