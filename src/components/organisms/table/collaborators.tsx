import type {Colaborator} from "@prisma/client";
import type {ColumnDef, Table} from "@tanstack/react-table";

import moment from "moment";

import {MIN_DATA_FORMAT} from "../../../constants/common";
import {Input} from "../../ui/input";
import {DataTable} from "../data-table";
import {selectionColumnDef} from "../data-table/column-def/selection";
import {DataTableColumnHeader} from "../data-table/column/dropdown";

const columns: Array<ColumnDef<Colaborator>> = [
  selectionColumnDef<Colaborator>(),
  {
    id: "id",
    accessorKey: "id",
    header({column}) {
      return <DataTableColumnHeader column={column} title="id" />;
    },
  },
  {
    id: "nickname",
    accessorKey: "nickname",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Nickname" />;
    },
  },
  {
    id: "githubUsername",
    accessorKey: "githubUsername",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Nickname de GitHub" />;
    },
  },
  {
    id: "linkedinUsername",
    accessorKey: "linkedinUsername",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Nickname de Linkedin" />;
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

export function CollaboratorTable({data}: {data: Colaborator[]}) {
  return <DataTable HeaderComponent={TableHeaderComponent} columns={columns} data={data} />;
}

function TableHeaderComponent<TData>({table}: {table: Table<TData>}) {
  return (
    <div className="flex items-center py-4">
      <Input
        autoComplete="off"
        className="max-w-xs"
        placeholder="Buscar por nickname..."
        value={(table.getColumn("nickname")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("nickname")?.setFilterValue(event.target.value)}
      />
    </div>
  );
}
