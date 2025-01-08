import type {Collaborator} from "@prisma/client";
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
import {safeReload} from "@/helpers/common/safe-reload";
import {isDefined, isNotDefined} from "@/helpers/guards/is-defined";
import {useToast} from "@/hooks/use-toast";
import {deleteCollaborator} from "@/services/collaborator/deleteCollaborator";

//#region Column Definitions
const columns: Array<ColumnDef<Collaborator>> = [
  selectionColumnDef<Collaborator>(),
  {
    id: "id",
    accessorKey: "id",
    header({column}) {
      return <DataTableColumnHeader column={column} title="ID" />;
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
    cell({row}) {
      return (
        <a
          className="text-blue-500"
          href={`https://github.com/${row.original.githubUsername}`}
          rel="noreferrer"
          target="_blank"
        >
          {row.original.githubUsername}
        </a>
      );
    },
  },
  {
    id: "linkedinUsername",
    accessorKey: "linkedinUsername",
    header({column}) {
      return <DataTableColumnHeader column={column} title="Nickname de Linkedin" />;
    },
    cell({row}) {
      return (
        <a
          className="text-blue-500"
          href={`https://www.linkedin.com/in/${row.original.linkedinUsername}`}
          rel="noreferrer"
          target="_blank"
        >
          {row.original.linkedinUsername}
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
export function CollaboratorTable({data: initialData}: {data: Collaborator[]}) {
  const [data, setData] = useState<Collaborator[]>(initialData);

  return (
    <DataTable
      HeaderComponent={TableHeaderComponent}
      columns={columns}
      data={data}
      meta={{
        deleteRows(index) {
          setData((prevData) => {
            return prevData.filter((_, i) => !index.includes(i));
          });
        },
      }}
    />
  );
}

// MARK: - Table Header Component
function TableHeaderComponent({table}: {table: Table<Collaborator>}) {
  const {toast} = useToast();
  const selectedRowModel = table.getSelectedRowModel();
  const {rows, selectedCount} = useMemo(() => {
    return {
      ...selectedRowModel,
      selectedCount: selectedRowModel.rows.length ?? 0,
    };
  }, [selectedRowModel]);

  const handleDelete = async () => {
    // Send request to delete the collaborator
    const response = await deleteCollaborator(rows.map((row) => row.original.id));

    // If the request was unsuccessful, show an error toast and exit
    if (response.success === false) {
      toast({
        title: "Error al eliminar colaboradores",
        description: "No se pudieron eliminar los colaboradores seleccionados.",
        className: "bg-green-500",
      });

      return;
    }

    // If the request was successful, show a success toast
    toast({
      title: "Colaboradores eliminados",
      description: "Los colaboradores seleccionados se eliminaron correctamente.",
      className: "bg-green-500",
    });

    // Remove the deleted collaborators from the table
    if (isDefined(table.options.meta?.deleteRows)) {
      table.options.meta.deleteRows(rows.map((row) => row.index));
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
                <ConditionalAnchor
                  className="inline-flex size-max items-center justify-center whitespace-nowrap rounded-full bg-lime-600 p-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-lime-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-white dark:hover:bg-lime-500"
                  disabled={selectedCount !== 0}
                  disabledButtonProps={{
                    className: "pointer-events-none opacity-50",
                  }}
                  href="/vault/views/collaborators/create"
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
                  href={`/vault/views/collaborators/${rows[0]?.original.id}`}
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
                  href={`/vault/views/collaborators/${rows[0]?.original.id}/edit`}
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
                  Esta acción no se puede deshacer. Esto borrará permanentemente el/los
                  colaboradores seleccionados.
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
