import type { Collaborator } from '@prisma/client';

import { useState } from 'react';

import { CollaboratorsTableColumns } from './columns';
import { CollaboratorsTableHeader } from './header';

import { DataTable } from '@/components/organisms/data-table';

/**
 * Collaborator Table Component
 * @param params - The component props
 * @param params.data - The initial data to display in the table
 * @returns The Collaborator Table Component
 */
export function CollaboratorTable({ data: initialData }: { data: Collaborator[] }) {
  const [data, setData] = useState<Collaborator[]>(initialData);

  const deleteRows = (indexes: number[]) => {
    setData((prevData) => {
      return prevData.filter((_, i) => !indexes.includes(i));
    });
  };

  return (
    <DataTable
      HeaderComponent={CollaboratorsTableHeader}
      columns={CollaboratorsTableColumns}
      data={data}
      meta={{
        deleteRows,
      }}
    />
  );
}
