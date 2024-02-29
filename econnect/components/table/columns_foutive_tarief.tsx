"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels, priorities, statuses } from "./data/data";
import { Econnect, Task } from "./data/schema";
import { DataTableColumnHeader } from "./column-header";
import { DataTableRowActions } from "./row-actions";
import { cn } from "@/lib/utils";

// export const columns_econnect: ColumnDef<Task>[] = [
export const columns_foutive_tarieven: ColumnDef<Econnect>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "studentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[200px] items-center truncate">
          {row.getValue("studentName")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "tarief",
    accessorKey: "tarief",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tarief" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant={"outline"} className={cn()}>
          {row.getValue("tarief")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "verschilTarief",
    accessorKey: "verschilTarief",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tarief" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant={"outline"} className={cn()}>
          {row.getValue("verschilTarief")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status =
        row.getValue("status") === "actief" ? "Actief" : "Niet actief";
      return (
        <Badge
          variant={"outline"}
          className={cn(
            status === "Actief" ? "border border-green-400" : "border"
          )}
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
