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
    accessorKey: "id",
    header({column}) {
      return <DataTableColumnHeader column={column} title="id" />;
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Nombre" />;
    },
  },
  {
    id: "key",
    accessorKey: "key",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Key" />;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Estado" />;
    },
  },
  {
    id: "stack",
    accessorKey: "stack",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Stack" />;
    },
  },
  {
    id: "startDate",
    accessorKey: "startDate",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Fecha de inicio" />;
    },
    cell({row}) {
      return moment(row.original.startDate).format(MIN_DATA_FORMAT);
    },
  },
  {
    id: "endDate",
    accessorKey: "endDate",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Fecha de fin" />;
    },
    cell({row}) {
      return moment(row.original.endDate).format(MIN_DATA_FORMAT);
    },
  },
  {
    id: "primaryColor",
    accessorKey: "primaryColor",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Color primario" />;
    },
  },
  {
    id: "demoUrl",
    accessorKey: "demoUrl",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Demo URL" />;
    },
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
    accessorKey: "githubUrl",
    header({column}) {
      return <DataTableColumnHeader column={column} title="GitHub URL" />;
    },
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
    accessorKey: "createdAt",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Fecha de creación" />;
    },
    cell({row}) {
      return moment(row.original.createdAt).format(MIN_DATA_FORMAT);
    },
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Fecha de actualización" />;
    },
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
