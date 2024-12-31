import type {Project} from "@prisma/client";
import type {ColumnDef, Table} from "@tanstack/react-table";

import {Eye, Pen, Plus, Trash} from "lucide-react";
import moment from "moment";
import {useMemo} from "react";

import {MIN_DATA_FORMAT} from "../../../constants/common";
import {Button} from "../../ui/button";
import {Input} from "../../ui/input";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../../ui/tooltip";
import {DataTable} from "../data-table";
import {selectionColumnDef} from "../data-table/column-def/selection";
import {DataTableColumnHeader} from "../data-table/column/dropdown";
import {useToast} from "../../../hooks/use-toast";
import {deleteProject} from "../../../services/project/deleteProject";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import {ENV} from "../../../constants/env";
import {isNotDefined} from "../../../helpers/guards/is-defined";

//#region Column Definitions
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
      if (isNotDefined(row.original.endDate)) {
        return "Sin fecha de fin";
      }

      return moment(row.original.endDate).format(MIN_DATA_FORMAT);
    },
  },
  {
    id: "primaryColor",
    accessorKey: "primaryColor",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Color primario" />;
    },
    cell({row}) {
      return (
        <div className="flex items-center gap-1">
          <div
            className="size-5 rounded-full"
            style={{backgroundColor: row.original.primaryColor}}
          />
          <span>({row.original.primaryColor})</span>
        </div>
      );
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
//#endregion

// MARK: - Collaborator Table
export function ProjectTable({data}: {data: Project[]}) {
  return <DataTable HeaderComponent={TableHeaderComponent} columns={columns} data={data} />;
}

// MARK: - Table Header Component
function TableHeaderComponent({table}: {table: Table<Project>}) {
  const {toast} = useToast();
  const selectedRowModel = table.getSelectedRowModel();
  const {rows, selectedCount} = useMemo(() => {
    return {
      ...selectedRowModel,
      selectedCount: selectedRowModel.rows.length ?? 0,
    };
  }, [selectedRowModel]);

  const handleCreate = () => {
    window.location.href = "/vault/views/project/create";
  };

  const handleView = () => {
    window.location.href = `/vault/views/project/${rows[0].original.id}`;
  };

  const handleEdit = () => {
    window.location.href = `/vault/views/project/${rows[0].original.id}/edit`;
  };

  const handleDelete = async () => {
    const response = await deleteProject(rows.map((row) => row.original.id));

    if (response.success) {
      toast({
        title: "Colaboradores eliminados",
        description: "Los colaboradores seleccionados se eliminaron correctamente.",
        className: "bg-green-500",
      });

      window.location.reload();
    } else {
      toast({
        title: "Error al eliminar colaboradores",
        description: "No se pudieron eliminar los colaboradores seleccionados.",
        className: "bg-green-500",
      });
    }
  };

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
          <AlertDialog>
            <AlertDialogTrigger disabled={selectedCount <= 0}>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      className="size-max rounded-full bg-red-500 p-2 text-white hover:bg-red-600 hover:text-white dark:text-white dark:hover:bg-red-400"
                      disabled={selectedCount <= 0}
                      variant="outline"
                    >
                      <Trash className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Eliminar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Está completamente seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto borrará permanentemente el/los proyectos
                  seleccionados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white hover:bg-red-600 hover:text-white dark:text-white dark:hover:bg-red-400"
                  disabled={ENV.isServerSideEnable === false}
                  onClick={handleDelete}
                >
                  Borrar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </li>
      </ul>
    </div>
  );
}
