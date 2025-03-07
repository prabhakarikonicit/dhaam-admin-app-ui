import React, { useState, useMemo } from "react";
import { Search, PenSquare, Trash2 } from "lucide-react";

interface Column {
  field: string;
  headerName: string;
  width?: string;
  renderCell?: (value: any, row: any) => React.ReactNode;
}

interface Row {
  id: string;
  [key: string]: any;
}

interface DataGridProps {
  columns: Column[];
  rows: Row[];
  pageSize?: number;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectRow: (id: string) => void;
  selectedRows: string[];
  searchPlaceholder?: string;
  hideToolbar?: boolean;
  showActionColumn?: boolean;
  onEdit?: (row: Row) => void;
  onDelete?: (row: Row) => void;
  onToggle?: (id: string, value: boolean) => void; // Added this line
}

const CustomDataGrid: React.FC<DataGridProps> = ({
  columns,
  rows,
  pageSize = 10,
  onSelectAll,
  onSelectRow,
  selectedRows,
  searchPlaceholder = "Search",
  hideToolbar = false,
  showActionColumn = false,
  onEdit,
  onDelete
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter rows based on search value
  const filteredRows = useMemo(() => {
    if (!searchValue) return rows;
    const searchLower = searchValue.toLowerCase();
    return rows.filter((row) => {
      return columns.some((column) => {
        const value = row[column.field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [rows, columns, searchValue]);

  const renderStatus = (status: string) => {
    const statusStyles = {
      Paid: "text-customWhiteColor bg-green border border-custom80px",
      Pending: "text-yellow bg-yellow border border-custom80px",
      Failed: "text-customWhite bg-maroon border border-custom80px"
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-[14px] font-inter font-[500] ${
          statusStyles[status as keyof typeof statusStyles]
        }`}
      >
        {status}
      </span>
    );
  };

  const renderCell = (column: Column, row: Row) => {
    if (column.renderCell) {
      return column.renderCell(row[column.field], row);
    }

    if (column.field === "status") {
      return renderStatus(row[column.field]);
    }

    if (column.field === "date" || column.field === "transactionDate" || column.field === "createdOn") {
      return (
        <div>
          <div className="text-[14px] font-inter font-[500] text-cardValue">
            {row[column.field]}
          </div>
          <div className="text-sm text-gray-500">{row.time}</div>
        </div>
      );
    }

    if (column.field === "amount") {
      return `$${typeof row[column.field] === 'number' ? row[column.field].toFixed(2) : row[column.field]}`;
    }

    return row[column.field];
  };

  return (
    <div className="w-full">
      {!hideToolbar && (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M8.5575 2.91666V11.0833H5.4425V2.91666H8.5575ZM9.14083 11.0833H12.25V2.91666H9.14083V11.0833ZM4.85917 11.0833V2.91666H1.75V11.0833H4.85917Z" fill="#636363"/>
              </svg>
              Column
            </button>
            <button className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4.085 9.49926C4.1883 9.20657 4.37987 8.95312 4.6333 8.77384C4.88673 8.59456 5.18954 8.49828 5.5 8.49828C5.81046 8.49828 6.11327 8.59456 6.3667 8.77384C6.62013 8.95312 6.8117 9.20657 6.915 9.49926H12V10.499H6.915C6.8117 10.7917 6.62013 11.0452 6.3667 11.2244C6.11327 11.4037 5.81046 11.5 5.5 11.5C5.18954 11.5 4.88673 11.4037 4.6333 11.2244C4.37987 11.0452 4.1883 10.7917 4.085 10.499H2V9.49926H4.085Z" fill="#636363"/>
              </svg>
              Filter
            </button>
            <button className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.09961 11.9C2.09961 11.5134 2.41301 11.2 2.79961 11.2H11.1996C11.5862 11.2 11.8996 11.5134 11.8996 11.9C11.8996 12.2866 11.5862 12.6 11.1996 12.6H2.79961C2.41301 12.6 2.09961 12.2866 2.09961 11.9ZM4.40463 6.50502C4.678 6.23165 5.12122 6.23165 5.39458 6.50502L6.29961 7.41004L6.29961 2.09999C6.29961 1.71339 6.61301 1.39999 6.99961 1.39999C7.38621 1.39999 7.69961 1.71339 7.69961 2.09999L7.69961 7.41004L8.60463 6.50502C8.878 6.23165 9.32122 6.23165 9.59458 6.50502C9.86795 6.77839 9.86795 7.2216 9.59458 7.49497L7.49458 9.59497C7.36331 9.72624 7.18526 9.79999 6.99961 9.79999C6.81396 9.79999 6.63591 9.72624 6.50463 9.59497L4.40463 7.49497C4.13127 7.2216 4.13127 6.77839 4.40463 6.50502Z" fill="#636363"/>
              </svg>
              Export
            </button>
          </div>
          <div className="relative ml-3">
            <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-7 md:pl-10 pr-5 md:pr-4 sm:pr-4 lg:pr-4 w-full py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="p-4">
              <input
                type="checkbox"
                checked={selectedRows.length === filteredRows.length && filteredRows.length > 0}
                onChange={onSelectAll}
                className="rounded border-gray-300 text-purple-600"
              />
            </th>
            {columns.map((col) => (
              <th
                key={col.field}
                className="text-left p-4 font-inter font-[500] text-cardValue bg-background-grey"
                style={{ width: col.width }}
              >
                {col.headerName}
              </th>
            ))}
            {showActionColumn && (
              <th className="text-left p-4 font-inter font-[500] text-cardValue bg-background-grey">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((row) => (
            <tr key={row.id} className="border-b border-gray-200">
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => onSelectRow(row.id)}
                  className="rounded border-gray-600 text-purple-600"
                />
              </td>
              {columns.map((col) => (
                <td
                  key={col.field}
                  className="p-4 text-[14px] font-inter font-[500] text-cardValue"
                >
                  {renderCell(col, row)}
                </td>
              ))}
              {showActionColumn && (
                <td className="p-4">
                  <div className="flex gap-2">
                    {onEdit && (
                      <button 
                        onClick={() => onEdit(row)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <PenSquare className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                    {onDelete && (
                      <button 
                        onClick={() => onDelete(row)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 flex justify-between items-center border-t border-gray-200">
        <span className="text-[14px] font-inter font-[500] text-cardValue">
          Showing result {Math.min(pageSize, filteredRows.length)} out of {rows.length}
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="p-2 hover:bg-gray-100 rounded"
            disabled={currentPage === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.93934 3.39338C10.2323 3.68638 10.2323 4.15125 9.93934 4.44425L6.88366 7.49993L9.93934 10.5556C10.2323 10.8486 10.2323 11.3135 9.93934 11.6065C9.64634 11.8995 9.18147 11.8995 8.88848 11.6065L5.27277 7.99076C4.97977 7.69776 4.97977 7.23289 5.27277 6.93989L8.88848 3.32419C9.18147 3.03119 9.64634 3.03119 9.93934 3.39338Z" fill="#636363"/>
            </svg>
          </button>
          <button 
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2 hover:bg-gray-100 rounded"
            disabled={currentPage * pageSize >= filteredRows.length}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.06066 3.39338C5.76766 3.68638 5.76766 4.15125 6.06066 4.44425L9.11634 7.49993L6.06066 10.5556C5.76766 10.8486 5.76766 11.3135 6.06066 11.6065C6.35366 11.8995 6.81853 11.8995 7.11152 11.6065L10.7272 7.99076C11.0202 7.69776 11.0202 7.23289 10.7272 6.93989L7.11152 3.32419C6.81853 3.03119 6.35366 3.03119 6.06066 3.39338Z" fill="#636363"/>
            </svg>
          </button>
          <select 
            className="ml-2 px-3 py-2 border border-gray-200 rounded-lg text-sm"
            value={pageSize}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CustomDataGrid;