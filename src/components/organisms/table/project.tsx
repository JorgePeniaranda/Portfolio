import type {Project} from "@prisma/client";
import type {ColumnDef, Table} from "@tanstack/react-table";

import {Eye, Pen, Plus, Trash} from "lucide-react";
import moment from "moment";
import {useMemo, useState} from "react";

import {ConditionalAnchor} from "@/components/atoms/conditional-anchor";
import {DataTable} from "@/components/organisms/data-table";
import {selectionColumnDef} from "@/components/organisms/data-table/column-def/selection";
import {DataTableColumnHeader} from "@/components/organisms/data-table/column/dropdown";
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
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {MIN_DATA_FORMAT} from "@/constants/common";
import {ENV} from "@/constants/env";
import {
  PROJECT_STATUS_TRANSCRIPTIONS,
  STACK_CATEGORY_TRANSCRIPTIONS,
} from "@/constants/transcriptions";
import {isDefined, isNotDefined} from "@/helpers/guards/is-defined";
import {useToast} from "@/hooks/use-toast";
import {deleteProject} from "@/services/project/deleteProject";
import {handleErrorWithToast} from "@/helpers/error/toast-handler";

//#region Column Definitions
const columns: Array<ColumnDef<Project>> = [
  selectionColumnDef<Project>(),
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
    cell({row}) {
      return PROJECT_STATUS_TRANSCRIPTIONS[row.original.status];
    },
  },
  {
    id: "stackCategory",
    accessorKey: "stackCategory",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Stack" />;
    },
    cell({row}) {
      return STACK_CATEGORY_TRANSCRIPTIONS[row.original.stackCategory];
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
        <a className="text-blue-500" href={value} rel="noreferrer" target="_blank">
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
        <a className="text-blue-500" href={value} rel="noreferrer" target="_blank">
          {value}
        </a>
      );
    },
  },
];
//#endregion

// MARK: - Collaborator Table
export function ProjectTable({data: initialData}: {data: Project[]}) {
  const [data, setData] = useState<Project[]>(initialData);

  const deleteRows = (indexes: number[]) => {
    setData((prevData) => {
      return prevData.filter((_, i) => !indexes.includes(i));
    });
  };

  return (
    <DataTable
      HeaderComponent={TableHeaderComponent}
      columns={columns}
      data={data}
      meta={{
        deleteRows,
      }}
    />
  );
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

  const handleDelete = async () => {
    try {
      await deleteProject(rows.map((row) => row.original.id));

      // If the request was successful, show a success toast
      toast({
        title: "Colaboradores eliminados",
        description: "Los proyectos seleccionados se han eliminado correctamente.",
        className: "bg-green-500 text-black",
      });

      // Remove the deleted projects from the table
      if (isDefined(table.options.meta?.deleteRows)) {
        table.options.meta.deleteRows(rows.map((row) => row.index));
      }

      // Clear the selected rows
      table.setRowSelection({});
    } catch (error) {
      handleErrorWithToast({
        error,
        title: "Error al eliminar proyectos",
        defaultErrorMessage: "Ha ocurrido un error al eliminar los proyectos.",
        tryAgain: () => handleDelete(),
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
                <ConditionalAnchor
                  className="inline-flex size-max items-center justify-center whitespace-nowrap rounded-full bg-lime-600 p-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-lime-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-white dark:hover:bg-lime-500"
                  disabled={selectedCount !== 0}
                  disabledButtonProps={{
                    className: "pointer-events-none opacity-50",
                  }}
                  href="/vault/views/project/create"
                >
                  <Plus className="size-5" />
                </ConditionalAnchor>
              </TooltipTrigger>
              <TooltipContent>Crear</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <ConditionalAnchor
                  className="inline-flex size-max items-center justify-center whitespace-nowrap rounded-full bg-blue-600 p-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-blue-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-white dark:hover:bg-blue-500"
                  disabled={selectedCount !== 1 || isNotDefined(rows[0]?.original.id)}
                  disabledButtonProps={{
                    className: "pointer-events-none opacity-50",
                  }}
                  href={`/vault/views/project/${rows[0]?.original.id}`}
                >
                  <Eye className="size-5" />
                </ConditionalAnchor>
              </TooltipTrigger>
              <TooltipContent>Ver detalles</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <ConditionalAnchor
                  className="inline-flex size-max items-center justify-center whitespace-nowrap rounded-full bg-gray-600 p-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-white dark:hover:bg-gray-500"
                  disabled={selectedCount !== 1 || isNotDefined(rows[0]?.original.id)}
                  disabledButtonProps={{
                    className: "pointer-events-none opacity-50",
                  }}
                  href={`/vault/views/project/${rows[0]?.original.id}/edit`}
                >
                  <Pen className="size-5" />
                </ConditionalAnchor>
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
