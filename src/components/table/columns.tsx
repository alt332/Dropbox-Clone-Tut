"use client";

import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileType } from "../../../types";
import { COLOR_EXTENSION_MAP } from "./constants";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];

      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension]}
            //@ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
    cell: ({ renderValue }) => (
      <div className="flex flex-col">
        <div className="text-sm">
          {(renderValue() as Date).toLocaleDateString("en-CA")}
        </div>

        <div className="text-xs text-gray-500">
          {(renderValue() as Date).toLocaleTimeString()}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ renderValue }) => (
      <a
        href={renderValue() as string}
        target="_blank"
        className="underline text-blue-500 hover:text-blue-600"
      >
        Download
      </a>
    ),
  },
];
