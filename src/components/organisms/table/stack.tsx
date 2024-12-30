import type {Stack} from "@prisma/client";
import type {ColumnDef, Table} from "@tanstack/react-table";

import moment from "moment";
import {Eye, Pen, Plus, Trash} from "lucide-react";

import {MIN_DATA_FORMAT} from "../../../constants/common";
import {
  STACK_CATEGORY_TRANSCRIPTIONS,
  STACK_TYPE_TRANSCRIPTIONS,
} from "../../../constants/transcriptions";
import {isNotDefined} from "../../../helpers/guards/is-defined";
import {Input} from "../../ui/input";
import {DataTable} from "../data-table";
import {selectionColumnDef} from "../data-table/column-def/selection";
import {DataTableColumnHeader} from "../data-table/column/dropdown";
import {Button} from "../../ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../../ui/tooltip";

const columns: Array<ColumnDef<Stack>> = [
  selectionColumnDef<Stack>(),
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
    id: "description",
    accessorKey: "description",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Descripción" />;
    },
  },
  {
    id: "category",
    accessorKey: "category",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Categoria" />;
    },
    cell({row}) {
      if (
        isNotDefined(row.original?.category) ||
        !(row.original?.category in STACK_CATEGORY_TRANSCRIPTIONS)
      ) {
        return "Sin categoría";
      }

      return STACK_CATEGORY_TRANSCRIPTIONS[row.original.category];
    },
  },
  {
    id: "type",
    accessorKey: "type",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Tipo" />;
    },
    cell({row}) {
      if (isNotDefined(row.original?.type) || !(row.original?.type in STACK_TYPE_TRANSCRIPTIONS)) {
        return "Sin categoría";
      }

      return STACK_TYPE_TRANSCRIPTIONS[row.original.type];
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

export function StackTable({data}: {data: Stack[]}) {
  return <DataTable HeaderComponent={TableHeaderComponent} columns={columns} data={data} />;
}

function TableHeaderComponent<TData>({table}: {table: Table<TData>}) {
  // const {getSelectedRowModel} = table;

  const handleCreate = () => {};

  const handleView = () => {};

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div className="flex items-center py-4">
      <Input
        autoComplete="off"
        className="max-w-xs"
        placeholder="Buscar por nombre..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
      />
      <ul className="ml-auto flex items-center space-x-2">
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  className="size-max rounded-full bg-lime-600 p-2 text-white hover:bg-lime-700 hover:text-white dark:text-white dark:hover:bg-lime-500"
                  variant="outline"
                  onClick={handleCreate}
                >
                  <Plus className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Crear</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  className="size-max rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 hover:text-white dark:text-white dark:hover:bg-blue-400"
                  variant="outline"
                  onClick={handleView}
                >
                  <Eye className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ver detalles</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  className="size-max rounded-full bg-gray-500 p-2 text-white hover:bg-gray-600 hover:text-white dark:text-white dark:hover:bg-gray-400"
                  variant="outline"
                  onClick={handleEdit}
                >
                  <Pen className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Editar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  className="size-max rounded-full bg-red-500 p-2 text-white hover:bg-red-600 hover:text-white dark:text-white dark:hover:bg-red-400"
                  variant="outline"
                  onClick={handleDelete}
                >
                  <Trash className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Eliminar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </div>
  );
}
