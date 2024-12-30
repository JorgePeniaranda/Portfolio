import type {Colaborator} from "@prisma/client";
import type {ColumnDef, Table} from "@tanstack/react-table";

import moment from "moment";
import {Eye, Pen, Plus, Trash} from "lucide-react";
import {useMemo} from "react";

import {MIN_DATA_FORMAT} from "../../../constants/common";
import {Input} from "../../ui/input";
import {DataTable} from "../data-table";
import {selectionColumnDef} from "../data-table/column-def/selection";
import {DataTableColumnHeader} from "../data-table/column/dropdown";
import {Button} from "../../ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../../ui/tooltip";

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

function TableHeaderComponent({table}: {table: Table<Colaborator>}) {
  const selectedRowModel = table.getSelectedRowModel();
  const {rows, selectedCount} = useMemo(() => {
    return {
      ...selectedRowModel,
      selectedCount: selectedRowModel.rows.length ?? 0,
    };
  }, [selectedRowModel]);

  const handleCreate = () => {
    window.location.href = "/vault/views/collaborators/create";
  };

  const handleView = () => {
    window.location.href = `/vault/views/collaborators/${rows[0].original.id}`;
  };

  const handleEdit = () => {
    window.location.href = `/vault/views/collaborators/${rows[0].original.id}/edit`;
  };

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que deseas eliminar los colaboradores seleccionados?")) {
    }
  };

  return (
    <div className="flex items-center py-4">
      <Input
        autoComplete="off"
        className="max-w-xs"
        placeholder="Buscar por nickname..."
        value={(table.getColumn("nickname")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("nickname")?.setFilterValue(event.target.value)}
      />
      <ul className="ml-auto flex items-center space-x-2">
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  className="size-max rounded-full bg-lime-600 p-2 text-white hover:bg-lime-700 hover:text-white dark:text-white dark:hover:bg-lime-500"
                  disabled={selectedCount !== 0}
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
                  disabled={selectedCount !== 1}
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
                  disabled={selectedCount !== 1}
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
                  disabled={selectedCount <= 0}
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
