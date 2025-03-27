import React, { useState, useMemo, useRef } from "react";
import { Search, PenSquare, Trash2, Filter, Download } from "lucide-react";

interface Column {
  field: string;
  headerName: string;
  width?: string;
  renderCell?: (value: any, row: any) => React.ReactNode;
  visible?: boolean;
}

interface Row {
  id: string;
  [key: string]: any;
}

interface Filter {
  field: string;
  value: string;
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
  onToggle?: (id: string, value: boolean) => void;
}

const CustomDataGrid: React.FC<DataGridProps> = ({
  columns: initialColumns,
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
  const [columns, setColumns] = useState(
    initialColumns.map((column) => ({ ...column, visible: true }))
  );
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const columnMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  // Filter rows based on search value and active filters
  const filteredRows = useMemo(() => {
    let filtered = rows;

    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((row) => {
        return columns.some((column) => {
          if (!column.visible) return false;
          const value = row[column.field];
          if (value == null) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    // Apply column-specific filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((row) => {
        return activeFilters.every((filter) => {
          const value = row[filter.field];
          if (value == null) return false;
          return String(value)
            .toLowerCase()
            .includes(filter.value.toLowerCase());
        });
      });
    }

    return filtered;
  }, [rows, columns, searchValue, activeFilters]);

  // Handle column visibility toggle
  const toggleColumnVisibility = (field: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.field === field ? { ...col, visible: !col.visible } : col
      )
    );
  };

  // Handle adding a filter
  const addFilter = (field: string, value: string) => {
    if (!value) return;

    // Check if filter already exists
    const existingFilterIndex = activeFilters.findIndex(
      (f) => f.field === field
    );

    if (existingFilterIndex >= 0) {
      // Update existing filter
      const updatedFilters = [...activeFilters];
      updatedFilters[existingFilterIndex] = { field, value };
      setActiveFilters(updatedFilters);
    } else {
      // Add new filter
      setActiveFilters([...activeFilters, { field, value }]);
    }

    setShowFilterMenu(false);
  };

  // Handle removing a filter
  const removeFilter = (field: string) => {
    setActiveFilters(activeFilters.filter((f) => f.field !== field));
  };

  // Handle export to CSV
  const exportToCSV = () => {
    // Get visible columns
    const visibleColumns = columns.filter((col) => col.visible);

    // Create header row
    const headerRow = visibleColumns.map((col) => col.headerName);

    // Create data rows
    const dataRows = filteredRows.map((row) => {
      return visibleColumns.map((col) => {
        const value = row[col.field];

        // Handle special cases
        if (col.field === "status") {
          return value;
        } else if (col.field === "amount" && typeof value === "number") {
          return value.toFixed(2);
        } else if (
          col.field === "date" ||
          col.field === "transactionDate" ||
          col.field === "createdOn"
        ) {
          return value;
        } else {
          return value !== null && value !== undefined ? String(value) : "";
        }
      });
    });

    // Combine header and data rows
    const csvContent = [
      headerRow.join(","),
      ...dataRows.map((row) => row.join(",")),
    ].join("\n");

    // Create blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "DataExport.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        columnMenuRef.current &&
        !columnMenuRef.current.contains(event.target as Node)
      ) {
        setShowColumnMenu(false);
      }
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, activeFilters]);

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
          <div className="text-[14px] font-inter font-[500] text-cardValue leading-[21px]">
            {row[column.field]}
          </div>
          <div className="text-[11px] font-[400] font-inter text-cardTitle ">
            {row.time}
          </div>
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
            {/* Column toggle button */}
            <div className="relative">
              <button
                className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading"
                onClick={() => {
                  setShowColumnMenu(!showColumnMenu);
                  setShowFilterMenu(false);
                }}
              >
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
                Columns
              </button>

              {showColumnMenu && (
                <div
                  ref={columnMenuRef}
                  className="absolute z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1 px-2">
                    {columns.map((column) => (
                      <div
                        key={column.field}
                        className="flex items-center px-2 py-2"
                      >
                        <input
                          type="checkbox"
                          id={`column-${column.field}`}
                          checked={column.visible}
                          onChange={() => toggleColumnVisibility(column.field)}
                          className="h-4 w-4 rounded border-gray-300 focus:ring-bgButton accent-bgButton"
                        />
                        <label
                          htmlFor={`column-${column.field}`}
                          className="ml-2 text-[12px] text-reloadButton font-inter"
                        >
                          {column.headerName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filter button */}
            <div className="relative">
              <button
                className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading"
                onClick={() => {
                  setShowFilterMenu(!showFilterMenu);
                  setShowColumnMenu(false);
                }}
              >
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

              {showFilterMenu && (
                <div
                  ref={filterMenuRef}
                  className="absolute z-10 mt-2 w-64 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1 px-2">
                    <div className="py-2">
                      <select
                        className="block w-full rounded-md text-[12px] font-inter font-[500] py-2 pl-3 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        id="filter-field"
                        defaultValue=""
                      >
                        <option value="" disabled className=" text-[14px] font-inter font-[500]">
                          Select field
                        </option>
                        {columns.map((column) => (
                          <option key={column.field} className=" text-[12px] font-inter font-[500]" value={column.field}>
                            {column.headerName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="py-2">
                      <input
                        type="text"
                        id="filter-value"
                        placeholder="Filter value"
                        className="block w-full rounded-md border-reloadBorder border py-2 pl-3 pr-3 text-[12px] font-inter font-[500] 
                        focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                      />
                    </div>
                    <div className="py-2">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-bgButton px-4 py-2 text-sm font-inter text-whiteColor font-[12px] shadow-sm  focus:outline-none focus:ring-2 focus:ring-bgButton focus:ring-offset-2"
                        onClick={() => {
                          const fieldElement = document.getElementById(
                            "filter-field"
                          ) as HTMLSelectElement;
                          const valueElement = document.getElementById(
                            "filter-value"
                          ) as HTMLInputElement;
                          if (fieldElement && valueElement) {
                            addFilter(fieldElement.value, valueElement.value);
                            valueElement.value = "";
                          }
                        }}
                      >
                        Apply Filter
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Export button */}
            <button
              className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading"
              onClick={exportToCSV}
            >
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

          {/* Active filters display */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mr-2">
              {activeFilters.map((filter, index) => {
                // Find column name
                const column = columns.find((c) => c.field === filter.field);
                return (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                  >
                    <span className="font-bold mr-1">
                      {column?.headerName}:
                    </span>
                    <span>{filter.value}</span> 
                    <button
                      onClick={() => removeFilter(filter.field)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
              <button
                onClick={() => setActiveFilters([])}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>
          )}

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
                className="h-4 w-4 rounded border-btnBorder  focus:ring-bgButton accent-bgButton"
              />
            </th>
            {columns
              .filter((column) => column.visible)
              .map((col) => (
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
            .slice(
              (currentPage - 1) * currentPageSize,
              currentPage * currentPageSize
            )
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
                    className="h-4 w-4 rounded border border-gray-300 focus:ring-bgButton accent-bgButton"
                  />
                </td>
                {columns
                  .filter((column) => column.visible)
                  .map((col) => (
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                          >
                            <path
                              d="M12.6903 1.81005C12.1436 1.26332 11.2572 1.26332 10.7104 1.81005L5.40039 7.1201V9.1H7.38029L12.6903 3.78995C13.2371 3.24322 13.2371 2.35679 12.6903 1.81005Z"
                              fill="#636363"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M1.90039 4.2C1.90039 3.4268 2.52719 2.8 3.30039 2.8H6.10039C6.48699 2.8 6.80039 3.1134 6.80039 3.5C6.80039 3.8866 6.48699 4.2 6.10039 4.2H3.30039V11.2H10.3004V8.4C10.3004 8.0134 10.6138 7.7 11.0004 7.7C11.387 7.7 11.7004 8.0134 11.7004 8.4V11.2C11.7004 11.9732 11.0736 12.6 10.3004 12.6H3.30039C2.52719 12.6 1.90039 11.9732 1.90039 11.2V4.2Z"
                              fill="#636363"
                            />
                          </svg>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M6.79961 1.39999C6.53447 1.39999 6.29209 1.5498 6.17351 1.78694L5.66699 2.79999H3.29961C2.91301 2.79999 2.59961 3.11339 2.59961 3.49999C2.59961 3.88659 2.91301 4.19999 3.29961 4.19999L3.29961 11.2C3.29961 11.9732 3.92641 12.6 4.69961 12.6H10.2996C11.0728 12.6 11.6996 11.9732 11.6996 11.2V4.19999C12.0862 4.19999 12.3996 3.88659 12.3996 3.49999C12.3996 3.11339 12.0862 2.79999 11.6996 2.79999H9.33223L8.82571 1.78694C8.70713 1.5498 8.46475 1.39999 8.19961 1.39999H6.79961ZM5.39961 5.59999C5.39961 5.21339 5.71301 4.89999 6.09961 4.89999C6.48621 4.89999 6.79961 5.21339 6.79961 5.59999V9.79999C6.79961 10.1866 6.48621 10.5 6.09961 10.5C5.71301 10.5 5.39961 10.1866 5.39961 9.79999V5.59999ZM8.89961 4.89999C8.51301 4.89999 8.19961 5.21339 8.19961 5.59999V9.79999C8.19961 10.1866 8.51301 10.5 8.89961 10.5C9.28621 10.5 9.59961 10.1866 9.59961 9.79999V5.59999C9.59961 5.21339 9.28621 4.89999 8.89961 4.89999Z"
                              fill="#636363"
                            />
                          </svg>
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
          Showing result {Math.min(currentPageSize, filteredRows.length)} out of{" "}
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
            disabled={currentPage * currentPageSize >= filteredRows.length}
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
            className="ml-2 px-4 py-4 border border-gray-200 rounded-custom text-[12px] bg-reloadBackground"
            value={currentPageSize}
            onChange={(e) => {
              setCurrentPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
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
