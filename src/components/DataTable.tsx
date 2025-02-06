'use client';

import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface Column<T> {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onSort?: (field: keyof T) => void;
  sortField?: keyof T;
  sortDirection?: 'asc' | 'desc';
}

export default function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'Aucune donnée disponible',
  onSort,
  sortField,
  sortDirection,
}: DataTableProps<T>) {
  const getSortIcon = (field: keyof T) => {
    if (field !== sortField) return <FaSort className="w-4 h-4 text-gray-400" />;
    return sortDirection === 'asc' ? (
      <FaSortUp className="w-4 h-4 text-indigo-600" />
    ) : (
      <FaSortDown className="w-4 h-4 text-indigo-600" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-700' : ''
                  }`}
                  onClick={() => column.sortable && onSort?.(column.accessor as keyof T)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && getSortIcon(column.accessor as keyof T)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-gray-600 text-sm"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                    <span>Chargement...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-600"
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-medium">{emptyMessage}</span>
                    <p className="mt-1 text-sm text-gray-500">
                      Aucune donnée n&apos;est disponible pour le moment.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {typeof column.accessor === 'function'
                        ? column.accessor(item)
                        : (item[column.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
