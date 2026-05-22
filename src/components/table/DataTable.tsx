"use client";

import React from "react";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  width?: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  selectedIds?: Set<string>;
}

export function DataTable<T>({ columns, data, rowKey, isLoading, emptyMessage = "No records found.", onRowClick, selectedIds }: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-[#bec9c3]/10">
        <TableSkeleton columnCount={columns.length} rowCount={5} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#bec9c3]/10 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#ebe8e4]">
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }} className={`p-4 text-[11px] font-bold uppercase tracking-wider text-[#3f4944] ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#bec9c3]/10 text-sm">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-10 text-center text-[#6f7a74] text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const id = rowKey(row);
              const isSelected = selectedIds?.has(id) ?? false;

              return (
                <tr key={id} onClick={() => onRowClick?.(row)} className={`transition-colors ${onRowClick ? "cursor-pointer" : ""} ${isSelected ? "bg-[#005440]/5 hover:bg-[#005440]/10" : "hover:bg-[#f6f3ef]"}`}>
                  {columns.map((col) => (
                    <td key={col.key} className={`p-4 ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : ""}`}>
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}


function TableSkeleton({ columnCount, rowCount }: { columnCount: number; rowCount: number }) {
  return (
    <table className="w-full border-collapse">
      <thead className="bg-[#ebe8e4]">
        <tr>
          {Array.from({ length: columnCount }).map((_, i) => (
            <th key={i} className="p-4">
              <div className="h-3 bg-[#bec9c3]/40 rounded w-20 animate-pulse" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-[#bec9c3]/10">
        {Array.from({ length: rowCount }).map((_, i) => (
          <tr key={i}>
            {Array.from({ length: columnCount }).map((_, j) => (
              <td key={j} className="p-4">
                <div className="h-3 bg-[#ebe8e4] rounded w-full animate-pulse" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
