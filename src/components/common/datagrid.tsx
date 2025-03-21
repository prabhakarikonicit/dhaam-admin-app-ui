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
  onDelete,
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
      Failed: "text-customWhite bg-maroon border border-custom80px",
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

    if (
      column.field === "date" ||
      column.field === "transactionDate" ||
      column.field === "createdOn"
    ) {
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
      return `$${
        typeof row[column.field] === "number"
          ? row[column.field].toFixed(2)
          : row[column.field]
      }`;
    }

    return row[column.field];
  };

  return (
    <div className="w-full border border-grey-border rounded-custom8px mb-10">
      {!hideToolbar && (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M8.5575 2.91666V11.0833H5.4425V2.91666H8.5575ZM9.14083 11.0833H12.25V2.91666H9.14083V11.0833ZM4.85917 11.0833V2.91666H1.75V11.0833H4.85917Z"
                  fill="#636363"
                />
              </svg>
              Column
            </button>
            <button className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M4.085 9.49926C4.1883 9.20657 4.37987 8.95312 4.6333 8.77384C4.88673 8.59456 5.18954 8.49828 5.5 8.49828C5.81046 8.49828 6.11327 8.59456 6.3667 8.77384C6.62013 8.95312 6.8117 9.20657 6.915 9.49926H12V10.499H6.915C6.8117 10.7917 6.62013 11.0452 6.3667 11.2244C6.11327 11.4037 5.81046 11.5 5.5 11.5C5.18954 11.5 4.88673 11.4037 4.6333 11.2244C4.37987 11.0452 4.1883 10.7917 4.085 10.499H2V9.49926H4.085ZM7.085 6.00012C7.1883 5.70743 7.37987 5.45397 7.6333 5.27469C7.88673 5.09542 8.18954 4.99914 8.5 4.99914C8.81046 4.99914 9.11327 5.09542 9.3667 5.27469C9.62013 5.45397 9.8117 5.70743 9.915 6.00012H12V6.99988H9.915C9.8117 7.29257 9.62013 7.54603 9.3667 7.72531C9.11327 7.90458 8.81046 8.00086 8.5 8.00086C8.18954 8.00086 7.88673 7.90458 7.6333 7.72531C7.37987 7.54603 7.1883 7.29257 7.085 6.99988H2V6.00012H7.085ZM4.085 2.50098C4.1883 2.20829 4.37987 1.95483 4.6333 1.77555C4.88673 1.59627 5.18954 1.5 5.5 1.5C5.81046 1.5 6.11327 1.59627 6.3667 1.77555C6.62013 1.95483 6.8117 2.20829 6.915 2.50098H12V3.50073H6.915C6.8117 3.79343 6.62013 4.04688 6.3667 4.22616C6.11327 4.40544 5.81046 4.50171 5.5 4.50171C5.18954 4.50171 4.88673 4.40544 4.6333 4.22616C4.37987 4.04688 4.1883 3.79343 4.085 3.50073H2V2.50098H4.085Z"
                  fill="#636363"
                />
              </svg>
              Filter
            </button>
            <button className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.09961 11.9C2.09961 11.5134 2.41301 11.2 2.79961 11.2H11.1996C11.5862 11.2 11.8996 11.5134 11.8996 11.9C11.8996 12.2866 11.5862 12.6 11.1996 12.6H2.79961C2.41301 12.6 2.09961 12.2866 2.09961 11.9ZM4.40463 6.50502C4.678 6.23165 5.12122 6.23165 5.39458 6.50502L6.29961 7.41004L6.29961 2.09999C6.29961 1.71339 6.61301 1.39999 6.99961 1.39999C7.38621 1.39999 7.69961 1.71339 7.69961 2.09999L7.69961 7.41004L8.60463 6.50502C8.878 6.23165 9.32122 6.23165 9.59458 6.50502C9.86795 6.77839 9.86795 7.2216 9.59458 7.49497L7.49458 9.59497C7.36331 9.72624 7.18526 9.79999 6.99961 9.79999C6.81396 9.79999 6.63591 9.72624 6.50463 9.59497L4.40463 7.49497C4.13127 7.2216 4.13127 6.77839 4.40463 6.50502Z"
                  fill="#636363"
                />
              </svg>
              Export
            </button>
          </div>
          <div className="relative ml-3 border boder-grey-border rounded-custom7px ">
            <span className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-grey-border ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.39961 3.20001C4.6323 3.20001 3.19961 4.63269 3.19961 6.40001C3.19961 8.16732 4.6323 9.60001 6.39961 9.60001C8.16692 9.60001 9.59961 8.16732 9.59961 6.40001C9.59961 4.63269 8.16692 3.20001 6.39961 3.20001ZM1.59961 6.40001C1.59961 3.74904 3.74864 1.60001 6.39961 1.60001C9.05058 1.60001 11.1996 3.74904 11.1996 6.40001C11.1996 7.43667 10.871 8.39658 10.3122 9.18123L14.1653 13.0343C14.4777 13.3467 14.4777 13.8533 14.1653 14.1657C13.8529 14.4781 13.3463 14.4781 13.0339 14.1657L9.18084 10.3126C8.39618 10.8714 7.43627 11.2 6.39961 11.2C3.74864 11.2 1.59961 9.05097 1.59961 6.40001Z"
                  fill="#949494"
                />
              </svg>
            </span>
            {/* <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-grey-border" /> */}
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-7 md:pl-10 pr-5 md:pr-4 sm:pr-4 lg:pr-4 w-full py-2 border border-gray-200 rounded-lg text-[12px] font-inter font-[400] text-cardTitle"
            />
          </div>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-background-grey">
            <th className="p-4">
              <input
                type="checkbox"
                checked={
                  selectedRows.length === filteredRows.length &&
                  filteredRows.length > 0
                }
                onChange={onSelectAll}
                className="rounded border-gray-300 text-purple-600"
              />
            </th>
            {columns.map((col) => (
              <th
                key={col.field}
                className="text-left p-4 font-inter font-[600] text-headding-color bg-background-grey"
                style={{ width: col.width }}
              >
                {col.headerName}
              </th>
            ))}
            {showActionColumn && (
              <th className="text-left p-4 font-inter font-[600] text-headding-color bg-background-grey">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredRows
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 bg-store-card"
              >
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
                    className="p-4 text-[12px] font-inter font-[500] text-cardValue"
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
        <span className="text-[14px] font-inter font-[500] text-headding-color">
          Showing result {Math.min(pageSize, filteredRows.length)} out of{" "}
          {rows.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="p-2 hover:bg-gray-100 rounded"
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
                fill="#4A4A4A"
              />
            </svg>
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 hover:bg-gray-100 rounded"
            disabled={currentPage * pageSize >= filteredRows.length}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z"
                fill="#4A4A4A"
              />
            </svg>
          </button>
          <select
            className="ml-2 px-4 py-4 border border-gray-200 rounded-custom text-[12px] bg-reloadBackground "
            value={pageSize}
          >
            <option value={10} className="text-[12px] bg-reloadBackground">
              10
            </option>
            <option value={20} className="text-[12px] bg-reloadBackground">
              20
            </option>
            <option value={50} className="text-[12px] bg-reloadBackground">
              50
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CustomDataGrid;
