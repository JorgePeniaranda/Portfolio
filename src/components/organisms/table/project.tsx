import type {Project} from "@prisma/client";
import type {ColumnDef, Table} from "@tanstack/react-table";

import moment from "moment";

import {MIN_DATA_FORMAT} from "../../../constants/common";
import {Input} from "../../ui/input";
import {DataTable} from "../data-table";
import {selectionColumnDef} from "../data-table/column-def/selection";
import {DataTableColumnHeader} from "../data-table/column/dropdown";

const columns: Array<ColumnDef<Project>> = [
  selectionColumnDef<Project>(),
  {
    id: "id",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="id" />;
    },
    accessorKey: "id",
  },
  {
    id: "name",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="Nombre" />;
    },
    accessorKey: "name",
  },
  {
    id: "key",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="Key" />;
    },
    accessorKey: "key",
  },
  {
    id: "status",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="Estado" />;
    },
    accessorKey: "status",
  },
  {
    id: "stack",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="Stack" />;
    },
    accessorKey: "stack",
  },
  {
    id: "startDate",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="Fecha de inicio" />;
    },
    accessorKey: "startDate",
    cell({row}) {
      return moment(row.original.startDate).format(MIN_DATA_FORMAT);
    },
  },
  {
    id: "endDate",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="Fecha de fin" />;
    },
    accessorKey: "endDate",
    cell({row}) {
      return moment(row.original.endDate).format(MIN_DATA_FORMAT);
    },
  },
  {
    id: "primaryColor",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="Color primario" />;
    },
    accessorKey: "primaryColor",
  },
  {
    id: "demoUrl",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="Demo URL" />;
    },
    accessorKey: "demoUrl",
    cell({row}) {
      const value = row.original.demoUrl ?? "#";

      return (
        <a href={value} rel="noreferrer" target="_blank">
          {value}
        </a>
      );
    },
  },
  {
    id: "githubUrl",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="GitHub URL" />;
    },
    accessorKey: "githubUrl",
    cell({row}) {
      const value = row.original.demoUrl ?? "#";

      return (
        <a href={value} rel="noreferrer" target="_blank">
          {value}
        </a>
      );
    },
  },
  {
    id: "createdAt",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="Fecha de creación" />;
    },
    accessorKey: "createdAt",
    cell({row}) {
      return moment(row.original.createdAt).format(MIN_DATA_FORMAT);
    },
  },
  {
    id: "updatedAt",
    header: ({column}) => {
      return <DataTableColumnHeader column={column} title="Fecha de actualización" />;
    },
    accessorKey: "updatedAt",
    cell({row}) {
      return moment(row.original.updatedAt).format(MIN_DATA_FORMAT);
    },
  },
];

export function ProjectTable({data}: {data: Project[]}) {
  return <DataTable HeaderComponent={TableHeaderComponent} columns={columns} data={data} />;
}

function TableHeaderComponent<TData>({table}: {table: Table<TData>}) {
  return (
    <div className="flex items-center py-4">
      <Input
        autoComplete="off"
        className="max-w-xs"
        placeholder="Buscar por nombre..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
      />
    </div>
  );
}
