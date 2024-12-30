import type {ColumnDef} from "@tanstack/react-table";

import {Checkbox} from "../../../ui/checkbox";

export function selectionColumnDef<TData>() {
  const columnDef: ColumnDef<TData> = {
    id: "select",
    header: ({table}) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="border-black data-[state=checked]:bg-white"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({row}) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        className="border-black data-[state=checked]:bg-white"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  return columnDef;
}
