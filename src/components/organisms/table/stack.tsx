import type {Stack} from "@prisma/client";
import type {ColumnDef, Table} from "@tanstack/react-table";

import {Eye, Pen, Plus, Trash} from "lucide-react";
import moment from "moment";
import {useMemo} from "react";

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
import {STACK_CATEGORY_TRANSCRIPTIONS, STACK_TYPE_TRANSCRIPTIONS} from "@/constants/transcriptions";
import {isNotDefined} from "@/helpers/guards/is-defined";
import {useToast} from "@/hooks/use-toast";
import {deleteStack} from "@/services/stack/deleteStack";

//#region Column Definitions
const columns: Array<ColumnDef<Stack>> = [
  selectionColumnDef<Stack>(),
  {
    id: "id",
    accessorKey: "id",
    header({column}) {
      return <DataTableColumnHeader column={column} title="ID" />;
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

// MARK: - Collaborator Table
export function StackTable({data}: {data: Stack[]}) {
  return <DataTable HeaderComponent={TableHeaderComponent} columns={columns} data={data} />;
}

// MARK: - Table Header Component
function TableHeaderComponent({table}: {table: Table<Stack>}) {
  const {toast} = useToast();
  const selectedRowModel = table.getSelectedRowModel();
  const {rows, selectedCount} = useMemo(() => {
    return {
      ...selectedRowModel,
      selectedCount: selectedRowModel.rows.length ?? 0,
    };
  }, [selectedRowModel]);

  const handleCreate = () => {
    window.location.href = "/vault/views/stack/create";
  };

  const handleView = () => {
    window.location.href = `/vault/views/stack/${rows[0].original.id}`;
  };

  const handleEdit = () => {
    window.location.href = `/vault/views/stack/${rows[0].original.id}/edit`;
  };

  const handleDelete = async () => {
    const response = await deleteStack(rows.map((row) => row.original.id));

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
                  Esta acción no se puede deshacer. Esto borrará permanentemente el/los stacks
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
